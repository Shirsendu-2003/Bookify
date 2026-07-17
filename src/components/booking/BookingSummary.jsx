import {
  FaMapMarkerAlt,
  FaClock,
  FaTools,
  FaUserCheck,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";

export default function BookingSummary({
  provider,
  bookingData,
  confirm,
  back,
  loading,
}) {

  return (

    <Card>

      <div className="mb-6">

        <h2
          className="
          text-3xl
          font-bold
          text-slate-900
          "
        >
          Confirm Booking
        </h2>

        <p className="text-slate-500 mt-2">
          Review your booking details
          before confirming.
        </p>

      </div>

      <div
        className="
        space-y-4
        bg-slate-50
        rounded-2xl
        p-5
        border
        "
      >

        <div className="flex items-center gap-3">

          <FaUserCheck className="text-blue-600" />

          <div>
            <p className="text-sm text-slate-500">
              Professional Service
            </p>

            <p className="font-semibold">
              {provider?.name ||
                "Auto Assign Technician"}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <FaTools className="text-emerald-600" />

          <div>
            <p className="text-sm text-slate-500">
              Service
            </p>

            <p className="font-semibold">
              {bookingData.serviceType}
            </p>
          </div>

        </div>

        <div className="flex items-start gap-3">

          <FaMapMarkerAlt className="text-red-500 mt-1" />

          <div>
            <p className="text-sm text-slate-500">
              Address
            </p>

            <p className="font-semibold break-words">
              {bookingData.address}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <FaClock className="text-amber-500" />

          <div>
            <p className="text-sm text-slate-500">
              Booking Time
            </p>

            <p className="font-semibold">
              {bookingData.bookingDate}
              {" • "}
              {bookingData.startTime}
            </p>
          </div>

        </div>

        <div>

          <span
            className={`
              inline-block
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold

              ${
                bookingData.instantBooking
                  ? "bg-blue-100 text-blue-700"
                  : "bg-emerald-100 text-emerald-700"
              }
            `}
          >
            {bookingData.instantBooking
              ? "⚡ Instant Booking"
              : "📅 Scheduled Booking"}
          </span>

        </div>

      </div>

      <div
        className="
        flex
        justify-between
        gap-4
        mt-8
        "
      >

        <Button
          variant="secondary"
          onClick={back}
        >
          Back
        </Button>

        <Button
  onClick={() =>
    confirm(bookingData)
  }
  disabled={loading}
>
  {
    loading
      ? "Creating Booking..."
      : "Confirm Booking"
  }
</Button>

      </div>

    </Card>

  );

}