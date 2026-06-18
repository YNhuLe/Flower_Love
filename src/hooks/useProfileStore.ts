import { create } from "zustand";
import axios from "axios";
import type { UserProfile } from "../types/user";


/** Zustand store for managing user profile state 
 * This store includes the user's profile information and functions to set, clear, load, and update the profile. 
 * The loadProfile function retrieves the user's profile from the backend using an access token for authentication, while the updateProfile function allows updating the user's profile information in the backend and updates the local state accordingly.
 *  Both functions handle errors by logging them to the console.
 * 
 * 
*/
interface UserProfileState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  clearProfile: () => void;
  loadProfile: (getAccessToken: () => Promise<string>) => Promise<void>;
  updateProfile: (
    getAccessToken: () => Promise<string>,
    data: Partial<UserProfile>,
  ) => Promise<void>;
}
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const useProfileStore = create<UserProfileState>((set, get) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
  loadProfile: async (getAccessToken) => {
    try {
      const token = await getAccessToken();
      const res = await axios.get(`${baseUrl}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ profile: res.data });
    } catch (error: any) {
      console.log("Failed to load profile", error);
    }
  },
  updateProfile: async (getAccessToken, data) => {
    try {
      const token = await getAccessToken();
      await axios.patch(`${baseUrl}/users/me`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ profile: { ...get().profile, ...data } as UserProfile });
    } catch (error: any) {
      console.log("failed to update user profile ", error);
      throw error;
    }
  },
}));

export default useProfileStore;
