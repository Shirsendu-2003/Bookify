import { useState } from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import Card
from "../../components/common/Card";

import Input
from "../../components/common/Input";

import TextArea
from "../../components/common/TextArea";

import Select
from "../../components/common/Select";

import Button
from "../../components/common/Button";

import complaintService
from "../../services/complaintService";

import { useAuth } from "../../hooks/useAuth";
import { useProviderBookings } from "../../hooks/useBookings";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function Complaints(){

  const [loading,setLoading] =
    useState(false);

  const [form,setForm] =
    useState({

      subject:"",

      description:"",

      priority:"MEDIUM",

      bookingId:null,

    });

    const { user } = useAuth();

const providerId =
  user?.providerId;

const { data } =
  useProviderBookings(providerId);

const bookings =
  data?.data?.content ||
  data?.content ||
  [];

  const handleChange =
    (field,value)=>{

      setForm(

        prev=>({

          ...prev,

          [field]:value,

        })

      );

    };

  const handleSubmit =
    async(e)=>{

      e.preventDefault();

      if(
        !form.subject.trim()
      ){

        return showError(

          "Validation Error",

          "Subject is required."

        );

      }

      if(
        !form.description.trim()
      ){

        return showError(

          "Validation Error",

          "Description is required."

        );

      }

      try{

        setLoading(true);

        await complaintService
          .createComplaint(
            form
          );

        await showSuccess(

          "Complaint Submitted",

          "Admin notified."

        );

        setForm({

          subject:"",

          description:"",

          priority:"MEDIUM",

          bookingId:null,

        });

      }catch(error){

        showError(

          "Submission Failed",

          error?.response
            ?.data?.message ||

          error.message ||

          "Unable to create complaint."

        );

      }finally{

        setLoading(false);

      }

    };

  return(

    <DashboardLayout>

      <Card className="max-w-3xl mx-auto">

        <h1
          className="
text-4xl
font-bold
mb-3
"
        >

          Technician Complaint

        </h1>

        <p
          className="
text-slate-500
mb-10
"
        >

          Submit an issue or
          concern to the admin.

        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="
space-y-6
"
        >

         <Select
  label="Booking"

  value={form.bookingId || ""}

  onChange={(e)=>
    handleChange(
      "bookingId",
      e.target.value
        ? Number(e.target.value)
        : null
    )
  }

  options={[
    {
      label: "Select Booking",
      value: ""
    },

    ...bookings.map((b) => ({
      label:
        `${b.serviceType} - #${b.id}`,
      value: b.id
    }))
  ]}
/>

          <Input

            label="Subject"

            required

            value={
              form.subject
            }

            onChange={(e)=>

              handleChange(

                "subject",

                e.target.value

              )

            }

            placeholder="
Enter complaint subject"

          />

          <TextArea

            label="Description"

            required

            rows={6}

            value={
              form.description
            }

            onChange={(e)=>

              handleChange(

                "description",

                e.target.value

              )

            }

            placeholder="
Describe your issue"

          />

          <Select

            label="Priority"

            value={
              form.priority
            }

            onChange={(e)=>

              handleChange(

                "priority",

                e.target.value

              )

            }

            options={[

              {
                label:"LOW",
                value:"LOW",
              },

              {
                label:"MEDIUM",
                value:"MEDIUM",
              },

              {
                label:"HIGH",
                value:"HIGH",
              },

            ]}

          />

          <Button

            type="submit"

            loading={loading}

            disabled={loading}

          >

            Submit Complaint

          </Button>

        </form>

      </Card>

    </DashboardLayout>

  );

}