import { useState, useEffect } from "react";
import {
  FaStar,
  FaTimes,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";

export default function ReviewModal({

  open,

  booking,

  onClose,

  onSubmit,

  loading = false,

}) {

  const [rating, setRating] =
    useState(5);

  const [hover, setHover] =
    useState(0);

  const [comment, setComment] =
    useState("");

  useEffect(() => {

    if (open) {

      setRating(5);
      setHover(0);
      setComment("");

    }

  }, [open, booking]);

  if (!open || !booking) {

    return null;

  }

  const handleSubmit = () => {

    if (loading) return;

    if (!comment.trim()) return;

    onSubmit({

      bookingId:
        booking.id,

      rating,

      comment:
        comment.trim(),

    });

  };

  const ratingText = {

    1: "Poor 😞",
    2: "Fair 😕",
    3: "Good 🙂",
    4: "Very Good 👍",
    5: "Excellent ⭐",

  };

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/60
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-[9999]
      p-3
      "
    >

      <div
        className="
        absolute
        inset-0
        "
        onClick={onClose}
      />

      <Card
        className="
        relative
        w-full
        max-w-[340px]
        sm:max-w-md
        bg-white
        rounded-2xl
        shadow-xl
        p-5
        max-h-[85vh]
        overflow-y-auto
        "
      >

        {/* CLOSE BUTTON */}

        <button
          onClick={onClose}
          className="
          absolute
          top-4
          right-4
          text-slate-400
          hover:text-red-500
          transition
          "
        >

          <FaTimes size={16} />

        </button>

        {/* HEADER */}

        <div className="mb-4">

          <h2
            className="
            text-xl
            sm:text-2xl
            font-bold
            text-slate-900
            "
          >

            Rate Your Experience

          </h2>

          <p
            className="
            text-xs
            sm:text-sm
            text-slate-500
            mt-1
            "
          >

            Share your feedback about the service.

          </p>

        </div>

        {/* BOOKING INFO */}

        <div
          className="
          bg-slate-50
          rounded-xl
          p-3
          mb-4
          "
        >

          <h3
            className="
            font-semibold
            text-sm
            "
          >

            {booking.serviceType}

          </h3>

          <p
            className="
            text-xs
            text-slate-500
            mt-1
            "
          >

            Professional Service:
            {" "}
            {booking.providerName}

          </p>

          <p
            className="
            text-xs
            text-slate-500
            "
          >

            Booking #{booking.id}

          </p>

        </div>

        {/* RATING */}

        <div className="mb-5">

          <label
            className="
            block
            font-semibold
            mb-3
            text-sm
            "
          >

            Rating

          </label>

          <div className="flex gap-1">

            {[1,2,3,4,5].map(
              (star) => (

                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setRating(star)
                  }
                  onMouseEnter={() =>
                    setHover(star)
                  }
                  onMouseLeave={() =>
                    setHover(0)
                  }
                  className="
                  transition-transform
                  hover:scale-110
                  "
                >

                  <FaStar
                    size={24}
                    className={
                      star <=
                      (hover || rating)

                        ? "text-yellow-400"

                        : "text-slate-300"
                    }
                  />

                </button>

              )
            )}

          </div>

          <p
            className="
            mt-2
            text-xs
            font-medium
            text-slate-600
            "
          >

            {ratingText[rating]}

          </p>

        </div>

        {/* REVIEW */}

        <div className="mb-5">

          <label
            className="
            block
            font-semibold
            mb-3
            text-sm
            "
          >

            Review

          </label>

          <textarea
            rows="3"
            maxLength="500"
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            placeholder="Tell us about your experience..."
            className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            text-sm
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            outline-none
            resize-none
            "
          />

          <div
            className="
            text-right
            text-xs
            text-slate-400
            mt-2
            "
          >

            {comment.length}/500

          </div>

        </div>

        {/* ACTIONS */}

        <div
          className="
          flex
          flex-col
          sm:flex-row
          gap-2
          "
        >

          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full"
          >

            Cancel

          </Button>

          <Button
            loading={loading}
            disabled={
              loading ||
              !comment.trim()
            }
            onClick={handleSubmit}
            className="w-full"
          >

            Submit Review

          </Button>

        </div>

      </Card>

    </div>

  );

}