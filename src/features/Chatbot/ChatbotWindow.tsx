import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, MessageCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { FaSmile } from "react-icons/fa";
import axios from "axios";
import { useQuiz } from "../../context/QuizContext";
import ReactMarkdown from "react-markdown";
interface Messages {
    role: "user" | "bot";
    content: string;
}

interface ChatbotWindowProps {
    quizSessionId: number;
    userId: number;

}
interface QuickAction {
    label: string;
    query: string;
}
/**
 * 
 * @param param0 quizSessionId, userId
 * @returns chatbot window component that allows user to chat with the bot and get recommendations based on their quiz results.
 *      It also provides quick actions based on the bot's response.
 */
function ChatbotWindow({ quizSessionId, userId }: ChatbotWindowProps) {


    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Messages[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
    const { recommendations } = useQuiz();
    const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
    //auto scroll to the bottom of the chat when a new message is added

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    //default welcome message when chat first open

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {


                setMessages(
                    [
                        {
                            role: 'bot',
                            content: `Hi! Based on your quiz I recommended **${recommendations[0].common_name}**. Want to know how to care for it?`
                        }
                    ]
                );
                setQuickActions([
                    {
                        label: "Watering tips?",
                        query: "How do I water this plant?",
                    },
                    {
                        label: "Is it pet-safe?",
                        query: "Is it safe for my pets?",
                    },
                    {
                        label: "More plants",
                        query: "Show me more plant recommendations",
                    },
                ]);
            }, 500) // add a slight delay to make it feel more natural
        }
    }, [isOpen, recommendations])
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const [chatSessionId, setChatSessionId] = useState<number | null>(null); // <-- new: the real chat_sessions.id, created lazily
    // ...keep all your other existing state as-is

    const ensureChatSession = async (): Promise<number> => {
        if (chatSessionId) return chatSessionId;

        const result = await axios.post(`${baseUrl}/chat-sessions`, {
            user_id: userId,
            quiz_sessions_id: quizSessionId,
        });
        const newId = result.data.id;
        setChatSessionId(newId);
        return newId;
    };

    const handleSendMessage = async (message?: string) => {


        const userMessage = message || inputValue.trim();
        if (!userMessage || isLoading) return;
        setInputValue('');
        setQuickActions([]);
        //messages will contains the list of previous messages and the new ones from user
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);
        //send the message to backend for processing and get the response
        try {
            const activeChatSessionId = await ensureChatSession();
            const result = await axios.post(`${baseUrl}/chat`, {
                session_id: activeChatSessionId,
                message: userMessage
            });

            const data = result.data;
            setMessages(prev => [...prev, { role: "bot", content: data.reply }]);
            updateQuickActions(data.quick_actions);
        } catch (err: any) {
            console.error("Error sending message:", err.response?.data || err.message || err);
        } finally {
            setIsLoading(false);
        }

    };

    const quickActionsMap: Record<string, QuickAction[]> = {
        water: [
            { label: "Light needs?", query: "How much light does it need?" },
            { label: "Fertilizing?", query: "How do I fertilize it?" },
            { label: "Is it pet safe?", query: "Is it safe for my cat?" },
        ],
        pet: [
            { label: "Care guide", query: "Give me a full care guide" },
            { label: "Watering tips?", query: "How often do I water it?" },
            { label: "Where to buy?", query: "Where can I buy it?" },
        ],
        light: [
            { label: "Watering tips?", query: "How often do I water it?" },
            { label: "Temperature?", query: "What temperature does it need?" },
            { label: "Is it pet safe?", query: "Is it safe for my cat?" },
        ],
        buy: [
            { label: "Care guide", query: "Give me a full care guide" },
            { label: "Watering tips?", query: "How often do I water it?" },
        ],
        default: [
            { label: "Watering tips?", query: "How often do I water it?" },
            { label: "Is it pet safe?", query: "Is it safe for my cat?" },
            { label: "Care guide", query: "Give me a full care guide" },
            { label: "Where to buy?", query: "Where can I buy it?" },
        ]
    }

    const keywordMap: { keywords: string[], key: string }[] = [
        { keywords: ["water", "watering"], key: "water" },
        { keywords: ["pet", "cat", "dog", "toxic"], key: "pet" },
        { keywords: ["light", "sun", "bright"], key: "light" },
        { keywords: ["buy", "page", "purchase"], key: "buy" },
    ];

    const updateQuickActions = (lastMessage: string) => {

        //add gaurd clause to check if lastMessage is empty or null, if so set to default quick actions
        if (!lastMessage) {
            setQuickActions(quickActionsMap['default'])
            return;
        }
        const lower = lastMessage.toLowerCase();

        const match = keywordMap.find(({ keywords }) =>
            keywords.some(keyword => lower.includes(keyword))
        );

        setQuickActions(quickActionsMap[match?.key ?? "default"]);
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    return (

        <>
            <AnimatePresence>
                {
                    !isOpen && (

                        <motion.button


                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => setIsOpen(true)}
                            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-success-500 to-success-700 hover:from-success-700 hover:to-success-500 rounded-full shadow-xl flex items-center justify-center text-white z-50 transition-all hover:scale-110"
                        >
                            <MessageCircle className="w-7 h-7" />
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-text-inverse" />
                            </div>


                        </motion.button>)}

            </AnimatePresence>
            <AnimatePresence>

                {
                    isOpen && (


                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.3 }}

                            className="fixed bottom-8 right-4 w-[18rem] h-[30rem] bg-text-primary/90  rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-text-muted"
                        >

                            <div className="p-5 flex items-center justify-between border-b border-text-muted ">
                                <div className="flex items-center gap-3 ">
                                    <div className="w-12 h-12 bg-success-700 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-text-inverse" />
                                    </div>
                                    <div className="">
                                        <h3 className="text-text-inverse font-semibold text-lg">
                                            Plant Advisor
                                        </h3>
                                        <p className="text-text-muted text-sm">
                                            Ask me anything
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full hover:bg-text-primary/80 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-6 h-6 text-text-muted" />
                                </button>
                            </div>
                            {/* add this between header div and input div */}
                            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >


                                        <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed prose prose-invert prose-sm
                                            ${msg.role === "user" ? "bg-success-700 text-text-inverse rounded-tr-sm" : "bg-text-primary/40 text-text-inverse rounded-tl-sm"}`}
                                        >
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ node, ...props }) => (
                                                        <a {...props} target="_blank" rel="noopener noreferrer" className="underline text-success-300" />
                                                    )
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))}


                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-text-primary/40 rounded-2xl rounded-tl-sm px-4 py-3">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <div className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={bottomRef} />
                            </div>

                            {quickActions.length > 0 && !isLoading && (
                                <div className="px-4 pb-3 flex gap-2 flex-wrap">
                                    {quickActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSendMessage(action.query)}
                                            className="text-xs px-3 py-2 rounded-full border border-text-muted bg-text-primary/20 text-text-inverse hover:bg-success-700/40 transition-colors cursor-pointer"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="p-4 bg-text-primary/40 border-t border-text-muted mt-auto">
                                <div className="flex gap-2">
                                    <input
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about your plants..."
                                        className="flex-1 rounded-full bg-text-primary/90 border-text-muted text-text-inverse placeholder:text-text-muted focus:border-text-primary h-12"
                                    />
                                    <button
                                        onClick={() => handleSendMessage()}
                                        disabled={!inputValue.trim() || isLoading}
                                        className="bg-success-500 hover:bg-success-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-success-500
                                                    rounded-full w-12 h-12 p-0 flex items-center justify-center">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence></>
    );

}

export default ChatbotWindow;