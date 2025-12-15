import Button from "../../common/Button";
import {
    Share2,
    Droplets,
    Sun,
    Thermometer,
    Wind,
    Sparkles,
    Camera, Brain, Image
} from 'lucide-react';
function PlantQuiz() {


    return (

        <section className="w-full p-4 py-[4rem] bg-gradient-to-b
        from-amber-100 via-text-inverse to-surface-base
        ">

            <article className=" bg-surface-card rounded-md shadow-lg">
                <div className=" p-6 ">
                    <div className="p-4 bg-gradient-to-r from-amber-600 to-amber-800 border rounded-xl w-fit m-4">
                        <Sparkles className="w-6 h-6 text-brand-100" /></div>
                    <h1 className="text-xxs">Find Your Perfect Plant with AI</h1>
                    <p className="text-xs my-4">Not sure which plant will thrive in your space? Upload a photo of your room, answer a few quick questions, and our AI will recommend the perfect plants for your environment.</p>

                    <div className="flex align-start gap-4 mb-4">
                        <div className="">
                            <div className="p-2 bg-amber-100 rounded-full inline-flex items-center justify-center mb-2">

                                <Camera className="w-6 h-6 text-amber-600" /></div>
                        </div>

                        <div className="flex flex-col">
                            <h2>Upload your room</h2>
                            <p className="text-xs">Take a photo of the space where you'd like to place a plant</p>

                        </div></div>



                    <div className="flex align-start gap-4 mb-4">
                        <div className="">
                            <div className="p-2 bg-amber-100 rounded-full inline-flex items-center justify-center mb-2">



                                <Brain className="w-6 h-6 text-amber-600" /></div></div>
                        <div className="flex flex-col">
                            <h2>AI Analysis</h2>
                            <p className="text-xs">Our AI analyzes light, temperature, and humidity conditions</p></div>
                    </div>


                    <div className="flex align-start gap-4 mb-4">
                        <div className="">
                            <div className="p-2 bg-amber-100 rounded-full inline-flex items-center justify-center mb-2">


                                <Image className="w-6 h-6 text-amber-600" /></div></div>
                        <div className="flex flex-col">
                            <h2>Visualize Results</h2>
                            <p className="text-xs mb-4">See AI-generated images of your room with recommended plants</p>
                        </div>
                    </div>

                    <Button btnType="plant_quiz" url="/products/quiz"></Button>
                </div>
                <div className="w-full h-auto object-cover relative flex flex-col justify-center mt-4">
                    <div className="absolute p-2 bg-surface-card border rounded-xl w-fit m-4 flex gap-2 items-center 
bottom-2
">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <p className="text-[.7rem]">AI-powered plant recommendations</p></div>
                    <img className="rounded-b-md"
                        src="https://res.cloudinary.com/dvdr5bwc7/image/upload/v1764908286/AI_qde5nj.jpg" alt="AI-image" />
                </div>

            </article>

        </section>
    )
}

export default PlantQuiz;