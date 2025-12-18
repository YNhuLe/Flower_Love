import BreadCrumbs from "../common/BreadCrumbs";
import {
  Share2,
  Droplets,
  Sun,
  Thermometer,
  Wind, Award,
  Sparkles,
  Camera, Brain, Image, CheckCircle, 
  Leaf, AlertOctagon,
  Divide,
  Key
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";
import AI_PlantQuizHeader from "../features/PlantQuiz/AI_PlantQuizHeader";
import { useQuiz } from "../context/QuizContext";
function PlantQuizResultPage(){
const {step, setStep, conditions,setConditions, recommendations, setRecommendations, selectedPlant, setSelectedPlant } = useQuiz();
    const OrangeCheckIcon = () => (
   <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
  <CheckCircle className="text-white w-6 h-6" strokeWidth={2.5} />
</div>
);

    return(

      
        <>
        
   
            <BreadCrumbs />
            
         <AI_PlantQuizHeader />
    




  {/* //recommendation section */}
  <section>

   <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
        <div className="flex items-center w-full m-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'questionnaire' || step === 'analyzing' || step === 'results' ? 'bg-amber-500 text-muted' : 'bg-stone-200 text-stone-500'}`}>
      < OrangeCheckIcon/>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step === 'analyzing' || step === 'results' ? 'bg-amber-500' : 'bg-amber-500'}`} />
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'analyzing' || step === 'results' ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-500'}`}>
         < OrangeCheckIcon/>
          </div>
        </div>
      </div> 

    
{
  step === 'results' && selectedPlant && (
   <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
         

            </motion.div>
  )
}

  </section>
        </>
    )
}
export default PlantQuizResultPage;