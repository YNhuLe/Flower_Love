import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function AuthCallback() {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, error } = useAuth0();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

    console.log('AuthCallback - isLoading:', isLoading);
    console.log('AuthCallback - isAuthenticated:', isAuthenticated);
    console.log('AuthCallback - user:', user);
    console.log('AuthCallback - error:', error);

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
                    }
                });

                console.log('📤 Sending user to backend...');
                
                // FIXED: Use the correct backend route
                const response = await axios.post(
                    `${baseUrl}/users`,
                    {}, 
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }
                );

                console.log('✅ User synced to database:', response.data);

                // Navigate to profile regardless of 200 or 201
                navigate('/users/profile');

            } catch (err: any) {
                console.error('❌ Error syncing user:', err);
                
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