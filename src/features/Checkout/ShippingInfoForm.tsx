import { toast } from "sonner";
import type { ShippingFormData } from "../../schemas/shippingSchema";
import shippingSchema from "../../schemas/shippingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Truck, Box, Watch } from "lucide-react";
import Select from "../../ui/select";
import { useState , useEffect} from "react";
import { addStyleValue } from "framer-motion";
function ShippingInfoForm() {
let selectedCountry;
  useEffect(() => {
  setValue("state", "");
}, [selectedCountry]);

  const {
    register, handleSubmit,setValue,watch,  formState: { errors, isSubmitting }, reset
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema), defaultValues: {
      firstName: '',
      lastName: '',
      phone: '', 
      email: '', 
      streetAddress: '',
      aptSuit: '', 
      city: '', 
      postalCode: '', 
      state: '', 
      country: '',
      shippingMethod: 'standard'
    }
  })


    const regions = {
  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon"
  ],
  USA: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ]
}  as const;

type Country = keyof typeof regions;


 selectedCountry = watch("country") as Country | undefined;
const selectState = watch("state")

const stateOptions = selectedCountry ? [...regions[selectedCountry]] : [];

  const countriesList = ["Canada", "USA"]

  // const [stateCa, setStateCa] = useState('State');

  const [countries, setCountries] = useState('Country');
  
  const handleForSubmit = async (data: ShippingFormData) => {
    try {
      await axios.post("", data)
    } catch (error: any) {
      console.error(error)
    }
  }

  const[prevPhone, setPrevPhone] = useState("");
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const raw = e.target.value.replace(/\D/g, "");
    const isDeleting = e.target.value.length < prevPhone.length;
   let formatted = e.target.value;
        if (!isDeleting) {
            if (raw.length <= 3) {
                formatted = `(${raw}`;

            } else if (raw.length <= 6) {
                formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
            } else {
                formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
            }
        }

setPrevPhone(formatted);
setValue("phone", formatted, {shouldValidate: true});

  }
  return (

    <>
      <section className="m-4 rounded-md bg-surface-card p-4 shadow-md w-ful ">
        <div className="flex gap-2 items-center mb-8">
          <div className="p-2 rounded-full bg-success-300/20">
            <Truck className="w-5 h-5 text-success-700" /></div>
          <p>Shipping Information</p>

        </div>
        <form
          className=" "
          onSubmit={handleSubmit(handleForSubmit)}>
          {/* First name */}
          <div>
            <label className="block  text-xxs text-text-primary mb-1">First Name</label>
            <input
              {...register('firstName')}
              className={`text-xs bg-text-muted/10 w-full p-2 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-text-muted/30'}`}

            />
            {errors.firstName && <p className="text-error-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last name */}
          <div>
            <label className="block  text-xxs text-text-primary mb-1">Last Name</label>
            <input
              {...register('lastName')}
              className={`text-xs bg-text-muted/10 w-full p-2 rounded-lg border ${errors.lastName ? 'border-error-500' : 'border-text-muted/30'}`}

            />
            {errors.lastName && <p className="text-error-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Email Address</label>
            <input {...register('email')}
              className={`text-xs bg-text-muted/10 w-full p-2 rounded-lg border ${errors.email ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="you@example.com"

            />
          </div>

          {/* Phone Number*/}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Phone Number</label>
            <input {...register('phone')}
            maxLength={14}
            onChange={handlePhoneChange}
              className={`text-xs bg-text-muted/10 w-full p-2 rounded-lg border ${errors.phone ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="(000) 000-0000"

            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Street Address</label>
            <input {...register('streetAddress')}
              className={`text-xs bg-text-muted/10 w-full p-2 rounded-lg border ${errors.streetAddress ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="123 Main Street"

            />
          </div>

          {/* Apt Suits, optional */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Apartment, Suits, etc. (optional)</label>
            <input {...register('aptSuit')}
              className={`bg-text-muted/10 text-xs w-full p-2 rounded-lg border ${errors.aptSuit ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="Apt 4B"

            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">City</label>
            <input {...register('city')}
              className={`text-xs bg-text-muted/10 w-full p-2 rounded-lg border ${errors.city ? 'border-error-500' : 'border-text-muted/30'}`}


            />
          </div>

          {/* State */}
          

          {/* Zip Code */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Zip Code</label>
            <input {...register('state')}
              className={`text-xs bg-text-muted/10 w-full p-2 rounded-lg border ${errors.state ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="A1A 1A1"

            />
          </div>


          {/*Country */}

          <div className="flex gap-4 ">

            <div>
            <label className="block text-xxs text-text-primary mb-1">State</label>
            {/* <input {...register('state')} 
    className={`text-xs w-full p-1 rounded-lg border ${errors.state ? 'border-error-500' : 'border-text-muted/30'}`}
   
        
        /> */}
        <Select
          label="State *"
   options={stateOptions}
   onChange={(val) =>setValue("state", val)}
          value={selectState}

          className="bg-text-muted/10"
        />
          </div>
       <div>
            <label className="block text-xxs text-text-primary mb-1">Country</label>
  

            <Select
              label="Country *"
              options={countriesList}
              value={selectedCountry || ""}
              onChange={(val) => setValue("country", val)} 
              className="bg-text-muted/10"
              />
              
          </div>

          </div>
   
        </form>



      </section>

      

    </>

  )
}

export default ShippingInfoForm;