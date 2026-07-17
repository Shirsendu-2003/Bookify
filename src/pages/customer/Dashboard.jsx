import {
  FaCalendarCheck,
  FaMoneyBillWave,
  FaStar,
  FaUserTie,
} from "react-icons/fa";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import AnalyticsCard
from "../../components/dashboard/AnalyticsCard";

import BookingChart
from "../../components/dashboard/BookingChart";

import StatsCard
from "../../components/dashboard/StatsCard";

import Card
from "../../components/common/Card";

import Loader
from "../../components/common/Loader";

import EmptyState
from "../../components/common/EmptyState";

import {
  useCustomerDashboard,
  useRecentBookings,
} from "../../hooks/useDashboard";

import {
  formatDate,
} from "../../utils/formatter";

export default function Dashboard(){

  const {

  data,
  isLoading,
  error,

} = useCustomerDashboard();



  const {
  data: recentBookingsData,
} = useRecentBookings();

  if(isLoading){

    return(

      <DashboardLayout>

        <div
          className="
          min-h-[70vh]
          flex
          items-center
          justify-center
          "
        >

          <Loader/>

        </div>

      </DashboardLayout>

    );

  }

  if(error){

    return(

      <DashboardLayout>

        <EmptyState

          title="
Unable To Load Dashboard"

          description="
Please try again later."

        />

      </DashboardLayout>

    );

  }

 const stats = {

  bookings:
    data?.totalBookings
    ?? 0,

  payments:
    data?.totalRevenue
    ?? 0,

  reviews:
    data?.totalReviews
    ?? 0,

  providers:
    data?.totalProviders
    ?? 0,

};

const recentBookings =

  recentBookingsData?.content ||

  recentBookingsData?.data?.content ||

  recentBookingsData?.content?.content ||

  [];




  return(

    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h1
          className="
          text-4xl
          font-bold
          text-slate-900
          "
        >

          Customer Dashboard

        </h1>

        <p
          className="
          mt-3
          text-slate-500
          "
        >

          Manage bookings,
          Professional Service and payments.

        </p>

      </div>

      {/* KPI CARDS */}

      <div
        className="
        grid
        md:grid-cols-2
        xl:grid-cols-4
        gap-8
        mb-10
        "
      >

        <AnalyticsCard

          title="
Total Bookings"

          value={
            stats.bookings
          }

          growth={12}

          color="blue"

          icon={
            <FaCalendarCheck/>
          }

        />

        <AnalyticsCard

          title="
Payments"

          value={`₹${stats.payments}`}

          growth={8}

          color="emerald"

          icon={
            <FaMoneyBillWave/>
          }

        />

        <AnalyticsCard

          title="
Reviews"

          value={
            stats.reviews
          }

          growth={14}

          color="violet"

          icon={
            <FaStar/>
          }

        />

        <AnalyticsCard

          title="
Professional Service"

          value={
            stats.providers
          }

          growth={5}

          color="rose"

          icon={
            <FaUserTie/>
          }

        />

      </div>

      {/* CHART + STATS */}

      <div
        className="
        grid
        xl:grid-cols-3
        gap-8
        "
      >

        <div className="xl:col-span-2">

         <BookingChart
  role="customer"
/>

        </div>

        <div className="space-y-6">

          <StatsCard

            title="
Completed"

            value="85%"

            trend={10}

            color="emerald"

            icon={
              <FaCalendarCheck/>
            }

          />

          <StatsCard

            title="
Satisfaction"

            value="4.8/5"

            trend={7}

            color="amber"

            icon={
              <FaStar/>
            }

          />

        </div>

      </div>

      {/* RECENT BOOKINGS */}

      <Card className="mt-10">

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

            Recent Bookings

          </h2>

        </div>

        {

          recentBookings.length===0

          ?(

            <EmptyState

              title="
No Bookings"

              description="
Create your first booking."

            />

          )

          :(

            <div className="space-y-5">

              {

                recentBookings.map(

                  (booking)=>(

                    <div

                      key={
                        booking.id
                      }

                      className="
                      border
                      border-slate-200
                      rounded-2xl
                      p-6
                      flex
                      flex-col
                      lg:flex-row
                      justify-between
                      gap-6
                      "

                    >

                      <div>

                        <h3
                          className="
                          font-bold
                          text-lg
                          "
                        >

                          {
                            booking.serviceType
                          }

                        </h3>

                        <p
                          className="
                          text-slate-500
                          mt-2
                          "
                        >

                          {
                            booking.providerName
                          }

                        </p>

                        <p
                          className="
                          text-slate-500
                          mt-2
                          "
                        >

                          ₹{
                            booking.amount
                          }

                        </p>

                      </div>

                      <div>

                        <p
                          className="
                          text-slate-500
                          "
                        >

                          {

                            formatDate(

                              booking.bookingDate

                            )

                          }

                        </p>

                        <span
                          className="
                          inline-block
                          mt-3
                          bg-blue-100
                          text-blue-700
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          "
                        >

                          {
                            booking.status
                          }

                        </span>

                      </div>

                    </div>

                  )

                )

              }

            </div>

          )

        }

      </Card>

    </DashboardLayout>

  );

}