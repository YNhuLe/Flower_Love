import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);


const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);
const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

/**
 * sign in with google or facebook using auth0. The user will be redirected to the auth0 login page and then back to the app. The user information will be stored in the auth0 user object and can be accessed using the useAuth0 hook.
 *  The user information can also be sent to the backend to create a new user in the database if it doesn't exist already.
 * @returns JSX.Element
 */
function SocialAuth() {
    const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const handleSignupWithGoogle = async () => {
        await loginWithRedirect({
            authorizationParams: {
                connection: "google-oauth2",
            }
        })

    }

    const handleSignUpWithFacebook = async () => {
        await loginWithRedirect({
            authorizationParams: {
                connection: "facebook"
            }
        })
    }
    const socialButtons = [{ name: "Google", icon: <GoogleIcon /> },
    { name: "Facebook", icon: <FacebookIcon /> },];
    return (<div className="flex gap-2 w-full p-4 justify-center items-center my-4">
        {socialButtons.map((social) => (
            <button key={social.name}
                onClick={social.name === "Google" ? handleSignupWithGoogle : handleSignUpWithFacebook}
                className="px-14 text-xs py-2 border border-text-primary rounded-xl w-fit flex items-center hover:border-success-800 hover:shadow-lg transition-colors duration-300" > {social.icon} </button>))} </div>);
}
export default SocialAuth;
