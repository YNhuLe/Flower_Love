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
import { FaCheck } from "react-icons/fa";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from "react";
import AI_PlantQuizHeader from "../features/PlantQuiz/AI_PlantQuizHeader";
import { useQuiz } from "../context/QuizContext";
import Button from "../common/Button";
import { P } from "framer-motion/dist/types.d-DagZKalS";
function PlantQuizResultPage() {
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";

  const { step, setStep, conditions, setConditions, recommendations, setRecommendations, selectedPlant, setSelectedPlant } = useQuiz();
  const OrangeCheckIcon = () => (
    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
      <CheckCircle className="text-white w-6 h-6" strokeWidth={2.5} />
    </div>
  );
  console.log("recommendations: ", recommendations);
  const firstRecom = recommendations[0];
  let formatArr: string[] = [];
      if (Array.isArray(firstRecom.benefits)) {
        formatArr = firstRecom.benefits;
    } else if (typeof firstRecom.benefits === 'string') {
        try {
            formatArr = JSON.parse(firstRecom.benefits);
        } catch (error: any) {
            console.log("Error: Could not parse benefit data.", error);
            formatArr = [];
        }
    }
  // formatArr = firstRecom.benefits

  console.log("Type of: ", typeof(formatArr));
  
    
    // if (Array.isArray(recommendations.benefits)) {
    //     formatArr = plantInfo.benefits;
    // } else if (typeof plantInfo.benefits === 'string') {
    //     try {
    //         formatArr = JSON.parse(plantInfo.benefits);
    //     } catch (error: any) {
    //         console.log("Error: Could not parse benefit data.", error);
    //         formatArr = [];
    //     }
    // }
  return (
    <>
      <BreadCrumbs />

      <AI_PlantQuizHeader />

      {/* //recommendation section */}
      <section>

        <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
          <div className="flex items-center w-full m-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'questionnaire' || step === 'analyzing' || step === 'results' ? 'bg-amber-500 text-muted' : 'bg-stone-200 text-stone-500'}`}>
              < OrangeCheckIcon />
            </div>
            <div className={`flex-1 h-1 mx-2 ${step === 'analyzing' || step === 'results' ? 'bg-amber-500' : 'bg-amber-500'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'analyzing' || step === 'results' ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-500'}`}>
              < OrangeCheckIcon />
            </div>
          </div>
        </div>

        {/*     
{
  step === 'results' && selectedPlant && (
   <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            >
         

            </motion.div>
  )
} */}

        <article className="bg-text-inverse h-fit mx-4 rounded-2xl overflow-hidden shadow-lg">




          <div className="bg-success-500  shadow-lg p-4 md:p-12 flex justify-between">
            <div className="flex flex-col gap-0">

              <h2 className="text-xxs text-text-inverse">Best Match</h2>
              <p className="text-[.7rem] text-text-inverse">Recommended for your space</p>

            </div>
            <div className="w-fit p-2  bg-text-inverse/40 rounded-3xl flex  items-center">
              <p className="text-xs text-center text-text-inverse">{firstRecom.scoreMatch * 100}% Match</p>
            </div>
          </div>



<img src={firstRecom.image} alt={firstRecom.common_name} />

<h2>{firstRecom.common_name}</h2>
<p>{firstRecom.scientific_name}</p>

<div><span>{firstRecom.plantinglevel}</span></div>

          <div>

            <h2 className="text-xxs">Why this plant is perfect for you:</h2>

            {
     formatArr.map((ben, index) =>(
                 <div className="flex flex-row gap-2">
                                                <FaCheck className="w-4 h-3 text-success-500 " />
                                                <p key={index} className="text-xs mb-2 ">{ben}</p>
                                           
                                                </div>
              ))
            }
          </div>


          {
            recommendations.slice(1, 3).map((recoms, id) => (

              <div></div>
            ))
          }
          <Button btnType="add_to_cart"></Button>
        </article>
      </section>
    </>
  )
}
export default PlantQuizResultPage;