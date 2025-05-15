import React from "react";
import TestimonialsCard from "./TestimonialsCard";
import { testimonials } from "../constants";

function TestimonialsList() {
  return (
    <div className="m-4 mt-16 text-center tablet:mx-8">
      <h2 className="text-4xl font-semibold mb-8 tablet:text-5xl">
        Testimonials
      </h2>
      <p>
        See what our users have to say about their experience with our platform.
      </p>
      <div className="desktop:flex desktop:flex-row desktop:flex-wrap desktop:justify-center">
        {testimonials.map(({ id, name, title, content, profilePic }) => (
          <div className=" w-full desktop:w-1/2 desktop:p-4">
            <TestimonialsCard
              id={id}
              key={id}
              name={name}
              title={title}
              content={content}
              profilePic={profilePic || "default-profile-pic-url"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsList;
