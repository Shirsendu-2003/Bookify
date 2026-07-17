import Card from "../common/Card";
import Button from "../common/Button";

export default function BookingDetailsModal({

  booking,

  open,

  onClose,

}) {

  if (!open || !booking) {

    return null;

  }

  return (

    <div
      className="

fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
p-4

"
    >

      <Card
        className="
        w-full
        max-w-3xl
        max-h-[90vh]
        overflow-y-auto
        "
      >

        <div
          className="
          flex
          justify-between
          items-center
          mb-8
          "
        >

          <h2
            className="
            text-2xl
            font-bold
            "
          >

            Booking Details

          </h2>

          <Button
            variant="danger"
            onClick={onClose}
          >

            Close

          </Button>

        </div>

        {/* BOOKING DETAILS */}

        <div className="grid md:grid-cols-2 gap-6">

          <p>
            <b>ID:</b>{" "}
            #{booking.id}
          </p>

          <p>
            <b>Status:</b>{" "}
            {booking.status}
          </p>

          <p>
            <b>Service:</b>{" "}
            {booking.serviceType}
          </p>

          <p>
            <b>Professional Service:</b>{" "}
            {booking.providerName}
          </p>

          <p>
            <b>Date:</b>{" "}
            {booking.bookingDate
              ? new Date(
                  booking.bookingDate
                ).toLocaleDateString()
              : "N/A"}
          </p>

          <p>
            <b>Time:</b>{" "}
            {booking.startTime}
            {" - "}
            {booking.endTime}
          </p>

          <p>
            <b>Amount:</b>{" "}
            ₹{booking.amount}
          </p>

          <p>
            <b>Payment Status:</b>{" "}
            {booking.paymentStatus || "PENDING"}
          </p>

          <p>
            <b>Address:</b>{" "}
            {booking.address}
          </p>

          <p>
            <b>City:</b>{" "}
            {booking.city}
          </p>

          <p>
            <b>State:</b>{" "}
            {booking.state}
          </p>

          <p>
            <b>Country:</b>{" "}
            {booking.country}
          </p>

          <div className="md:col-span-2">

            <p>
              <b>Description:</b>{" "}
              {booking.description}
            </p>

          </div>

        </div>

        {/* BOOKING WORKFLOW STATUS */}

        <div className="mt-8 border-t pt-6">

          <h3 className="text-lg font-semibold mb-4">

            Booking Progress

          </h3>

          {booking.status === "PENDING" && (

            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">

              <p className="text-yellow-700 font-medium">

                Waiting For Professional Service Approval

              </p>

              <p className="text-yellow-600 text-sm mt-1">

                Your booking request has been submitted successfully.

              </p>

            </div>

          )}

          {booking.status === "ACCEPTED" && (

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">

              <p className="text-blue-700 font-medium">

                Booking Accepted

              </p>

              <p className="text-blue-600 text-sm mt-1">

                Service Start OTP has been sent to your registered email.

              </p>

              <p className="text-blue-600 text-sm">

                Share the OTP with the provider when work starts.

              </p>

            </div>

          )}

          {booking.status === "IN_PROGRESS" && (

            <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">

              <p className="text-indigo-700 font-medium">

                Service In Progress

              </p>

              <p className="text-indigo-600 text-sm mt-1">

                Professional Service has verified the Start OTP and started the work.

              </p>

              <p className="text-indigo-600 text-sm">

                Completion OTP will be sent after the service is finished.

              </p>

            </div>

          )}

          {booking.status === "COMPLETED" && (

            <div className="p-4 rounded-lg bg-green-50 border border-green-200">

              <p className="text-green-700 font-medium">

                Service Completed Successfully

              </p>

              <p className="text-green-600 text-sm mt-1">

                Completion OTP verified successfully.

              </p>

              {booking.paymentStatus !== "SUCCESS" && (

                <p className="text-orange-600 text-sm mt-2">

                  Payment is pending. Please complete payment.

                </p>

              )}

              {booking.paymentStatus === "SUCCESS" && (

                <p className="text-green-600 text-sm mt-2">

                  Payment completed successfully.

                </p>

              )}

            </div>

          )}

          {booking.status === "REJECTED" && (

            <div className="p-4 rounded-lg bg-red-50 border border-red-200">

              <p className="text-red-700 font-medium">

                Booking Rejected

              </p>

              <p className="text-red-600 text-sm mt-1">

                Professional Service rejected your booking request.

              </p>

            </div>

          )}

          {booking.status === "CANCELLED" && (

            <div className="p-4 rounded-lg bg-red-50 border border-red-200">

              <p className="text-red-700 font-medium">

                Booking Cancelled

              </p>

              <p className="text-red-600 text-sm mt-1">

                This booking has been cancelled.

              </p>

            </div>

          )}

        </div>

      </Card>

    </div>

  );

}