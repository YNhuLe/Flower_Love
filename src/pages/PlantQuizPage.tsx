import {
    Share2,
    Droplets,
    Sun,
    Thermometer,
    Wind,
    Sparkles,
    Camera, Brain, Image
} from 'lucide-react';

function PlantQuizPage() {
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
        </section>
    )
}
export default PlantQuizPage;