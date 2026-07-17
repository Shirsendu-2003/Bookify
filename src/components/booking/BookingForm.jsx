import { useState }
from "react";

import Swal
from "sweetalert2";

import Input
from "../common/Input";

import Select
from "../common/Select";

import TextArea
from "../common/TextArea";

import Button
from "../common/Button";

export default function BookingForm({

  providerId,

  booking = null,

  onSubmit,

}) {

  const [loading,setLoading] =
    useState(false);

  const [errors,setErrors] =
    useState({});

  const [formData,setFormData] =
    useState({

      service:
        booking?.serviceType || "",

      date:
        booking?.bookingDate || "",

      time:
        booking?.startTime || "",

      address:
        booking?.address || "",

      city:
        booking?.city || "",

      state:
        booking?.state || "",

      country:
        booking?.country || "",

      zipCode:
        booking?.zipCode || "",

      notes:
        booking?.description || "",

    });

  const services = [

    {
      label:"Electrical Repair",
      value:"Electrical Repair",
    },

    {
      label:"Plumbing Service",
      value:"Plumbing Service",
    },

    {
      label:"Cleaning",
      value:"Cleaning",
    },

    {
      label:"AC Repair",
      value:"AC Repair",
    },

    {
      label:"Painting",
      value:"Painting",
    },

  ];

  const handleChange =
    (e)=>{

      setFormData(

        (prev)=>({

          ...prev,

          [e.target.name]:
            e.target.value,

        })

      );

    };

  const validate = ()=>{

    const newErrors = {};

    if(!formData.service){

      newErrors.service =
        "Service required";

    }

    if(!formData.date){

      newErrors.date =
        "Date required";

    }

    if(!formData.time){

      newErrors.time =
        "Time required";

    }

    if(!formData.address){

      newErrors.address =
        "Address required";

    }

    if(!formData.city){

      newErrors.city =
        "City required";

    }

    if(!formData.state){

      newErrors.state =
        "State required";

    }

    if(!formData.country){

      newErrors.country =
        "Country required";

    }

   

    setErrors(
      newErrors
    );

    return Object
      .keys(newErrors)
      .length===0;

  };

  const handleSubmit =
    async(e)=>{

      e.preventDefault();

      if(!validate()){

        return;

      }

      try{

        setLoading(true);

        await onSubmit({

  providerId:
    Number(providerId),

  serviceType:
    formData.service,

  description:
    formData.notes,

  address:
    formData.address,

  city:
    formData.city,

  state:
    formData.state,

  country:
    formData.country,

  zipCode:
    formData.zipCode,

  bookingDate:
    formData.date,

  startTime:
    formData.time,

  endTime:
    formData.time,

 

});

      }catch(error){

        Swal.fire({

          icon:"error",

          title:
            "Booking Failed",

          text:

            error?.response
              ?.data
              ?.message ||

            error.message,

        });

      }finally{

        setLoading(false);

      }

    };

  return(

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <Select
        label="Service"
        name="service"
        value={formData.service}
        onChange={handleChange}
        options={services}
        error={errors.service}
      />

      <Input
        label="Booking Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
      />

      <Input
        label="Time"
        name="time"
        type="time"
        value={formData.time}
        onChange={handleChange}
        error={errors.time}
      />

      <TextArea
        label="Address"
        name="address"
        rows={4}
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <Input
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        error={errors.city}
      />

      <Input
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        error={errors.state}
      />

      <Input
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        error={errors.country}
      />

      <Input
        label="Zip Code"
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
      />

      <div
  className="
  bg-blue-50
  border
  border-blue-200
  rounded-lg
  p-3
  text-sm
  text-blue-700
  "
>
  Final amount will be calculated
  automatically based on the
  Professional Service hourly rate and
  actual service duration.
</div>

      <TextArea
        label="Notes"
        name="notes"
        rows={4}
        value={formData.notes}
        onChange={handleChange}
      />

      <Button
        type="submit"
        loading={loading}
      >

        {
          booking
            ? "Update Booking"
            : "Create Booking"
        }

      </Button>

    </form>

  );

}