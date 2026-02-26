import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { usePostHog } from "@posthog/react";
import { router } from "../config";
import { supabase } from "@/shared/api/supabase";

export const AppRouter = () => {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    // 1. Monitor Auth State Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`DEBUG: Auth Event: ${event}`);

      if (session?.user) {
        console.log("DEBUG: User detected:", session.user.email);
        
        // 2. Get the PostHog Session ID
        // Note: It might take a moment to be available
        const sessionId = posthog.get_session_id();
        
        if (sessionId) {
          syncToSupabase(session.user.id, sessionId);
        } else {
          // If PostHog isn't ready, wait for it
          posthog.onSessionId((id) => {
            if (id) syncToSupabase(session.user.id, id);
          });
        }
      }
    });

    const syncToSupabase = async (userId: string, sessionId: string) => {
      console.log("DEBUG: Executing Upsert for Session:", sessionId);
      const { error } = await supabase
        .from('user_recordings')
        .upsert(
          { user_id: userId, posthog_session_id: sessionId },
          { onConflict: 'user_id, posthog_session_id' }
        );

      if (error) {
        console.error("DEBUG: Sync Error:", error.message);
      } else {
        console.log("DEBUG: SUCCESS! Session synced to Supabase.");
      }
    };

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, [posthog]);

  return <RouterProvider router={router} />;
};