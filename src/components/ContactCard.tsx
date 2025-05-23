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
        loading="lazy"
        src={`${image}`}
        alt="contact-picture"
        className="h-[12rem] w-full rounded-md my-4
        tablet:w-[35rem] tablet:h-[25rem]
        "
      />
      <h2 className="m-2 tablet:text-2xl">{campus}</h2>
      <p className="m-2 tablet:text-xl">{address}</p>
      <div
        className="px-4 mt-8  h-10 text-accent  hover:text-white  hover:bg-primary border rounded-3xl
          
          transition-all duration-300 hover:border-primary  font-semibold flex items-center justify-center ">
        <a href={link} className="font-medium tablet:text-xl tablet:h-15">
          Get directions
        </a>
      </div>
    </div>
  );
}

export default ContactCard;
