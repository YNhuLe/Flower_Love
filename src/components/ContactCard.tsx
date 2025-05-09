import React from "react";

interface ContactCardProps {
  id: string;
  image: string;
  campus: string;
  address: string;
  link: string;
}
function ContactCard({ id, image, campus, address, link }: ContactCardProps) {
  return (
    <div className="flex flex-col items-center mt-8">
      <img
        src={`/Flower_Love/images/${image}`}
        alt="contact-picture"
        className="h-[12rem] w-full rounded-md my-4"
      />
      <h2 className="m-2">{campus}</h2>
      <p className="m-2">{address}</p>
      <div
        className="px-4 mt-8  h-10 text-accent  hover:text-white  hover:bg-primary border rounded-3xl
          
          transition-all duration-300 hover:border-primary  font-semibold flex items-center justify-center ">
        <a href={link} className="font-medium">
          Get directions
        </a>
      </div>
    </div>
  );
}

export default ContactCard;
