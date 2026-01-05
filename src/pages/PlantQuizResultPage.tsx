import BreadCrumbs from "../common/BreadCrumbs";
import {
  CheckCircle, ArrowRight
} from 'lucide-react';
import { useMemo } from "react";
import AI_PlantQuizHeader from "../features/PlantQuiz/AI_PlantQuizHeader";
import { useQuiz } from "../context/QuizContext";
import Button from "../common/Button";
import SecondaryRecommendedCard from "../features/PlantQuiz/SecondaryRecommendedCard";
import Footer from "../common/Footer";
import { useNavigate, Link } from "react-router-dom";
function PlantQuizResultPage() {
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,f_auto,q_auto";
  const navigate = useNavigate();
  const { step, setStep, conditions, setConditions, recommendations, setRecommendations, selectedPlant, setSelectedPlant } = useQuiz();
  const OrangeCheckIcon = () => (
    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
      <CheckCircle className="text-white w-6 h-6" strokeWidth={2.5} />
    </div>
  );

  //reset the quiz page
  const resetAnalysis = () => {
    setStep('questionnaire');
    setConditions({
      light: "",
      temperature_range: "",
      humidity_preference: "",
      plantinglevel: "",
      room_type: "",
      name: "",
      plantsToAvoid: []
    });
    setRecommendations([]);
    setSelectedPlant(null);
    navigate("/products/quiz");

  }

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

  const gradients = [
    "from-green-500 via-emerald-600 to-teal-700",
    "from-purple-500 via-indigo-600 to-blue-700",
    "from-orange-400 via-red-500 to-pink-600",
    "from-rose-400 via-fuchsia-500 to-purple-600",
    "from-sky-400 via-blue-500 to-indigo-600",
    "from-amber-400 via-orange-500 to-yellow-600"
  ];
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    const selectedGradient = useMemo(() => randomGradient, []);
    
  return (
    <>
      <BreadCrumbs />

      <AI_PlantQuizHeader />

      {/* //recommendation section */}
      <section>

        <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
          <div className="flex items-center w-full m-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'questionnaire' || step === 'analyzing' || step === 'results' ? 'bg-amber-600 text-muted' : 'bg-stone-200 text-stone-500'}`}>
              < OrangeCheckIcon />
            </div>
            <div className={`flex-1 h-1 mx-2 ${step === 'analyzing' || step === 'results' ? 'bg-amber-600' : 'bg-amber-600'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'analyzing' || step === 'results' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
              < OrangeCheckIcon />
            </div>
          </div>
        </div>

        <article className="bg-text-inverse h-fit m-4 rounded-2xl overflow-hidden shadow-lg pb-6">




          <div className="bg-success-500  shadow-lg p-4 md:p-12 flex justify-between">
            <div className="flex flex-col gap-0">

              <h2 className="text-xxs text-text-inverse">Best Match</h2>
              <p className="text-[.7rem] text-text-inverse">Recommended for your space</p>

            </div>
            <div className="w-fit p-2  bg-text-inverse/40 rounded-3xl flex  items-center">
              <p className="text-xs text-center text-text-inverse">{firstRecom.scoreMatch * 100}% Match</p>
            </div>
          </div>

          <Link to={`/products/${recommendations[0].id}`}
      className="group w-full h-full  cursor-pointer m-4  shadow-sm hover:shadow-2xl transition-all duration-500"
      >
            <div className="relative overflow-hidden h-[15rem] m-4">
              <img
                className="w-full h-full object-cover transition-all  duration-700 ease-in-out opacity-100 group-hover:scale-110 group-hover:backdrop-blur-sm "

                src={`${cloud_url}/${firstRecom.image_url[0]}`}
                alt={firstRecom.common_name} />
              <div
                className={`absolute  rounded-xl w-full h-full inset-0 z-10 bg-gradient-to-br ${selectedGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`}
          />
              <div className="absolute inset-0 z-20 flex gap-0 items-center justify-center  opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                <span className="flex  bg-text-inverse/30 py-2 px-3 text-text-inverse font-bold rounded-full text-xs uppercase tracking-[0.2em] shadow-2xl m-0       
            ">
                  Explore

             <ArrowRight className="w-4 h-4 text-text-inverse transition-tranform duration-300 ease-out transform group-hover:translate-x-1.5" />     </span> </div>

            </div>

     
          </Link>



          <h2 className="text-xxs mx-4">{firstRecom.common_name}</h2>
          <p className="italic text-xs mx-4 text-text-muted">{firstRecom.scientific_name}</p>

          <div className="flex gap-2 items-center">
            <div className="w-fit p-2 px-4 m-4 bg-success-300/40 rounded-3xl flex  items-center">
              <span className="text-success-500 text-xs">{firstRecom.plantinglevel}</span>

            </div>
            <p className="text-center text-amber-600">${firstRecom.original_price}</p></div>

          <div className="m-4">

            <h2 className="text-xxs my-4">Why this plant is perfect for you:</h2>

            {
              formatArr.map((ben, index) => (
                <div key={index} className="flex flex-row gap-2 items-center mt-3">

                  <CheckCircle className='text-success-500 w-4 h-4' />

                  <p className="text-xs ">{ben}</p>

                </div>
              ))
            }
          </div>

          <div className="px-4">

            <Button btnType="add_to_cart"></Button></div>
        </article>

        <article className="bg-text-inverse h-fit m-4 rounded-2xl overflow-hidden shadow-lg pb-6">
          <h1 className="text-xxs p-4">Other Great Matches</h1>
          {
            recommendations.slice(1, 4).map((recoms, id) => (

              <Link to={`/products/${recoms.id}`} className="cursor-pointer hover:shadow-lg ">

                <SecondaryRecommendedCard secondRecom={recoms} key={id} />
                
              </Link>
            ))
          }</article>
        <div className="w-fit mx-auto my-8">
          <Button btnType="new_analysis" onClick={resetAnalysis} />
        </div>
      </section>

      <Footer />
    </>
  )
}
export default PlantQuizResultPage;