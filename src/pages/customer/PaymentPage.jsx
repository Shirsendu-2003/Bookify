import {

  useParams,

  useNavigate,

} from "react-router-dom";

import {

  FaMoneyBillWave,

} from "react-icons/fa";

import {

  useEffect,

  useState,

} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import Card
from "../../components/common/Card";

import Button
from "../../components/common/Button";

import Loader
from "../../components/common/Loader";

import api
from "../../services/api";

import paymentService
from "../../services/paymentService";

import {

  showSuccess,

  showError,

} from "../../utils/swal";

export default function PaymentPage(){

  const { bookingId } =
    useParams();

  const navigate =
    useNavigate();

  const [

    booking,

    setBooking

  ] = useState(null);

  const [

    loading,

    setLoading

  ] = useState(true);

  useEffect(()=>{

    fetchBooking();

  },[]);

  const fetchBooking =
    async()=>{

      try{

        const response =

          await api.get(

            `/bookings/${bookingId}`

          );

        setBooking(

          response.data.data ||

          response.data

        );

      }catch(error){

        showError(

          "Error",

          "Unable to load booking."

        );

      }finally{

        setLoading(false);

      }

    };

  const handlePayment = async () => {

  try {

    const orderResponse =
      await paymentService.createOrder(
        booking.id,
        booking.amount
      );

    const order =
      orderResponse.data || orderResponse;

   

    const options = {

      key:
        import.meta.env
          .VITE_RAZORPAY_KEY,

      amount:
        order.amount,

      currency:
        order.currency,

      name:
        "Bookify",

      description:
        booking.serviceType,

      order_id:
        order.id,

      handler:
        async function (response) {

         await paymentService.verifyPayment({

    bookingId: booking.id,

    razorpayOrderId:
      response.razorpay_order_id,

    razorpayPaymentId:
      response.razorpay_payment_id,

    razorpaySignature:
      response.razorpay_signature,

    paymentMethod:
      "RAZORPAY",

    currency:
      "INR"

  });

          await showSuccess(
            "Payment Successful",
            "Please share your experience."
          );

          navigate(
            "/customer/bookings",
            {
              state: {
                openReview: true,
                bookingId:
                  booking.id,
              },
            }
          );
        },

      prefill: {
        name: "Customer",
      },

      theme: {
        color: "#16a34a",
      },
    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();

  } catch (error) {

    showError(
      "Payment Failed",
      error?.response?.data?.message ||
      error.message
    );

  }
};

  if(loading){

    return(

      <DashboardLayout>

        <div className="
min-h-[70vh]
flex
justify-center
items-center
">

          <Loader/>

        </div>

      </DashboardLayout>

    );

  }

  return(

    <DashboardLayout>

      <div className="
max-w-xl
mx-auto
mt-10
">

        <Card>

          <div className="space-y-6">

            <div className="text-center">

              <FaMoneyBillWave
                className="
mx-auto
text-5xl
text-green-600
mb-4
"
              />

              <h1 className="
text-3xl
font-bold
">

                Payment Page

              </h1>

            </div>

            <div className="
bg-slate-50
rounded-xl
p-5
space-y-4
">

              <div className="
flex
justify-between
">

                <span>

                  Booking ID

                </span>

                <strong>

                  {booking.id}

                </strong>

              </div>

              <div className="
flex
justify-between
">

                <span>

                  Service

                </span>

                <strong>

                  {booking.serviceType}

                </strong>

              </div>

              <div className="
flex
justify-between
">

                <span>

                  Amount

                </span>

                <strong>

                  ₹{booking.amount}

                </strong>

              </div>

            </div>

            <Button
              className="w-full"
              variant="success"
              onClick={
                handlePayment
              }
            >

              <FaMoneyBillWave/>

              Pay ₹{booking.amount}

            </Button>

          </div>

        </Card>

      </div>

    </DashboardLayout>

  );

}