import React from "react";
import Tilt from "react-parallax-tilt";
interface TestimonialsProps {
  id: string;
  name: string;
  profilePic: string;
  title: string;
  content: string;
}
function TestimonialsCard({
  id,
  name,
  profilePic,
  title,
  content,
}: TestimonialsProps) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.1}
      transitionSpeed={250}
      tiltMaxAngleX={25}
      tiltMaxAngleY={25}>
      <div
        className=" mt-4 p-[.1rem] rounded-md bg-gradient-to-r from-green-700 via-green-500 to-blue-700 tablet:mt-8
      ">
        <div className="bg-tertiary  p-4 rounded-md">
          <div className="flex flex-row mb-6">
            <img
              loading="lazy"
              className="w-10 h-10 rounded-full mr-4"
              src={`${profilePic}`}
              alt="profile-picture"
            />
            <div className="text-left">
              <h2 className="font-semibold text-xl tablet:text-2xl">{name}</h2>
              <p className="tablet:text-xl">{title}</p>
            </div>
          </div>
          <p className="text-left">{content}</p>
        </div>
      </div>
    </Tilt>
  );
}

export default TestimonialsCard;
