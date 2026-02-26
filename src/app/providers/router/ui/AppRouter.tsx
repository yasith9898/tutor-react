import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { usePostHog } from "@posthog/react";
import { router } from "../config";
import { supabase } from "@/shared/api/supabase";

export const AppRouter = () => {
  const posthog = usePostHog();

  // --- DEBUG 1: Component Render Check ---
  console.log("DEBUG: AppRouter Component Rendered");
  console.log("DEBUG: PostHog Object exists?", !!posthog);

  useEffect(() => {
    // --- DEBUG 2: Effect Trigger Check ---
    console.log("DEBUG: useEffect Hook Triggered");

    if (!posthog) {
      console.error("DEBUG: PostHog is undefined/null. Check PostHogProvider in main.tsx");
      return;
    }

    const testSupabase = async () => {
      console.log("DEBUG: Testing Supabase Connection...");
      const { data, error } = await supabase.from('user_recordings').select('count').limit(1);
      if (error) {
        console.error("DEBUG: Supabase Connection Error:", error.message);
      } else {
        console.log("DEBUG: Supabase Connection SUCCESS. Table 'user_recordings' is reachable.");
      }
    };

    const runSync = async () => {
      try {
        // --- DEBUG 3: Auth Check ---
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        console.log("DEBUG: Auth User check:", user ? `User found: ${user.email}` : "No User Logged In");
        
        if (authError) console.error("DEBUG: Auth Error:", authError.message);
        if (!user) return;

        // --- DEBUG 4: Session ID Check ---
        // We use a manual capture to force PostHog to start a session if it hasn't
        posthog.capture('ping_for_session'); 
        
        const sessionId = posthog.get_session_id();
        console.log("DEBUG: PostHog Session ID Value:", sessionId);

        if (sessionId) {
          console.log("DEBUG: Attempting DB Save for:", sessionId);
          const { error: dbError } = await supabase
            .from('user_recordings')
            .upsert(
              { user_id: user.id, posthog_session_id: sessionId },
              { onConflict: 'user_id, posthog_session_id' }
            );

          if (dbError) {
            console.error("DEBUG: DB Save FAILED:", dbError.message);
          } else {
            console.log("DEBUG: DB Save SUCCESS!");
          }
        }
      } catch (e) {
        console.error("DEBUG: Unexpected Crash in Sync Logic:", e);
      }
    };

    testSupabase();
    runSync();
  }, [posthog]);

  return <RouterProvider router={router} />;
};