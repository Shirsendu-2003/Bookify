import { useState } from "react";
import {
  FaBolt,
  FaCalendarAlt,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";

export default function TimeStep({
  bookingData,
  setBookingData,
  next,
  back,
}) {

  const [bookingDate, setBookingDate] =
    useState("");

  const [startTime, setStartTime] =
    useState("");

  const instantBooking = () => {

    const now = new Date();

    const bookingTime = new Date(
      now.getTime() + 25 * 60 * 1000
    );

    setBookingData({

      ...bookingData,

      instantBooking: true,

      bookingDate:
        bookingTime
          .toISOString()
          .split("T")[0],

      startTime:
        bookingTime
          .toTimeString()
          .slice(0, 5),

    });

    next();
  };

  const scheduleBooking = () => {

    if (!bookingDate || !startTime) {

      alert(
        "Please select date and time"
      );

      return;
    }

    const selectedDateTime =
      new Date(
        `${bookingDate}T${startTime}`
      );

    if (
      selectedDateTime <= new Date()
    ) {

      alert(
        "Please choose a future time"
      );

      return;
    }

    setBookingData({

      ...bookingData,

      instantBooking: false,

      bookingDate,

      startTime,

    });

    next();
  };

  return (

    <Card>

      <div className="text-center mb-8">

        <h2 className="text-3xl font-bold">
          Choose Time
        </h2>

        <p className="text-slate-500 mt-2">
          Book instantly or schedule
          for later
        </p>

      </div>

      {/* Instant Booking */}

      <div
        className="
        border
        rounded-2xl
        p-6
        mb-6
        bg-blue-50
        border-blue-200
      "
      >

        <div className="flex items-center gap-3 mb-3">

          <FaBolt
            className="
            text-blue-600
            text-xl
          "
          />

          <h3 className="font-bold text-lg">
            Instant Booking
          </h3>

        </div>

        <p className="text-slate-600 mb-4">
          Professional Service will arrive
          approximately within
          25 minutes.
        </p>

        <Button
          onClick={instantBooking}
          className="w-full"
        >
          ⚡ Book Now
        </Button>

      </div>

      {/* Schedule Booking */}

      <div
        className="
        border
        rounded-2xl
        p-6
      "
      >

        <div className="flex items-center gap-3 mb-4">

          <FaCalendarAlt
            className="
            text-emerald-600
            text-xl
          "
          />

          <h3 className="font-bold text-lg">
            Schedule Booking
          </h3>

        </div>

        <input
          type="date"
          className="
          input
          w-full
          mb-3
        "
          value={bookingDate}
          min={
            new Date()
              .toISOString()
              .split("T")[0]
          }
          onChange={(e) =>
            setBookingDate(
              e.target.value
            )
          }
        />

        <input
          type="time"
          className="
          input
          w-full
          mb-4
        "
          value={startTime}
          onChange={(e) =>
            setStartTime(
              e.target.value
            )
          }
        />

        <Button
          onClick={scheduleBooking}
          className="w-full"
        >
          📅 Schedule Booking
        </Button>

      </div>

      {/* Preview */}

      {bookingDate &&
        startTime && (

        <div
          className="
          mt-5
          p-4
          rounded-xl
          bg-slate-50
        "
        >

          <p className="font-medium">
            Selected Time:
          </p>

          <p className="text-slate-600">
            {bookingDate} at{" "}
            {startTime}
          </p>

        </div>

      )}

      <div className="mt-6">

        <Button
          variant="secondary"
          onClick={back}
        >
          Back
        </Button>

      </div>

    </Card>

  );
}