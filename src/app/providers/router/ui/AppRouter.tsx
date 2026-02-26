import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { usePostHog } from "@posthog/react";
import { router } from "../config";

export const AppRouter = () => {
  const posthog = usePostHog();

  useEffect(() => {
    if (posthog) {
      // Capture the pageview manually
      posthog.capture('$pageview');

      // Retrieve the Session ID
      const sessionId = posthog.get_session_id();
      
      if (sessionId) {
        console.log("PostHog Session ID:", sessionId);
        
        //Send ID to backend
        const syncSessionWithBackend = async () => {
          try {
            console.log("Syncing PostHog session to backend with session ID:", sessionId);
            // await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sessions/sync`, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     // Add Authorization if your user is logged in
            //     // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            //   },
            //   body: JSON.stringify({
            //     posthog_session_id: sessionId,
            //     // You might want to send user details if available
            //     timestamp: new Date().toISOString()
            //   }),
            // });
          } catch (error) {
            console.error("Failed to sync PostHog session to backend:", error);
          }
        };

        syncSessionWithBackend();
      }
    }
  }, [posthog]);

  return <RouterProvider router={router} />;
};