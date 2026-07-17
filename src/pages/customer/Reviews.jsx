import { useState } from "react";
import { FaStar } from "react-icons/fa";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import ReviewCard
from "../../components/provider/ReviewCard";

import Card
from "../../components/common/Card";

import Input
from "../../components/common/Input";

import TextArea
from "../../components/common/TextArea";

import Button
from "../../components/common/Button";

import Loader
from "../../components/common/Loader";

import EmptyState
from "../../components/common/EmptyState";

import { useAuth }
from "../../hooks/useAuth";

import {
  useCustomerBookings,
} from "../../hooks/useBookings";

import {
  useCreateReview,
} from "../../hooks/useProviders";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function Reviews(){

 const { user } =
  useAuth();

const customerId =

  user?.id ||

  user?.userId;

const {

  data,

  isLoading,

} = useCustomerBookings(
    customerId
);



const bookings = (
  data?.data?.content ||
  data?.content ||
  []
).filter(
  booking =>
    booking.status === "COMPLETED" &&
    booking.paymentStatus === "SUCCESS"
);



  const createReview =
    useCreateReview();

  const [

    form,

    setForm,

  ] = useState({

    bookingId:"",

    rating:5,

    comment:"",

  });

  const handleChange =
    (e)=>{

      setForm({

        ...form,

        [e.target.name]:

          e.target.value,

      });

    };

  const handleSubmit =
    async(e)=>{

      e.preventDefault();

      if(!form.bookingId){

        return showError(

          "Validation Error",

          "Please select a booking."

        );

      }

      try{

        await createReview
          .mutateAsync({

            customerId,

            payload:{

              bookingId:

                Number(
                  form.bookingId
                ),

              rating:

                Number(
                  form.rating
                ),

              comment:

                form.comment,

            },

          });

        await showSuccess(

          "Review Submitted",

          "Thank you for your feedback."

        );

        setForm({

          bookingId:"",

          rating:5,

          comment:"",

        });

      }catch(error){

        showError(

          "Submission Failed",

          error?.response
            ?.data?.message ||

          error.message ||

          "Unable to submit review."

        );

      }

    };

  if(isLoading){

    return(

      <DashboardLayout>

        <div
          className="
min-h-[70vh]
flex
items-center
justify-center
"
        >

          <Loader/>

        </div>

      </DashboardLayout>

    );

  }

  return(

    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h1
          className="
text-4xl
font-bold
"
        >

          Reviews

        </h1>

        <p
          className="
mt-3
text-slate-500
"
        >

          Share your service
          experience.

        </p>

      </div>

      {/* FORM */}

      <Card className="mb-10">

        <h2
          className="
text-2xl
font-bold
mb-8
"
        >

          Write Review

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
          className="
space-y-6
"
        >

          <select

            name="bookingId"

            value={
              form.bookingId
            }

            onChange={
              handleChange
            }

            required

            className="
w-full
border
border-slate-300
rounded-xl
px-4
py-3
"

          >

            <option value="">

              Select Booking

            </option>

            {

              bookings.map(

                (booking)=>(

                  <option

                    key={
                      booking.id
                    }

                    value={
                      booking.id
                    }

                  >

                    Booking #
                    {booking.id}

                    —

                    {
                      booking.serviceType
                    }

                  </option>

                )

              )

            }

          </select>

          <Input

            type="number"

            name="rating"

            label="Rating"

            min="1"

            max="5"

            value={
              form.rating
            }

            onChange={
              handleChange
            }

          />

          <TextArea

            label="Comment"

            name="comment"

            rows={5}

            value={
              form.comment
            }

            onChange={
              handleChange
            }

          />

          <Button

            type="submit"

            loading={
              createReview
                .isPending
            }

          >

            Submit Review

          </Button>

        </form>

      </Card>

      {/* PREVIEW */}

      {

        bookings.length===0

        ?(

          <EmptyState

            icon={
              <FaStar/>
            }

            title="
No Bookings Available"

            description="
Completed bookings will appear here."

          />

        )

        :(

          <div
            className="
space-y-8
"
          >

            {

              bookings
                .slice(0,3)
                .map(

                  (booking)=>(

                    <ReviewCard

                      key={
                        booking.id
                      }

                      review={{

                        provider:

                          booking.providerName ||

                          "Professional Service",

                        rating:5,

                        comment:

                          "Great service experience.",

                      }}

                    />

                  )

                )

            }

          </div>

        )

      }

    </DashboardLayout>

  );

}