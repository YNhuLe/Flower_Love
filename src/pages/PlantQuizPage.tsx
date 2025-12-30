import {
  Droplets,
  Sun,
  Thermometer,
  Award,
  Sparkles,
  Camera,  CheckCircle,
  Leaf, AlertOctagon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../common/Button';
import axios from 'axios';
import BreadCrumbs from '../common/BreadCrumbs';
import AI_PlantQuizHeader from '../features/PlantQuiz/AI_PlantQuizHeader';
import { useQuiz } from '../context/QuizContext';
import PlantQuizResultPage from './PlantQuizResultPage';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

function PlantQuizPage() {

  const { step, setStep, conditions, setConditions, error, setError, loading, setLoading,
    recommendations, setRecommendations, selectedPlant, setSelectedPlant
  } = useQuiz();
  const navigate = useNavigate();
  //send the result to the Backend to look for the plant
  const handleSubmit = async () => {

    setStep('analyzing');
    // setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

       const payload = {
      user_id: 123, 
      answers: [
        { question_key: "plant_interest", answer_value: conditions.name },
        { question_key: "avoid_types", answer_value: conditions.plantsToAvoid },
        { question_key: "sunlight", answer_value: conditions.light },
        { question_key: "humidity", answer_value: conditions.humidity_preference },
        { question_key: "plantinglevel", answer_value: conditions.plantinglevel },
        { question_key: "temperature", answer_value: conditions.temperature_range }
      ]
    }

    // console.log("Pay load: ", payload);
    
      const response = await axios.post(`${baseUrl}/quiz/answers`,   
        payload
      );
     console.log("Result data : ", response.data);
       navigate('/products/quiz/quiz_result');
       setRecommendations(response.data.recommendations);
 setStep('results');
   

    } catch (error: any) {
      setError(error.message || "Failed to send the plant quiz result to backend!")

    } finally {
      setLoading(false);
    }
  };

  // console.log("Conditions from quiz: ", conditions)
  return (
    <section>
      <BreadCrumbs />
      <AI_PlantQuizHeader />

      {/* the progress bar */}
      <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
        <div className="flex items-center w-full m-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'questionnaire' || step === 'analyzing' || step === 'results' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
            {step === 'analyzing' || step === 'results' ? <CheckCircle className="w-5 h-5" /> : '1'}
          </div>
          <div className={`flex-1 h-1 mx-2 ${step === 'analyzing' || step === 'results' ? 'bg-amber-600' : 'bg-stone-200'}`} />
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'analyzing' || step === 'results' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
            {step === 'results' ? <CheckCircle className="w-5 h-5" /> : '2'}
          </div>
        </div>
      </div>

      {/* form for the recommendations from AI */}
      <div className='rounded-xl m-4 shadow-2xl'>
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
                          className={`p-2 rounded-xl border transition-all text-xs ${conditions.light === option
                            ? 'border border-amber-800 bg-amber-50 text-amber-600'
                            : 'border-text-muted hover:border-amber-600 text-text-primary'
                            }`}
                        >{option}</button>
                      )

                      )
                    }
                  </div>
                </div>

                {/* Temp range section  */}
                <div>
                  <label className='flex gap-2 items-center mt-8'>
                    <Thermometer className="w-[2.5rem] h-[2.5rem] mr-2 text-amber-600" />
                    What's the typical temperature range?

                  </label>
                  <div className='grid grid-cols-2 gap-2 mt-4'>

                    {
                      ['Cool (60-65°F)', 'Moderate (65-75°F)', 'Warm (75-85°F)'].map((option) => (

                        <button
                          key={option}
                          onClick={() => setConditions({ ...conditions, temperature_range: option })}
                          className={`p-2 rounded-xl border transition-all text-xs ${conditions.temperature_range === option
                            ? 'border border-amber-800 bg-amber-50 text-amber-600'
                            : 'border-text-muted hover:border-amber-600 text-text-primary'
                            }`}
                        >{option}</button>
                      )

                      )
                    }
                  </div>
                </div>

                {/* humidity Preference section  */}
                <div>
                  <label className='flex gap-2 items-center mt-8'>
                    <Droplets className="w-7 h-7 mr-2 text-amber-600" />
                    How humid is your space?

                  </label>
                  <div className='grid grid-cols-2 gap-2 mt-4'>

                    {
                      ['Dry', 'Average', 'Humid'].map((option) => (

                        <button
                          key={option}
                          onClick={() => setConditions({ ...conditions, humidity_preference: option })}
                          className={`p-2 rounded-xl border transition-all text-xs ${conditions.humidity_preference === option
                            ? 'border border-amber-800 bg-amber-50 text-amber-600'
                            : 'border-text-muted hover:border-amber-600 text-text-primary'
                            }`}
                        >{option}</button>
                      )

                      )
                    }
                  </div>

                </div>
                {/* Planting level section  */}
                <div>
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
                            onClick={() => setConditions({ ...conditions, plantinglevel: option })}
                            className={`p-2 rounded-xl border transition-all text-xs ${conditions.plantinglevel === option
                              ? 'border border-amber-800 bg-amber-50 text-amber-600'
                              : 'border-text-muted hover:border-amber-600 text-text-primary'
                              }`}
                          >{option}</button>
                        )

                        )
                    }
                  </div>
                </div>
                {/* Room type section  */}
                <div>
                  <label className='flex gap-2 items-center mt-8'>
                    <Camera className="w-7 h-7 mr-2 text-amber-600" />
                    What type of room is this?

                  </label>
                  <div className='grid grid-cols-2 gap-2 mt-4'>

                    {
                      ['Living Room', 'Bedroom', 'Office', 'Bathroom', 'Kitchen', 'Hallway'].map((option) => (

                        <button
                          key={option}
                          onClick={() => setConditions({ ...conditions, room_type: option })}
                          className={`p-2 rounded-xl border transition-all text-xs ${conditions.room_type === option
                            ? 'border border-amber-800 bg-amber-50 text-amber-600'
                            : 'border-text-muted hover:border-amber-600 text-text-primary'
                            }`}
                        >{option}</button>
                      )

                      )
                    }
                  </div>
                </div>
                {/* plant interest section  */}
                <div>
                  <label className='flex gap-2 items-center mt-8'>
                    <Leaf className="w-10 h-10 mr-2 text-amber-600" />
                    Waht type of plant are you interested in?

                  </label>
                  <div className='grid grid-cols-2 gap-2 mt-4'>

                    {
                      ['Foliage Plants', 'Flowering Plants', 'Succulents & Cacti', 'Climbing Vines', 'Air-Purifying', 'Pet-Friendly'].map((option) => (

                        <button
                          key={option}
                          onClick={() => setConditions({ ...conditions, name: option })}
                          className={`p-2 rounded-xl border transition-all text-xs ${conditions.name === option
                            ? 'border border-amber-800 bg-amber-50 text-amber-600'
                            : 'border-text-muted hover:border-amber-600 text-text-primary'
                            }`}
                        >{option}</button>
                      )

                      )
                    }
                  </div>
                </div>
                {/* Avoid plant section  */}
                <div>
                  <label className='flex gap-2 items-center mt-8'>
                    <AlertOctagon className="w-[5rem] h-[5rem] mr-2 text-error-700" />
                    Are there any plant types you'd like to avoid?
                    <p className='text-text-muted'>(Optional - Select all that apply)</p>
                  </label>
                  <div className='grid grid-cols-2 gap-2 mt-4'>

                    {
                      ['High Maintenance', 'Toxic to Pets', 'Requires Frequent Watering', 'Needs High Humidity', 'Large/Bulky Plants', 'Prone to Pests'].map((option) => (

                        <button
                          key={option}
                          onClick={() => {
                            const isSelected = conditions.plantsToAvoid.includes(option);
                            if (isSelected) {
                              setConditions(
                                {
                                  ...conditions,
                                  plantsToAvoid: conditions.plantsToAvoid.filter(plant => plant !== option)
                                }
                              )
                            } else {
                              setConditions(
                                {
                                  ...conditions,
                                  plantsToAvoid: [...conditions.plantsToAvoid, option]
                                }
                              )
                            }
                          }}
                          className={`rounded-xl border transition-all p-4 relative text-xs ${conditions.plantsToAvoid.includes(option)
                            ? 'border border-error-700 bg-error-200 text-error-700'
                            : 'border-text-muted hover:border-error-700 text-text-primary'
                            }`}
                        >{option}
                          {conditions.plantsToAvoid.includes(option) &&

                            (<AlertOctagon className="w-3 h-3 text-error-700 absolute  ml-2 right-1 top-2 " />)}

                        </button>
                      )
                      )
                    }
                  </div>
                </div>
              </div>
              {/* Ai analyse AI button */}
              <div>
                <Button
                  onClick={handleSubmit}
                  btnType='AI_analyze' disabled={!conditions.light || !conditions.light ||
                    !conditions.humidity_preference || !conditions.name || !conditions.plantinglevel || !conditions.temperature_range
                  }></Button>

              </div>

            </motion.div>
          }



          {
            step === 'analyzing' &&
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-text-inverse rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className=" p-4 flex flex-col items-center">
                <div className="p-4 bg-gradient-to-br from-amber-600 to-amber-800 border rounded-full w-fit mt-4 shadow-lg animate-pulse">
                  <Sparkles className="w-6 h-6 text-brand-100" /></div>
                <h2 className='my-4'>Analyzing your space</h2>
                <p className='text-xs text-center'>Our AI is examining your romm conditions and finding the perfect plant matches...</p>

                <div className='flex gap-2 mt-6'>
                  <CheckCircle className='text-success-500' />
                  <p className='text-xs'>Analyzing room lighting conditions</p>
                </div>

                <div className='flex gap-2  mt-4'>
                  <CheckCircle className='text-success-500' />
                  <p className='text-xs'>Evaluating temperature and humidity</p>
                </div>

                <div className='flex  gap-2 mt-4'>
                  <div className='w-[1.25rem] h-[1.2rem] border-2 border-amber-600 border-t-transparent rounded-full animate-spin'></div>

                  <p className='text-xs'>Matching with plant inventory</p>
                </div>

              </div>

            </motion.div>
          }


        </AnimatePresence>
   
      </div>
    </section>
  )
}
export default PlantQuizPage;

