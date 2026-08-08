import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Twitter, MapPin, Mail } from 'lucide-react'
import { Separator } from "../components/ui/separator";
const date = new Date().getFullYear();


const icon = [
  { value: "Facebook", icon: <Facebook className="w-5 h-5 text-surface-base/80 hover:text-surface-base" /> },
  { value: "Instagram", icon: <Instagram className="w-5 h-5 text-surface-base/80 hover:text-surface-base" /> },
  { value: "Twitter", icon: <Twitter className="w-5 h-5 text-surface-base/80 hover:text-surface-base" /> }
]

const quickLinks = [
  { value: "About Us", link: "/about" },
  { value: "Shipping Info", link: "/shipping-info" },
  { value: "FAQs", link: "/faqs" },
  { value: "Terms & Conditions", link: "/terms" },
  { value: "Return policy", link: "/return-policy" }
]

const categoriesLinks = [
  { value: "Indoor Plants", link: "/indoor-plants" },
  { value: "Outdoor Plants", link: "/outdoor-plants" },
  { value: "Succulents", link: "/succulents" },
  { value: "Herbs", link: "/herbs" },
  { value: "Air Purifying Plants", link: "/air-purifying-plants" },
  { value: "Flowering Plants", link: "/flowering-plants" }
]

const contactInfo = [
  { value: "Address", info: "123 Greenway Paradise, Plant City, CA", icon: <MapPin className="w-4 h-4 text-success-300 hover:text-surface-base" /> },
  { value: "Phone", info: "(123) 456-7890", icon: <Phone className="w-4 h-4 text-success-300 hover:text-surface-base" /> },
  { value: "Email", info: "info@evererdant.com", icon: <Mail className="w-4 h-4 text-success-300 hover:text-surface-base" /> },
]

const storeHours = [
  {value: "Mon - Fri", info: "9:00 AM - 6:00 PM"},
  {value: "Sat - Sun", info: "10:00 AM - 4:00 PM"},

]
function Footer() {
  const cloud_url = import.meta.env.CLOUDINARY_URL || "https://res.cloudinary.com/dvdr5bwc7/image/upload/c_fill,w_800,h_600,f_auto,q_auto";

  return (
    <footer className="p-4 bg-gray-900">
      <a href="/">
        <div className="flex flex-row items-center gap-4 justify-left mt-16 mb-4 ultra:mb-12">

          <img
            loading="lazy"
            src={`${cloud_url}/v1756387918/logo_mqmxll.png`}
            alt="logo2"
            className="w-[3rem] h-[3rem] rounded-full cursor-pointer"
          />{" "}
          <span className="text-3xl font-medium text-brand-700">Evererdant</span>

        </div>
      </a>
      <p className="text-xs text-surface-base/80 mb-8">Your trusted partner in bringing nature indoors. We specialize in healthy, beautiful plants that transform your living spaces.</p>
      {/* Follow  info section */}
      <div className="flex gap-8 justify-left mb-8 hover:text-surface-base">
        {
          icon.map(({ value, icon }) => (
            <Link key={value} to={`https://www.${value.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer">
              {icon}
            </Link>
          ))
        }
      </div>
      {/* Common info quick links section */}
      <h1 className="text-surface-base mb-4">Quick Links</h1>
      <div className="flex flex-col text-xs gap-3 laptop:text-[1rem]">
        {quickLinks.map(({ value, link }) => (
          <Link key={value} to={link} className="cursor-pointer text-surface-base/80 hover:text-surface-base ">
            {value}
          </Link>
        ))}
      </div>
      {/* Plant categories quick links */}

      <h1 className="text-surface-base mb-4 mt-8">Plant Categories</h1>
      <div className="flex flex-col text-xs gap-3 laptop:text-[1rem]">
        {categoriesLinks.map(({ value, link }) => (
          <Link key={value} to={link} className="cursor-pointer text-surface-base/80 hover:text-surface-base ">
            {value}
          </Link>
        ))}
      </div>

      {/* Contact Info section */}

      <h1 className="text-surface-base mb-4 mt-8">Contact Info</h1>
      <div className="flex flex-col text-xs gap-3 laptop:text-[1rem]">
        {contactInfo.map(({ value, info, icon }) => (
          <div key={value} className="flex items-center gap-2 text-surface-base/80 hover:text-surface-base ">
            {icon}
            <span>{info}</span>
          </div>
        ))}
      </div>

      {/* Store Hours section */}
      <h1 className="text-surface-base mb-4 mt-8">Store Hours</h1>

      <div className="flex flex-col text-xs gap-3 laptop:text-[1rem]">
      {storeHours.map(({value, info}) => (
        <p key={value} className="text-surface-base/80 hover:text-surface-base ">{value}: {info}</p>
      ))}
      </div>

      <Separator orientation="horizontal" className="my-8" />
      <p className="text-xs text-center text-surface-base/80 hover:text-surface-base   laptop:text-[1rem]">
        ©{date} Evererdant
      </p>
      <div className="text-xs text-center flex flex-wrap justify-evenly mt-4  laptop:text-[1rem]">
        <p className="cursor-pointer text-surface-base/80 hover:text-surface-base ">Privacy Policy</p>
        <p className="cursor-pointer text-surface-base/80 hover:text-surface-base ">
          Terms and Conditions
        </p>
        <p className="cursor-pointer text-surface-base/80 hover:text-surface-base ">Cookies Policy</p>
      </div>
    </footer>
  );
}
export default Footer;
