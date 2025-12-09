import {
    Share2,
    Droplets,
    Sun,
    Thermometer,
    Wind,
    Sparkles,
    Camera, Brain, Image, CheckCircle, ArrowLeft, XCircle 
} from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
 
import { RoomConditions ,PlantRecommendation} from '../types/types';

function PlantQuizPage() {
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

  //top 3 recommended plants
  const [recommendations, setRecommendations] = useState<PlantRecommendation[]>([]);
  //the most recommended plant
  const [selectedPlant, setSelectedPlant ] = useState<PlantRecommendation | null>(null);
    return (
        <section>
            <div className=" p-4 flex flex-col items-center">
                <div className="p-4 bg-gradient-to-r from-amber-600 to-amber-800 border rounded-xl w-fit mt-4">
                    <Sparkles className="w-6 h-6 text-brand-100" /></div>
                <h1 className='my-4'>AI Plant Finder</h1>
                <p className='text-xs text-center'>Answer a few questions about your space and our AI will recommend the perfect plants that will thrive in your environment.</p>
                <div className="w-full w-full h-auto object-cover mx-auto flex justify-center mt-4">
                    <div className=" p-2 bg-amber-50 border rounded-2xl border-amber-600 w-fit flex gap-2 items-center bottom-2">
                        <Camera className="w-4 h-4 text-amber-600" />
                        <p className="text-xs">AI-powered plant recommendations</p></div></div>
            </div>

{/* the progress bar */}
             <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
          <div className="flex items-center w-full m-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'questionnaire' || step === 'analyzing' || step === 'results' ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-500'}`}>
              {step === 'analyzing' || step === 'results' ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <div className={`flex-1 h-1 mx-2 ${step === 'analyzing' || step === 'results' ? 'bg-amber-500' : 'bg-stone-200'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'analyzing' || step === 'results' ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-500'}`}>
              {step === 'results' ? <CheckCircle className="w-5 h-5" /> : '2'}
            </div>
          </div>
        </div>

        {/* form for the recommendations from AI */}
<AnimatePresence mode='wait'>


</AnimatePresence>
        </section>
    )
}
export default PlantQuizPage;