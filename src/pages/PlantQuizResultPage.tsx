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
function PlantQuizResultPage(){

    const OrangeCheckIcon = () => (
   <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
  <CheckCircle className="text-white w-6 h-6" strokeWidth={2.5} />
</div>
);

      const [step, setStep] = useState<'questionnaire' | 'analyzing' | 'results'>('questionnaire');
    return(

      
        <>
        
        <section>
            <BreadCrumbs />
            
         <AI_PlantQuizHeader />
        </section>


        {/*  Step 2: Analyzing the quiz */}



  {/* //recommendation section */}
  <section>

   <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
        <div className="flex items-center w-full m-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'questionnaire' || step === 'analyzing' || step === 'results' ? 'bg-amber-500 text-muted' : 'bg-stone-200 text-stone-500'}`}>
            {step === 'analyzing' || step === 'results' ? <CheckCircle className="w-5 h-5" /> :   < OrangeCheckIcon/>}
          </div>
          <div className={`flex-1 h-1 mx-2 ${step === 'analyzing' || step === 'results' ? 'bg-amber-500' : 'bg-amber-500'}`} />
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'analyzing' || step === 'results' ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-500'}`}>
            {step === 'results' ? <CheckCircle className="w-5 h-5" /> :  < OrangeCheckIcon/>}
          </div>
        </div>
      </div> 

    

  {/* Analyzing      */}
  <AnimatePresence>
        {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-text-muted rounded-2xl shadow-lg p-16 text-center"
            >
                <div className=" p-4 flex flex-col items-center rounded-xl m-4 shadow-2xl">
                            <div className="p-4 bg-gradient-to-r from-amber-600 to-amber-800 border rounded-full w-fit mt-4">
                                <Sparkles className="w-6 h-6 text-brand-100" /></div>
                            <h1 className='my-4'>AI Plant Finder</h1>
                            <p className='text-xs text-center'>Answer a few questions about your space and our AI will recommend the perfect plants that will thrive in your environment.</p>
                            <div className="w-full h-auto object-cover mx-auto flex justify-center mt-4">
                                <div className=" p-2 bg-amber-50 border rounded-2xl border-amber-600 w-fit flex gap-2 items-center bottom-2">
                                    <Camera className="w-4 h-4 text-amber-600" />
                                    <p className="text-xs">AI-powered plant recommendations</p></div></div>
                        </div>
                        <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
                        </div> 
            </motion.div>
          )}
       
       </AnimatePresence> 

  </section>
        </>
    )
}
export default PlantQuizResultPage;