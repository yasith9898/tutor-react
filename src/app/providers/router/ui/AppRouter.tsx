import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { usePostHog } from "@posthog/react";
import { router } from "../config";
import { supabase } from "@/shared/api/supabase";

export const AppRouter = () => {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    /**
     * Subscribe to authentication state changes to ensure session IDs
     * are linked to users as soon as they are authenticated.
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session?.user) {
        /**
         * Attempt to retrieve the current PostHog session identifier.
         */
        const sessionId = posthog.get_session_id();
        
        if (sessionId) {
          syncToSupabase(session.user.id, sessionId);
        } else {
          /**
           * If the session ID is not immediately available, register a 
           * callback to capture it once initialized by the PostHog SDK.
           */
          posthog.onSessionId((id) => {
            if (id) syncToSupabase(session.user.id, id);
          });
        }
      }
    });

    /**
     * Synchronizes the mapping between the authenticated user and the 
     * current session recording ID within the Supabase database.
     */
    const syncToSupabase = async (userId: string, sessionId: string) => {
      const { error } = await supabase
        .from('user_recordings')
        .upsert(
          { user_id: userId, posthog_session_id: sessionId },
          { onConflict: 'user_id, posthog_session_id' }
        );

      if (error) {
        /**
         * Log synchronization errors for monitoring and troubleshooting.
         */
        console.error("PostHog-Supabase Sync Error:", error.message);
      }
    };

    /**
     * Unsubscribe from the auth listener when the component unmounts 
     * to prevent memory leaks.
     */
    return () => subscription.unsubscribe();
  }, [posthog]);

  return <RouterProvider router={router} />;
};