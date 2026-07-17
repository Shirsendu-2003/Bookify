import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

import ServiceStep from "../../components/booking/ServiceStep";
import LocationStep from "../../components/booking/LocationStep";
import TimeStep from "../../components/booking/TimeStep";
import BookingSummary from "../../components/booking/BookingSummary";

import { useCreateInstantBooking, useBooking } from "../../hooks/useBookings";
import { useAuth } from "../../hooks/useAuth";

import { showSuccess, showError } from "../../utils/swal";
import Loader from "../../components/common/Loader";

export default function CreateInstantBooking() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [isSearching, setIsSearching] = useState(false);

  const [bookingId, setBookingId] = useState(null);

  const { data: booking } = useBooking(bookingId, {
  enabled: !!bookingId && isSearching,
  refetchInterval: 3000, // Check every 3 seconds
  refetchOnWindowFocus: false,
});

  const createBooking = useCreateInstantBooking();

  const [step, setStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    serviceType: "",

    address: "",

    city: "",

    state: "",

    country: "",

    zipCode: "",

    bookingDate: "",

    startTime: "",

    description: "",

    latitude: null,

    longitude: null,
  });

  const [remainingTime, setRemainingTime] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
  const status =
    booking?.data?.status ||
    booking?.status;

  if (status === "ACCEPTED") {
    showSuccess(
      "Booking Accepted",
      "A service professional has accepted your booking."
    );

    navigate("/customer/bookings");
  }

  if (
    status === "CANCELLED" ||
    status === "FAILED"
  ) {
    showError(
      "Booking Failed",
      "No service professional accepted your booking."
    );

    navigate("/customer/bookings");
  }
}, [booking, navigate]);


useEffect(() => {
  if (!isSearching) return;

  const timer = setInterval(() => {
    setRemainingTime((prev) => {
      if (prev <= 1) {
        clearInterval(timer);

        showError(
          "Booking Timeout",
          "No service professional accepted your booking."
        );

        navigate("/customer/bookings");

        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [isSearching, navigate]);

  const handleSubmit = async () => {
    try {
      const customerId = user?.id || user?.userId || user?.customerId;

      if (!customerId) {
        return showError("Authentication Error", "Customer not found");
      }

      const result = await createBooking.mutateAsync({
        customerId,

        serviceType: bookingData.serviceType,

        description: bookingData.description,

        address: bookingData.address,

        city: bookingData.city,

        state: bookingData.state,

        country: bookingData.country,

        zipCode: bookingData.zipCode,

        bookingDate: bookingData.bookingDate,

        startTime: bookingData.startTime,

        latitude: bookingData.latitude,

        longitude: bookingData.longitude,

        bookingType: "INSTANT",
      });

      if (result?.status === "FAILED") {
        return showError("Booking Failed", result.message);
      }

      await showSuccess(
  "Success",
  result?.message || "Instant booking created successfully"
);
const id =
  result?.data?.bookingId ||
  result?.data?.id ||
  result?.bookingId ||
  result?.id;

setBookingId(id);
setIsSearching(true);
setRemainingTime(300);
    } catch (error) {
      console.error(error);

      showError(
        "Booking Failed",
        error?.response?.data?.message || "Unable to create booking",
      );
    }
  };

  if (isSearching) {
  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-xl rounded-3xl shadow-2xl p-8 text-center">

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-300 animate-ping"></div>

              <div className="relative w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white text-4xl">🔍</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold">
            Searching...
          </h2>

          <p className="mt-3 text-gray-500">
            Finding the nearest available service professional.
          </p>

          <div className="mt-6">
            <Loader text="Searching..." />
          </div>

          <div className="mt-8 bg-slate-100 rounded-xl p-4">
            <p className="font-semibold">
              Estimated wait time
            </p>

            <p className="text-orange-600 font-bold mt-1">
  {Math.floor(remainingTime / 60)}:
  {String(remainingTime % 60).padStart(2, "0")} remaining
</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

  return (
    <DashboardLayout>
      {createBooking.isPending && (
      <Loader text="Creating your booking..." />
    )}

    <div
      className={`min-h-screen bg-slate-50 px-1 sm:px-0 ${
        createBooking.isPending
          ? "pointer-events-none select-none"
          : ""
      }`}
    >
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-8">
          <Card
            className="
    mb-6 md:mb-8
    bg-gradient-to-r
    from-orange-500
    to-orange-600
    text-white
    border-0
    shadow-xl
  "
          >
            <div className="py-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                ⚡ Instant Booking
              </h1>

              <p className="mt-2 text-sm md:text-base text-orange-100">
                Get a verified professional assigned automatically within
                minutes.
              </p>
            </div>
          </Card>

          <Card className="mb-6 md:mb-8 shadow-md">
            <div className="flex justify-between items-center overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className="flex flex-col items-center flex-1 min-w-[70px]"
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all ${
                      step >= s
                        ? "bg-orange-500 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {s}
                  </div>

                  <span className="mt-2 text-xs md:text-sm text-center text-slate-600">
                    {s === 1 && "Service"}
                    {s === 2 && "Location"}
                    {s === 3 && "Time"}
                    {s === 4 && "Confirm"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {step === 1 && (
            <ServiceStep
              bookingData={bookingData}
              setBookingData={setBookingData}
              next={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <LocationStep
              bookingData={bookingData}
              setBookingData={setBookingData}
              next={() => setStep(3)}
              back={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <TimeStep
              bookingData={bookingData}
              setBookingData={setBookingData}
              next={() => setStep(4)}
              back={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <BookingSummary
              provider={{
                name: "Auto Assign Technician",
              }}
              bookingData={bookingData}
              confirm={handleSubmit}
              back={() => setStep(3)}
              loading={createBooking.isPending}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
