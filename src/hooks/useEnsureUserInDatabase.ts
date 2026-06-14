// export default useEnsureUserInDatabase;
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useProfileStore from "./useProfileStore";


/**
 * This hook ensures that the authenticated user exists in the database and their profile is loaded into the Zustand store.
 * It handles the following scenarios:
 * - If the user is authenticated and their profile is not loaded, it fetches the profile from the backend.
 * - If the access token is expired, it logs the user out.
 * - If the user is not found in the database (404), it logs a warning and does not attempt to create a new user.
 * - It manages loading and error states for the profile synchronization process.
 *
 * Usage:
 * Call this hook in a component that is rendered after authentication (e.g., in a layout or main app component) to ensure the user's profile is available throughout the app.
 */
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const useEnsureUserInDatabase = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently, logout } = useAuth0();
  const { profile, setProfile } = useProfileStore();
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear profile on logout
  useEffect(() => {
    if (!isAuthenticated && profile) {
      setProfile(null);
    }
  }, [isAuthenticated, profile, setProfile]);

  // Only FETCH the profile, never create
  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoading || !isAuthenticated || profile) return;
      setSyncing(true);

      try {
        const token = await getAccessTokenSilently({ cacheMode: "off" });
        const decodedToken: any = jwtDecode(token);

        // Guard: expired token
        if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
          console.warn("Access token expired. Logging out.");
          logout();
          return;
        }

        const response = await axios.get(`${baseUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(response.data);

      } catch (error: any) {

        //handle 404 error
        if(error.response?.status === 404){
          console.warn("User not found in database. Logging out.");
          return;
        }
        console.error("Error fetching profile:", error);
        setError(error.response?.data?.message || "Failed to fetch profile");
      } finally {
        setSyncing(false);
      }
    };

    fetchProfile();
  }, [isLoading, isAuthenticated, profile, setProfile, getAccessTokenSilently, logout]);

  return { profile, syncing, error };
};

export default useEnsureUserInDatabase;