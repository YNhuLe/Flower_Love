import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useProfileStore from "../../hooks/useProfileStore";

/**
 * Handles the Auth0 callback after authentication.
 * - Checks if the user is authenticated and retrieves the access token.
 * - Decodes the token to determine if the user is a Google user or a regular user.
 * - Sends a POST request to the appropriate backend endpoint to create or update the user in the database.
 * - Sets the user profile in the global state and navigates to the profile page.
 * - Handles errors gracefully, allowing authenticated users to proceed even if backend sync fails.
 * @returns The AuthCallback component
 * 
 */

function AuthCallback() {
    const { setProfile } = useProfileStore();
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, error } = useAuth0();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    useEffect(() => {
        const handleUser = async () => {
            // Wait for Auth0 to finish loading
            if (isLoading) {
                console.log('⏳ Still loading...');
                return;
            }

            // Handle authentication errors
            if (error) {
                console.error('❌ Auth error:', error);
                alert('Authentication failed: ' + error.message);
                navigate('/signup');
                return;
            }

            // If not authenticated, redirect to signup
            if (!isAuthenticated || !user) {
                console.log('❌ Not authenticated, redirecting to signup');
                navigate('/signup');
                return;
            }

            try {
                console.log('🔐 Getting access token...');
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: import.meta.env.VITE_AUTH0_AUDIENCE
                    }, cacheMode: "off"
                });
                console.log('Received token:', token);
                const payload: any = jwtDecode(token);
                const isGoogleUser = payload.sub?.startsWith('google-oauth2|');
                const endpoint = isGoogleUser ? `${baseUrl}/auth/google` : `${baseUrl}/users`;

                const body = isGoogleUser ? {} : {
                    name: payload['https://eververdant.com/name'],
                    email: payload['https://eververdant.com/email'],
                    phone_number: payload['https://eververdant.com/phone_number'],
                    uid: payload.sub,
                };
                const response = await axios.post(
                    endpoint,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                setProfile(response.data);
                // Navigate to profile regardless of 200 or 201
                navigate('/users/profile');

            } catch (err: any) {

                if (axios.isAxiosError(err) && err.response?.status === 409) {
                    console.warn('⚠️ User already exists, fetching existing profile...');
                    navigate('/users/profile');
                    return;
                }
                console.error('❌ Error syncing user:', err.message);
                localStorage.removeItem(`@@auth0spajs@@::${import.meta.env.VITE_AUTH0_CLIENT_ID}::${import.meta.env.VITE_AUTH0_AUDIENCE}::openid profile email offline_access`);

                // Even if backend sync fails, let them proceed if authenticated
                if (isAuthenticated) {
                    console.log('⚠️ Backend sync failed but user is authenticated, proceeding to profile');
                    navigate('/users/profile');
                } else {
                    alert('Failed to sync user data. Please try again.');
                    navigate('/signup');
                }
            }
        };

        handleUser();
    }, [isAuthenticated, isLoading, user, error, getAccessTokenSilently, navigate, baseUrl]);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <p className="text-lg">Setting up your account...</p>
        </div>;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg">Redirecting...</p>
        </div>
    );
}

export default AuthCallback;