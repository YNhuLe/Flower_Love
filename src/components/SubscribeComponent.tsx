import Button from "../common/Button";
import { useState } from "react";
import axios from "axios";
function SubscribeComponent() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

    console.log("this is the Email: ", email)
    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {

            const { data } = await axios.post(`${baseUrl}/subscribe`, { email });
            setStatus('success');
            setMessage(data.message)
        } catch (error: any) {
            setStatus('error');
            setMessage(error.response?.data?.error || error.message)
        }
    }
    return (
        <div className="bg-success-300 border-none rounded-md p-4 mt-8">
            <h2 className="text-text-inverse text-xl font-semibold">Stay Updated with Evererdant</h2>
            <p className="text-text-inverse text-xs my-2 text-center">Get the latest plant care tips, new arrivals, and exclusive offers delivered to your inbox.</p>
            <form
                onSubmit={handleSubscribe}
            >
                <input type="email"
                    placeholder="Enter your email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}

                    className="bg-text-inverse  text-text-muted text-xs w-full border rounded-md border-none mt-4" />

                <Button btnType='subscribe' disabled={status === 'loading'} />
            </form>
        </div>
    );
}

export default SubscribeComponent;