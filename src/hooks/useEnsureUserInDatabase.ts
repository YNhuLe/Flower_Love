import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useProfileStore from './useProfileStore';
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const useEnsureUserInDatabase = () => {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const {profile, setProfile} = useProfileStore();
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() =>{
        const syncUser = async () =>{
            if( isLoading || !isAuthenticated || !user || syncing || profile) return;
            setSyncing(true);
            try{
                const token = await getAccessTokenSilently();
                console.log('Ensuring user in database with token:', token);
                const response = await axios.post(`${baseUrl}/auth/google`,  {},{
                    headers: {Authorization:`Bearer ${token}`,  'Content-Type': 'application/json'},  
                });
                 setProfile(response.data);
                 console.log("User synced with database: ", response.data);
            }catch(error: any){
                console.error("Error syncing user with database: ", error);
                setError(error.response?.data?.message || "Failed to sync user with database");
            } finally {
                setSyncing(false);
            }
        }
        syncUser();
    }, [isLoading, isAuthenticated, user, profile, setProfile, getAccessTokenSilently]);
return { profile, syncing, error};
}

export default useEnsureUserInDatabase;