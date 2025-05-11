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
      <div>
        {testimonials.map(({ id, name, title, content, profilePic }) => (
          <TestimonialsCard
            id={id}
            key={id}
            name={name}
            title={title}
            content={content}
            profilePic={profilePic || "default-profile-pic-url"}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialsList;
