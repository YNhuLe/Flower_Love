import React from "react";
import { contact } from "../constants";
import ContactCard from "./ContactCard";
function ContactUs() {
  return (
    <div className="m-4 mt-16 ">
      <h2 className="text-4xl font-semibold mb-4 tablet:ml-8">Contact Us</h2>
      <p className="tablet:ml-8">
        Have a question or need assistance? Feel free to reach out to us.
      </p>
      <div className="ultra:flex flex-row gap-4 justify-center">
        {contact.map(({ id, image, campus, address, link }) => (
          <ContactCard
            id={id}
            image={image}
            campus={campus}
            address={address}
            link={link}
          />
        ))}{" "}
      </div>
    </div>
  );
}

export default ContactUs;
