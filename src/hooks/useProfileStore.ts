import { create } from "zustand";
import axios from "axios";

interface UserProfile {
  id: number;
  uid: string;
  name: string;
  phone_number: string;
}
interface UserProfileState {
  profile: UserProfile | null;
  loadProfile: (getAccessToken: () => Promise<string>) => Promise<void>;
  updateProfile: (
    getAccessToken: () => Promise<string>,
    data: Partial<UserProfile>,
  ) => Promise<void>;
}
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const useProfileStore = create<UserProfileState>((set, get) => ({
  profile: null,
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
      await axios.post(`${baseUrl}/users/me`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ profile: { ...get().profile, ...data } as UserProfile });
    } catch (error: any) {
      console.log("failed to update user profile ", error);
    }
  },
}));

export default useProfileStore;
