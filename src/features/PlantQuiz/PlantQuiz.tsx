import Button from "../../common/Button";

function PlantQuiz() {


    return (
        <article className="m-4 mt-[3rem] p-6 bg-lightGrey rounded-md">
            <h2 className="text-center font-bold m-2">Not sure what you need?</h2>
            <p className="text-center text-xs">Take our plant quiz to find the perfect plants for your space, lifestyle, and experience level.</p>


            <div className="flex flex-col gap-2 items-center m-4 mb-0"><Button btnType="plant_quiz" />
                <Button btnType="view_all" /></div>
        </article>
    )
}

export default PlantQuiz;