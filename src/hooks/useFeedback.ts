import {useState} from 'react';
import axios from 'axios';

type FeedbackTarget = {
    sessionId: number | null;
    plantId : string;
}

/** 
 * Custom hook to handle feedback submission for recommended plants.
 * @param sessionId - The ID of the quiz session.
 * @param plantId - The ID of the plant.
 * @returns An object containing the current vote and a function to submit feedback.
 */
function useFeedback({sessionId, plantId}: FeedbackTarget){
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [vote, setVote] = useState<"up" | "down" | null>(null);


  const submitFeedback = async( feedback: 'up' | 'down') =>{
    setVote(feedback);
    try {
        await axios.post(`${baseUrl}/recommendation/feedback`, {
        quiz_session_id: sessionId,
        plant_id: plantId,
        feedback: feedback === "up" ? 1 : -1,
        })
    } catch (error:any) {
        console.error("Error submitting feedback:", error);
    }
  }
  return {vote, submitFeedback};
}

export default useFeedback;