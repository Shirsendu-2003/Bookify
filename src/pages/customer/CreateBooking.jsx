import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import BookingForm from "../../components/booking/BookingForm";
import Loader from "../../components/common/Loader";
import Card from "../../components/common/Card";

import { useProviders }
from "../../hooks/useProviders";

import { useCreateBooking }
from "../../hooks/useBookings";

import { useAuth }
from "../../hooks/useAuth";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function CreateBooking(){

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [searchParams] =
    useSearchParams();

  const providerId =
    Number(
      searchParams.get(
        "provider"
      )
    );

  const {
    data:providersData,
    isLoading,
  } = useProviders();

  const providers =

    providersData?.data?.content ||

    providersData?.content ||

    providersData ||

    [];

  const selectedProvider =
    providers.find(

      (p)=>

        Number(p.id)
        ===
        providerId

    ) || null;

  const createBooking =
    useCreateBooking();

  const handleSubmit =
async(values)=>{

  try{

    const customerId =
      user?.id ||
      user?.userId ||
      user?.customerId;

    if(!customerId){

      return showError(
        "Authentication Error",
        "Customer ID missing."
      );

    }

    if(!selectedProvider){

      return showError(
        "Provider Error",
        "Provider missing."
      );

    }

    await createBooking
      .mutateAsync({

        customerId,

        providerId:
          Number(
            selectedProvider.id
          ),

        serviceType:
          values.serviceType,

        description:
          values.description,

        address:
          values.address,

        city:
          values.city,

        state:
          values.state,

        country:
          values.country,

        zipCode:
          values.zipCode,

        bookingDate:
          values.bookingDate,

        startTime:
          values.startTime,

        endTime:
          values.endTime

      });

    await showSuccess(
      "Success",
      "Booking Created"
    );

    navigate(
      `/customer/providers?type=${selectedProvider.providerType}`
    );

  }catch(error){



    showError(
      "Booking Failed",
      error?.response
        ?.data
        ?.message ||
      error.message ||
      "Unable to create booking."
    );

  }

};

  if(isLoading){

    return(

      <DashboardLayout>
        <Loader/>
      </DashboardLayout>

    );

  }

  if(

    !providerId ||

    Number.isNaN(
      providerId
    )

  ){

    return(

      <DashboardLayout>

        <Card className="p-6">

          <h3
          className="
          text-red-500
          text-xl
          font-bold">

            Invalid Professional Service

          </h3>

          <p>

            URL missing Professional Service id.

          </p>

        </Card>

      </DashboardLayout>

    );

  }

  if(!selectedProvider){

    return(

      <DashboardLayout>

        <Card className="p-6">

          <h3
          className="
          text-red-500
          text-xl
          font-bold">

            Professional Service Not Found

          </h3>

          <p>

            No Professional Service exists
            with ID {providerId}

          </p>

        </Card>

      </DashboardLayout>

    );

  }

  return(

    <DashboardLayout>

      <Card className="mb-6">

        <h3
        className="
        font-bold
        text-lg">

          Selected Professional Service

        </h3>

        <p>

          {
            selectedProvider.name
          }

        </p>

        <p
        className="
        text-slate-500">

          {
            selectedProvider.providerType
          }

        </p>

      </Card>

      <BookingForm

        providerId={
          providerId
        }

        booking={null}

        onSubmit={
          handleSubmit
        }

      />

    </DashboardLayout>

  );

}