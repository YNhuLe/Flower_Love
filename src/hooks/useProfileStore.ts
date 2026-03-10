import { create } from "zustand";
import axios from "axios";
import {auth} from "../firebase/config";

interface UserProfile{
id: number;
uid: string;
name: string;
phone_number: string;
}
interface UserProfileState{
profile: UserProfile | null;
loadProfile: () => Promise<void>;
updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const useProfileStore = create<UserProfileState>((set, get)=>({
profile: null,
loadProfile: async () =>{ 
  const currentUser = auth.currentUser;
  if( !currentUser) {
     console.log("No currentUser yet — skipping loadProfile");
     return;
  };
    const token = await currentUser?.getIdToken();console.log("Token: ", token);
    const res = await axios.get(`${baseUrl}/users/me`, {
        headers: {Authorization: `Bearer ${token}`}
    });
     set({profile: res.data})
},
  updateProfile: async (data: Partial<UserProfile>) => {
    const currentUser = auth.currentUser;
    if(!currentUser) return;
    const token = await currentUser?.getIdToken();
    if (!token) return;
    await axios.put(`${baseUrl}/users/me`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    set({ profile: { ...get().profile, ...data } as UserProfile });
  }

}))

export default useProfileStore;