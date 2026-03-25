import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { FaSmile } from "react-icons/fa";

function ChatbotWindow() {


    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        console.log("User message:", inputValue);
        setInputValue("");
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

                            {/* Input */}
                            <div className="p-4 bg-text-primary/40 border-t border-text-muted mt-auto">
                                <div className="flex gap-2">
                                    <input
                                        value={inputValue}
                                        onChange={(e) =>
                                            setInputValue(e.target.value)
                                        }
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about your plants..."
                                        className="flex-1 rounded-full bg-text-primary/90 border-text-muted text-text-inverse placeholder:text-text-muted focus:border-text-primary h-12"
                                    />
                                    <button
                                        onClick={() => handleSendMessage()}
                                        disabled={!inputValue.trim()}
                                        className="bg-success-500 hover:bg-success-600 
                                disabled:opacity-50        
    disabled:cursor-not-allowed
    disabled:hover:bg-success-500
                                rounded-full w-12 h-12 p-0 flex items-center justify-center"
                                    >
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