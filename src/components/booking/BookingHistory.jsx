import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import BookingCard from "./BookingCard";
import Input from "../common/Input";
import Select from "../common/Select";
import Pagination from "../common/Pagination";
import EmptyState from "../common/EmptyState";

export default function BookingHistory({

  bookings = [],

  role = "CUSTOMER",

  itemsPerPage = 6,

  onView,

  onAccept,

  onReject,

  onCancel,

  onPay,

  onReview,

  onInvoice,

}) {

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [page, setPage] =
    useState(1);

  const filteredBookings =
    useMemo(() => {

      const query =
        search.toLowerCase();

      return bookings.filter(
        (booking) => {

          const matchesSearch =

            booking.serviceType
              ?.toLowerCase()
              ?.includes(query) ||

            booking.providerName
              ?.toLowerCase()
              ?.includes(query) ||

            booking.customerName
              ?.toLowerCase()
              ?.includes(query);

          const matchesStatus =

            status === "ALL" ||

            booking.status === status;

          return (

            matchesSearch &&

            matchesStatus

          );

        }
      );

    }, [
      bookings,
      search,
      status,
    ]);

  const totalPages =
    Math.ceil(
      filteredBookings.length /
      itemsPerPage
    );

  const startIndex =

    (page - 1) *
    itemsPerPage;

  const paginatedBookings =

    filteredBookings.slice(

      startIndex,

      startIndex +
      itemsPerPage

    );

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div
        className="

rounded-3xl
bg-white
border
border-slate-200
p-6
shadow-sm

"
      >

        <div
          className="

flex
flex-col
lg:flex-row
gap-5

"
        >

          {/* SEARCH */}

          <div className="flex-1">

            <Input
              icon={<FaSearch />}
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => {

                setSearch(
                  e.target.value
                );

                setPage(1);

              }}
            />

          </div>

          {/* FILTER */}

          <div className="w-full lg:w-[240px]">

            <Select
              value={status}
              onChange={(e) => {

                setStatus(
                  e.target.value
                );

                setPage(1);

              }}
              options={[

                {
                  label: "All Status",
                  value: "ALL",
                },

                {
                  label: "Pending",
                  value: "PENDING",
                },

                {
                  label: "Accepted",
                  value: "ACCEPTED",
                },

                {
                  label: "In Progress",
                  value: "IN_PROGRESS",
                },

                {
                  label: "Completed",
                  value: "COMPLETED",
                },

                {
                  label: "Rejected",
                  value: "REJECTED",
                },

                {
                  label: "Cancelled",
                  value: "CANCELLED",
                },

              ]}
            />

          </div>

        </div>

      </div>

      {/* EMPTY STATE */}

      {filteredBookings.length === 0 && (

        <EmptyState

          title="No Bookings Found"

          description="Try changing your filters or create a new booking."

        />

      )}

      {/* BOOKINGS */}

      {filteredBookings.length > 0 && (

        <>

          <div
            className="

grid
xl:grid-cols-2
gap-6

"
          >

            {paginatedBookings.map(
              (booking) => (

                <BookingCard
                  key={booking.id}
                  booking={booking}
                  role={role}
                  onView={onView}
                  onAccept={onAccept}
                  onReject={onReject}
                  onCancel={onCancel}
                  onPay={onPay}
                  onReview={onReview}
                  onInvoice={onInvoice}
                />

              )
            )}

          </div>

          {/* PAGINATION */}

          {totalPages > 1 && (

            <Pagination

              page={page}

              totalPages={
                totalPages
              }

              onChange={
                setPage
              }

            />

          )}

        </>

      )}

    </div>

  );

}