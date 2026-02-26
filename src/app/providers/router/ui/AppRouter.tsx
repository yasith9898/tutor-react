import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { usePostHog } from "@posthog/react";
import { router } from "../config";
import { supabase } from "@/shared/api/supabase";

export const AppRouter = () => {
  const posthog = usePostHog();

  useEffect(() => {
    if (!posthog) return;

    // 1. Standard Pageview capture
    posthog.capture('$pageview');

    // 2. The "Bulletproof" Sync Logic
    const syncWithSupabase = async (sessionId: string) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        console.log("Syncing Session to Supabase:", sessionId);
        const { error } = await supabase
          .from('user_recordings')
          .upsert(
            { user_id: user.id, posthog_session_id: sessionId },
            { onConflict: 'user_id, posthog_session_id' }
          );

        if (error) console.error("Supabase Sync Error:", error.message);
      } catch (err) {
        console.error("Sync Catch:", err);
      }
    };

    // 3. LISTEN for the Session ID (Works even if it takes a few seconds to load)
    posthog.onSessionId((sessionId) => {
      if (sessionId) {
        syncWithSupabase(sessionId);
      }
    });

  }, [posthog]);

  return <RouterProvider router={router} />;
};