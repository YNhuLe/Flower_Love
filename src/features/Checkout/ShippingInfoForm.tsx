import { toast } from "sonner";
import type { ShippingFormData } from "../../schemas/shippingSchema";
import shippingSchema from "../../schemas/shippingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Truck, Box } from "lucide-react";
import Select from "../../ui/select";
import { useState } from "react";
function ShippingInfoForm() {
  const {
    register, handleSubmit, formState: { errors, isSubmitting }, reset
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema), defaultValues: {
      firstName: '',
      lastName: '',
      phone: '', email: '', streetAddress: '',
      aptSuit: '', city: '', postalCode: '', state: '', country: '',
      shippingMethod: 'standard'

    }
  })

  const statesList = ["Alberta",
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
    "Yukon"];
  const countriesList = [
    "Canada", "USA"
  ]

  const [stateCa, setStateCa] = useState('State');

  const [countries, setCountries] = useState('Country');
  const handleForSubmit = async (data: ShippingFormData) => {
    // const loadingToast = toast.loading("S")

    try {
      await axios.post("", data)
    } catch (error: any) {
      console.error(error)
    }
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
              className={`text-xs w-full p-2 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-text-muted/30'}`}

            />
            {errors.firstName && <p className="text-error-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>

          {/* Last name */}
          <div>
            <label className="block  text-xxs text-text-primary mb-1">Last Name</label>
            <input
              {...register('lastName')}
              className={`text-xs w-full p-2 rounded-lg border ${errors.lastName ? 'border-error-500' : 'border-text-muted/30'}`}

            />
            {errors.lastName && <p className="text-error-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Email Address</label>
            <input {...register('email')}
              className={`text-xs w-full p-2 rounded-lg border ${errors.email ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="you@example.com"

            />
          </div>

          {/* Phone Number*/}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Phone Number</label>
            <input {...register('phone')}
              className={`text-xs w-full p-2 rounded-lg border ${errors.phone ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="(000) 000-0000"

            />
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Street Address</label>
            <input {...register('streetAddress')}
              className={`text-xs w-full p-2 rounded-lg border ${errors.streetAddress ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="123 Main Street"

            />
          </div>

          {/* Apt Suits, optional */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Apartment, Suits, etc. (optional)</label>
            <input {...register('aptSuit')}
              className={` text-xs w-full p-2 rounded-lg border ${errors.aptSuit ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="Apt 4B"

            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">City</label>
            <input {...register('city')}
              className={`text-xs w-full p-2 rounded-lg border ${errors.city ? 'border-error-500' : 'border-text-muted/30'}`}


            />
          </div>

          {/* State */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">State</label>
            {/* <input {...register('state')} 
    className={`text-xs w-full p-1 rounded-lg border ${errors.state ? 'border-error-500' : 'border-text-muted/30'}`}
   
        
        /> */}
            <Select

              label="State *"
              options={statesList}
              value={stateCa}
              onChange={setStateCa}
            />
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Zip Code</label>
            <input {...register('state')}
              className={`text-xs w-full p-2 rounded-lg border ${errors.state ? 'border-error-500' : 'border-text-muted/30'}`}
              placeholder="A1A 1A1"

            />
          </div>


          {/*Country */}
          <div>
            <label className="block text-xxs text-text-primary mb-1">Country</label>
            {/* <input {...register('country')} 
    className={`text-xs w-full p-1 rounded-lg border ${errors.country ? 'border-error-500' : 'border-text-muted/30'}`}
       
        
        /> */}

            <Select
              label="Country *"
              options={countriesList}
              value={countries}
              onChange={setCountries} />
          </div>
        </form>



      </section>

      

    </>

  )
}

export default ShippingInfoForm;