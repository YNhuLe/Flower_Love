import {
  Share2,
  Droplets,
  Sun,
  Thermometer,
  Wind,Award,
  Sparkles,
  Camera, Brain, Image, CheckCircle, ArrowLeft, XCircle,
  Leaf,AlertOctagon
} from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { RoomConditions, PlantRecommendation } from '../types/types';

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
  const [selectedPlant, setSelectedPlant] = useState<PlantRecommendation | null>(null);
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
        {
          step === 'questionnaire' &&
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <h2 className='text-center mb-4'>Tell Us About Your Room</h2>
            <p className='text-center  mb-8'>Answer these questions to help us find your perfect plant match</p>



            <div>
              {/* Sunlight section */}
           
              <label className='flex gap-2 items-center'>
                <Sun className="w-[3rem] h-[3rem] mr-2 text-amber-600" />
                How much natural sunlight does this room get?

              </label>
              <div className='grid grid-cols-2 gap-2 mt-4'>

                {
                  ['Low', 'Medium', 'Bright', 'Direct'].map((option) => (

                    <button
                      key={option}
                      onClick={() => setConditions({ ...conditions, light: option })}
                      className={`p-2 rounded-xl border transition-all ${conditions.light === option
                        ? 'border border-amber-800 bg-amber-50 text-amber-600'
                        : 'border-text-muted hover:border-amber-600 text-text-primary'
                        }`}
                    >{option}</button>
                  )

                  )



                }
              </div>


 {/* Temp range section  */}
           
              <label className='flex gap-2 items-center mt-8'>
                <Thermometer className="w-[2.5rem] h-[2.5rem] mr-2 text-amber-600" />
               What's the typical temperature range?

              </label>
              <div className='grid grid-cols-2 gap-2 mt-4'>

                {
                  ['Cool (60-65°F)', 'Moderate (65-75°F)', 'Warm (75-85°F)'].map((option) => (

                    <button
                      key={option}
                      onClick={() => setConditions({ ...conditions, light: option })}
                      className={`p-2 rounded-xl border transition-all ${conditions.light === option
                        ? 'border border-amber-800 bg-amber-50 text-amber-600'
                        : 'border-text-muted hover:border-amber-600 text-text-primary'
                        }`}
                    >{option}</button>
                  )

                  )



                }
              </div>


              {/* humidity Preference section  */}
           
              <label className='flex gap-2 items-center mt-8'>
                <Droplets className="w-7 h-7 mr-2 text-amber-600" />
               How humid is your space?

              </label>
              <div className='grid grid-cols-2 gap-2 mt-4'>

                {
                  ['Dry', 'Average', 'Humid'].map((option) => (

                    <button
                      key={option}
                      onClick={() => setConditions({ ...conditions, light: option })}
                      className={`p-2 rounded-xl border transition-all ${conditions.light === option
                        ? 'border border-amber-800 bg-amber-50 text-amber-600'
                        : 'border-text-muted hover:border-amber-600 text-text-primary'
                        }`}
                    >{option}</button>
                  )

                  )



                }
              </div>


              {/* Planting level section  */}
           
              <label className='flex gap-2 items-center mt-8'>
                <Award className="w-10 h-10 mr-2 text-amber-600" />
               How confident are you in caring for plants?

              </label>
              <div className='grid grid-cols-2 gap-2 mt-4'>

                {
                  ['Beginner (I’ve killed succulents before 😅)', 
                    'Intermediate (I can keep a few alive)', 'Advanced (I love a challenge)'].map((option) => (

                    <button
                      key={option}
                      onClick={() => setConditions({ ...conditions, light: option })}
                      className={`p-2 rounded-xl border transition-all ${conditions.light === option
                        ? 'border border-amber-800 bg-amber-50 text-amber-600'
                        : 'border-text-muted hover:border-amber-600 text-text-primary'
                        }`}
                    >{option}</button>
                  )

                  )



                }
              </div>

              {/* Room type section  */}
           
              <label className='flex gap-2 items-center mt-8'>
                <Camera className="w-7 h-7 mr-2 text-amber-600" />
              What type of room is this?

              </label>
              <div className='grid grid-cols-2 gap-2 mt-4'>

                {
                  ['Living Room', 'Bedroom', 'Office', 'Bathroom', 'Kitchen', 'Hallway'].map((option) => (

                    <button
                      key={option}
                      onClick={() => setConditions({ ...conditions, light: option })}
                      className={`p-2 rounded-xl border transition-all ${conditions.light === option
                        ? 'border border-amber-800 bg-amber-50 text-amber-600'
                        : 'border-text-muted hover:border-amber-600 text-text-primary'
                        }`}
                    >{option}</button>
                  )

                  )



                }
              </div>

                 {/* plant interest section  */}
           
              <label className='flex gap-2 items-center mt-8'>
                <Leaf className="w-10 h-10 mr-2 text-amber-600" />
              Waht type of plant are you interested in?

              </label>
              <div className='grid grid-cols-2 gap-2 mt-4'>

                {
                  ['Foliage Plants', 'Flowering Plants', 'Succulents & Cacti', 'Climbing Vines', 'Air-Purifying', 'Pet-Friendly'].map((option) => (

                    <button
                      key={option}
                      onClick={() => setConditions({ ...conditions, light: option })}
                      className={`p-2 rounded-xl border transition-all ${conditions.light === option
                        ? 'border border-amber-800 bg-amber-50 text-amber-600'
                        : 'border-text-muted hover:border-amber-600 text-text-primary'
                        }`}
                    >{option}</button>
                  )

                  )



                }
              </div>

                 {/* Avoid plant section  */}
           
              <label className='flex gap-2 items-center mt-8'>
                <AlertOctagon className="w-[5rem] h-[5rem] mr-2 text-amber-600" />
        Are there any plant types you'd like to avoid?
<p className='text-text-muted'>(Optional - Select all that apply)</p>
              </label>
              <div className='grid grid-cols-2 gap-2 mt-4'>

                {
                  ['High Maintenance', 'Toxic to Pets', 'Requires Frequent Watering', 'Needs High Humidity', 'Large/Bulky Plants', 'Prone to Pests'].map((option) => (

                    <button
                      key={option}
                      onClick={() => setConditions({ ...conditions, light: option })}
                      className={`p-2 rounded-xl border transition-all ${conditions.light === option
                        ? 'border border-amber-800 bg-amber-50 text-amber-600'
                        : 'border-text-muted hover:border-amber-600 text-text-primary'
                        }`}
                    >{option}</button>
                  )

                  )



                }
              </div>
            </div>

          </motion.div>
        }

      </AnimatePresence>
    </section>
  )
}
export default PlantQuizPage;