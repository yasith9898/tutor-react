import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { usePostHog } from "@posthog/react";
import { router } from "../config";
import { supabase } from "@/shared/api/supabase";

/**
 * AppRouter handles the primary routing logic and 
 * manages the integration between PostHog Session Replays and Supabase Auth.
 */
export const AppRouter = () => {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    /**
     * Listens for authentication state changes (INITIAL_SESSION, SIGN_IN, SIGN_OUT, etc.).
     * This ensures that session recordings are only linked once a valid user is identified.
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        /**
         * PostHog's Session ID is the unique identifier for the current replay.
         * We retrieve it to create a lookup table in our database for admin dashboards.
         */
        const sessionId = posthog.get_session_id();
        
        if (sessionId) {
          syncToSupabase(session.user.id, sessionId);
        } else {
          /**
           * If the PostHog SDK hasn't initialized the session ID yet, we use a 
           * callback to ensure we capture the ID as soon as it is generated.
           */
          posthog.onSessionId((id) => {
            if (id) syncToSupabase(session.user.id, id);
          });
        }
      }
    });

    /**
     * Persists the mapping between the Supabase User and the PostHog Session.
     * Uses 'upsert' to prevent duplicate entries while updating existing records.
     */
    const syncToSupabase = async (userId: string, sessionId: string) => {
      try {
        const { error } = await supabase
          .from('user_recordings')
          .upsert(
            { 
              user_id: userId, 
              posthog_session_id: sessionId,
              updated_at: new Date().toISOString() 
            },
            { onConflict: 'user_id, posthog_session_id' }
          );

        if (error) {
          // Log only the error message in production to keep console clean
          console.error("PostHog-Supabase Sync Error:", error.message);
        }
      } catch (err) {
        console.error("Unexpected sync error:", err);
      }
    };

    // Clean up the auth listener when the component unmounts
    return () => subscription.unsubscribe();
  }, [posthog]);

  return <RouterProvider router={router} />;
};