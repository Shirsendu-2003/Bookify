import { FaCalendarCheck } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import BookingHistory from "../../components/booking/BookingHistory";
import BookingDetailsModal from "../../components/booking/BookingDetailsModal";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import ReviewModal from "../../components/review/ReviewModal";

import {
  useCreateReview,
} from "../../hooks/useProviders";

import {
  useCustomerBookings,
  useCancelBooking,
} from "../../hooks/useBookings";

import { useAuth } from "../../hooks/useAuth";

import {
  showSuccess,
  showError,
  showConfirm,
} from "../../utils/swal";

export default function MyBookings() {

  const { user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const customerId =
    user?.id ||
    user?.customerId ||
    user?.userId;

  const {
    data,
    isLoading,
    error,
  } = useCustomerBookings(customerId);

  const cancelBooking = useCancelBooking();
  const createReview = useCreateReview();

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const bookings =
    data?.data?.content ||
    data?.content ||
    [];

 // Current Bookings
const currentBookings = bookings.filter((booking) => {
  // Cancelled bookings always go to history
  if (booking.status === "CANCELLED") {
    return false;
  }

  // Completed but payment is still pending
  if (
    booking.status === "COMPLETED" &&
    booking.paymentStatus !== "SUCCESS"
  ) {
    return true;
  }

  // Any booking that is not completed is current
  return booking.status !== "COMPLETED";
});

// Booking History
const bookingHistory = bookings.filter((booking) => {
  return (
    booking.status === "CANCELLED" ||
    (
      booking.status === "COMPLETED" &&
      booking.paymentStatus === "SUCCESS"
    )
  );
});

  useEffect(() => {

    if (
      location.state?.openReview &&
      bookings.length > 0
    ) {

      const booking = bookings.find(
        (b) =>
          b.id === location.state.bookingId
      );

      if (booking) {

        setReviewBooking(booking);
        setReviewOpen(true);

        navigate(location.pathname, {
          replace: true,
          state: {},
        });

      }

    }

  }, [
    bookings,
    location,
    navigate,
  ]);

  const handleReview = async (payload) => {

    try {

      await createReview.mutateAsync({
        customerId,
        payload,
      });

      showSuccess(
        "Success",
        "Review Submitted"
      );

      setReviewOpen(false);
      setReviewBooking(null);

    } catch (error) {

      showError(
        "Failed",
        error?.response?.data?.message ||
        error.message
      );

    }

  };

  const handleCancel = async (bookingId) => {

    const result = await showConfirm({
      title: "Cancel Booking?",
      text: "This action cannot be undone.",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {

      await cancelBooking.mutateAsync(bookingId);

      await showSuccess(
        "Cancelled",
        "Booking cancelled successfully."
      );

    } catch (error) {

      showError(
        "Cancellation Failed",
        error?.response?.data?.message ||
        error.message ||
        "Unable to cancel booking."
      );

    }

  };

  const handlePayment = (booking) => {

    navigate(`/payment/${booking.id}`);

  };

  const handleInvoice = (booking) => {

    try {

      window.open(
        `http://localhost:8080/api/invoices/booking/${booking.id}/download`,
        "_blank"
      );

    } catch (error) {

      showError(
        "Error",
        "Unable to download invoice"
      );

    }

  };

  if (isLoading) {

    return (

      <DashboardLayout>

        <div
          className="
            min-h-[70vh]
            flex
            items-center
            justify-center
          "
        >
          <Loader />
        </div>

      </DashboardLayout>

    );

  }

  if (error) {

    return (

      <DashboardLayout>

        <EmptyState
          title="Unable To Load Bookings"
          description="Please refresh the page."
        />

      </DashboardLayout>

    );

  }
  return (

  <DashboardLayout>

    {/* PAGE HEADER */}

    <div className="mb-10">

      <h1
        className="
        text-4xl
        font-bold
        text-slate-900
        "
      >
        My Bookings
      </h1>

      <p
        className="
        mt-3
        text-slate-500
        "
      >
        View and manage your booking history.
      </p>

    </div>

    {bookings.length === 0 ? (

      <EmptyState
        icon={<FaCalendarCheck />}
        title="No Bookings Yet"
        description="Create your first booking."
      />

    ) : (

      <>

        {/* CURRENT BOOKINGS */}

        {currentBookings.length > 0 && (

          <div className="mb-12">

            <h2
              className="
              text-2xl
              font-bold
              mb-6
              "
            >
              Current Bookings
            </h2>

            <BookingHistory
              bookings={currentBookings}
              role="CUSTOMER"

              onView={(booking) => {
                setSelectedBooking(booking);
                setModalOpen(true);
              }}

              onCancel={(booking) => {
                handleCancel(booking.id);
              }}

              onPay={handlePayment}

              onReview={(booking) => {
                setReviewBooking(booking);
                setReviewOpen(true);
              }}

              onInvoice={handleInvoice}
            />

          </div>

        )}

        {/* BOOKING HISTORY */}

        {bookingHistory.length > 0 && (

          <div>

            <h2
              className="
              text-2xl
              font-bold
              mb-6
              "
            >
              Booking History
            </h2>

            <BookingHistory
              bookings={bookingHistory}
              role="CUSTOMER"

              onView={(booking) => {
                setSelectedBooking(booking);
                setModalOpen(true);
              }}

              onCancel={(booking) => {
                handleCancel(booking.id);
              }}

              onPay={handlePayment}

              onReview={(booking) => {
                setReviewBooking(booking);
                setReviewOpen(true);
              }}

              onInvoice={handleInvoice}
            />

          </div>

        )}

      </>

    )}

    <BookingDetailsModal
      booking={selectedBooking}
      open={modalOpen}
      onClose={() => {
        setModalOpen(false);
        setSelectedBooking(null);
      }}
    />

    <ReviewModal
      open={reviewOpen}
      booking={reviewBooking}
      loading={createReview.isPending}
      onClose={() => {
        setReviewOpen(false);
        setReviewBooking(null);
      }}
      onSubmit={handleReview}
    />

  </DashboardLayout>

);

}