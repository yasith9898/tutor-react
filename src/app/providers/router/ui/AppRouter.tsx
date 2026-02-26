import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { usePostHog } from "@posthog/react";
import { router } from "../config";
import { supabase } from "@/shared/api/supabase"; 
export const AppRouter = () => {
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog) {
      // 1. Capture the pageview manually
      posthog.capture('$pageview');

      // 2. Retrieve the Session ID
      const sessionId = posthog.get_session_id();
      
      if (sessionId) {
        const syncSessionWithSupabase = async () => {
          try {
            // 3. Get the current logged-in user from Supabase
            const { data: { user } } = await supabase.auth.getUser();
            // const environment = import.meta.env.VITE_APP_ENV;
            // Only sync if we have a user (you don't want anonymous sessions in your admin table)
            if (user) {
              console.log("Syncing PostHog session to Supabase:", sessionId);

              const { error } = await supabase
                .from('user_recordings')
                .upsert(
                  { 
                    user_id: user.id, 
                    posthog_session_id: sessionId 
                  }, 
                  { onConflict: 'user_id, posthog_session_id' }
                );

              if (error) throw error;
            }
          } catch (error) {
            console.error("Failed to sync PostHog session to Supabase:", error);
          }
        };

        syncSessionWithSupabase();
      }
    }
  }, [posthog]);

  return <RouterProvider router={router} />;
};