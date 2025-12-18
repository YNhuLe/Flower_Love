import { createContext, useState, useMemo, ReactNode, useContext } from "react";
import { RoomConditions, PlantRecommendation } from "../types/types";

//make sure the setter function only get the only recieve the values that match the type of the state
interface QuizContextType {

  step: 'questionnaire' | 'analyzing' | 'results';
  setStep: React.Dispatch<React.SetStateAction<'questionnaire' | 'analyzing' | 'results'>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;

  conditions: RoomConditions;
  setConditions: React.Dispatch<React.SetStateAction<RoomConditions>>;

  recommendations: PlantRecommendation[];
  setRecommendations : React.Dispatch<React.SetStateAction<PlantRecommendation[]>>;

  selectedPlant: PlantRecommendation | null ;
  setSelectedPlant: React.Dispatch<React.SetStateAction<PlantRecommendation | null>>;

}

const QuizContext = createContext<QuizContextType | undefined>(undefined);
const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

function QuizProvider({children}: {children: ReactNode}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<PlantRecommendation[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<PlantRecommendation | null>(null);
  const [step, setStep] = useState<'questionnaire' | 'analyzing' | 'results'>('questionnaire');
  const [conditions, setConditions] = useState<RoomConditions>({
    light: '',
    temperature_range: '',
    humidity_preference: '',
    plantinglevel: '',
    room_type: '',
    name: '',
    plantsToAvoid: []
  });

// keep track of the variables in the dependencies array,
//  The factory function (() => ({...})) will only re-execute and create a new contextValue object when at least one of those variables changes its value since the last render.
//ensure the efficient rendering for all components
  const contextValue = useMemo(() => ({
    step, setStep, loading, setLoading, error, setError, conditions, setConditions, recommendations, setRecommendations,
    selectedPlant, setSelectedPlant
  }), [step, loading, error, conditions, recommendations, selectedPlant])
  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  )
}
export { QuizProvider, useQuiz };
export default QuizContext;