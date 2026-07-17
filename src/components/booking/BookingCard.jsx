import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import Badge from "../common/Badge";
import Button from "../common/Button";
import Card from "../common/Card";

const statusVariant = {

  PENDING: "warning",

  ACCEPTED: "info",

  IN_PROGRESS: "primary",

  COMPLETED: "success",

  REJECTED: "danger",

  CANCELLED: "danger",

};

const paymentVariant = {

  SUCCESS: "success",

  FAILED: "danger",

  PENDING: "warning",

  CANCELLED: "danger",

  REFUNDED: "warning",

};

export default function BookingCard({

  booking,

  role = "CUSTOMER",

  onAccept,

  onReject,

  onView,

  onCancel,

  onPay,

  onReview,

  onInvoice,

}) {

  return (

    <Card className="overflow-hidden">

      {/* HEADER */}

      <div
        className="

flex
flex-col
lg:flex-row
lg:items-center
lg:justify-between
gap-5
mb-6

"
      >

        <div>

          <h3
            className="

text-xl
font-bold
text-slate-900

"
          >

            {booking.serviceType}

          </h3>

          <p
            className="

mt-2
text-slate-500

"
          >

            Booking ID: #{booking.id}

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <Badge
            variant={
              statusVariant[
                booking.status
              ] || "warning"
            }
          >

            {booking.status}

          </Badge>

          <Badge
            variant={
              paymentVariant[
                booking.paymentStatus
              ] || "warning"
            }
          >

            {
              booking.paymentStatus ||
              "PENDING"
            }

          </Badge>

        </div>

      </div>

      {/* BODY */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT */}

        <div className="space-y-5">

          <div className="flex gap-4">

            <FaUser
              className="

text-blue-600
mt-1

"
            />

           <div>
  <p className="text-sm text-slate-500">
    Professional Service
  </p>

  <h4 className="font-semibold">
    {booking.providerName}
  </h4>

  
</div>
</div>

          

          <div className="flex gap-4">

            <FaCalendarAlt
              className="

text-blue-600
mt-1

"
            />

            <div>

              <p className="text-sm text-slate-500">

                Booking Date

              </p>

              <h4 className="font-semibold">

                {booking.bookingDate
                  ? new Date(
                      booking.bookingDate
                    ).toLocaleDateString()
                  : "N/A"}

              </h4>

            </div>

          </div>

          <div className="flex gap-4">

            <FaClock
              className="

text-blue-600
mt-1

"
            />

            <div>

              <p className="text-sm text-slate-500">

                Time Slot

              </p>

              <h4 className="font-semibold">

                {
                  booking.startTime &&
                  booking.endTime

                    ? `${booking.startTime} - ${booking.endTime}`

                    : "N/A"
                }

              </h4>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-5">

          <div className="flex gap-4">

            <FaMapMarkerAlt
              className="

text-red-500
mt-1

"
            />

            <div>

              <p className="text-sm text-slate-500">

                Address

              </p>

              <h4 className="font-semibold leading-7">

                {booking.address}

              </h4>

            </div>

          </div>

          <div className="flex gap-4">

            <FaMoneyBillWave
              className="

text-green-600
mt-1

"
            />

            <div>

              <p className="text-sm text-slate-500">

               Hourly Amount

              </p>

              <h4
                className="

font-bold
text-xl
text-slate-900

"
              >

                ₹{booking.amount ?? 0}

              </h4>

            </div>

          </div>

        </div>

      </div>

      {/* ACTIONS */}

      <div
        className="

flex
flex-wrap
gap-4
mt-8
pt-6
border-t

"
      >

        <Button
          variant="secondary"
          onClick={() =>
            onView?.(booking)
          }
        >

          View Details

        </Button>

        {/* CUSTOMER */}

        {role === "CUSTOMER" && (

          <>

            {/* CANCEL BOOKING */}

            {(booking.status === "PENDING" ||

              booking.status === "ACCEPTED") && (

              <Button
                variant="danger"
                onClick={() =>
                  onCancel?.(booking)
                }
              >

                Cancel Booking

              </Button>

            )}

            {/* PAY NOW */}

            {booking.status === "COMPLETED" &&

              (

                booking.paymentStatus === null ||

                booking.paymentStatus === undefined ||

                booking.paymentStatus === "PENDING" ||

                booking.paymentStatus === "FAILED" ||

                booking.paymentStatus === "CANCELLED"

              ) && (

                <Button
                  variant="success"
                  onClick={() =>
                    onPay?.(booking)
                  }
                >

                  <FaMoneyBillWave />

                  Pay Now

                </Button>

              )}

            {/* PAYMENT COMPLETED */}

          {booking.status === "COMPLETED" &&
 booking.paymentStatus === "SUCCESS" && (
  <>
    <Button
      variant="success"
      onClick={() =>
        onReview?.(booking)
      }
    >
      Leave Review
    </Button>

    <Button
      variant="secondary"
      onClick={() =>
        onInvoice?.(booking)
      }
    >
      <FaFileInvoiceDollar />

      Download Bill
    </Button>
  </>
)}

          </>

        )}

        {/* PROVIDER */}

        {role === "PROVIDER" &&
          booking.status === "PENDING" && (

            <>

              <Button
                variant="success"
                onClick={() =>
                  onAccept?.(booking)
                }
              >

                <FaCheckCircle />

                Accept

              </Button>

              <Button
                variant="danger"
                onClick={() =>
                  onReject?.(booking)
                }
              >

                <FaTimesCircle />

                Reject

              </Button>

            </>

          )}

      </div>

    </Card>

  );

}