import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function AuthCallback() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    useEffect(() => {
        const handleUser = async () => {
            if (!isAuthenticated) return;

            const token = await getAccessTokenSilently();
            //send user to the backend
            const response = await axios.post(`${baseUrl}/auth/google`, {
                email: user?.email,
                name: user?.name,
                picture: user?.picture,
                auth0_id: user?.sub
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            //navigate based on the user status
            if (response.status) {
                navigate("/signup/profile")
            } else {
                navigate("/")
            }

        }
        handleUser();
    }, [isAuthenticated])



    return (
        <></>
    )
}

export default AuthCallback;