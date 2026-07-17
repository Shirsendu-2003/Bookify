import {
  FaMoneyBillWave,
  FaBriefcase,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";

import axiosInstance from "../../services/api";
import { useEffect } from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import AnalyticsCard
from "../../components/dashboard/AnalyticsCard";

import BookingChart
from "../../components/dashboard/BookingChart";

import Card
from "../../components/common/Card";

import Loader
from "../../components/common/Loader";

import EmptyState
from "../../components/common/EmptyState";

import {
  useProviderDashboard,
  useProviderRecentJobs,
} from "../../hooks/useDashboard";

import {
  formatCurrency,
  formatDate,
} from "../../utils/formatter";

export default function Dashboard(){

  const {

    data,

    isLoading,

    error,

  } = useProviderDashboard();

  const {

    data:recentJobsData,

  } = useProviderRecentJobs();

  useEffect(() => {

  const updateLocation = () => {

    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        try {

          await axiosInstance.put(
            "/providers/location",
            {
              latitude:
                position.coords.latitude,

              longitude:
                position.coords.longitude,
            }
          );

        } catch (error) {

          console.error(
            "Location update failed",
            error
          );

        }

      }
    );

  };

  updateLocation();

  const interval = setInterval(
    updateLocation,
    30000
  );

  return () =>
    clearInterval(interval);

}, []);

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
Dashboard Load Failed"

          description="
Please try again."

        />

      </DashboardLayout>

    );

  }

  const stats = {

    earnings:
      data?.totalRevenue
      ?? 0,

    jobs:
      data?.totalBookings
      ?? 0,

    rating:
      data?.averageRating
      ?? 0,

    completed:
      data?.completedBookings
      ?? 0,

  };

  const recentJobs =

    recentJobsData?.content ||

    recentJobsData?.data?.content ||

    [];



  return(

    <DashboardLayout>

      <div className="mb-10">

        <h1
          className="
          text-4xl
          font-bold
          "
        >

          Professional Service Dashboard

        </h1>

        <p
          className="
          mt-3
          text-slate-500
          "
        >

          Track earnings,
          jobs and performance.

        </p>

      </div>

      {/* KPI */}

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

          title="Total Earnings"

          value={
            formatCurrency(
              stats.earnings
            )
          }

          growth={14}

          color="emerald"

          icon={
            <FaMoneyBillWave/>
          }

        />

        <AnalyticsCard

          title="Jobs"

          value={
            stats.jobs
          }

          growth={10}

          color="blue"

          icon={
            <FaBriefcase/>
          }

        />

        <AnalyticsCard

          title="Rating"

          value={
            stats.rating
          }

          growth={7}

          color="amber"

          icon={
            <FaStar/>
          }

        />

        <AnalyticsCard

          title="Completed"

          value={
            stats.completed
          }

          growth={11}

          color="violet"

          icon={
            <FaCheckCircle/>
          }

        />

      </div>

      {/* CHART */}

      <div className="mb-10">

        <BookingChart
  role="provider"
/>

      </div>

      {/* RECENT JOBS */}

      <Card>

        <h2
          className="
          text-2xl
          font-bold
          mb-8
          "
        >

          Recent Jobs

        </h2>

        {

          recentJobs.length===0

          ?(

            <EmptyState

              title="
No Jobs"

              description="
Assigned jobs appear here."

            />

          )

          :(

           <div className="space-y-5">

  {recentJobs.map((job)=>(

    <div
      key={job.id}
      className="
      border
      border-slate-200
      rounded-2xl
      p-6
      bg-white
      shadow-sm
      "
    >

      <div
        className="
        flex
        flex-col
        lg:flex-row
        justify-between
        gap-8
        "
      >

        {/* LEFT */}

        <div className="flex-1">

          <h3
            className="
            text-xl
            font-bold
            text-slate-900
            "
          >

            {job.serviceType
            || "Service"}

          </h3>

          <div
            className="
            mt-5
            space-y-2
            text-slate-600
            "
          >

            <p>

              <strong>
                Customer:
              </strong>

             {
  job.customerName
  ||

  [
    job.customer?.firstName,
    job.customer?.lastName
  ]
    .filter(Boolean)
    .join(" ")

  ||

  "N/A"
}

            </p>

            <p>

              <strong>
                Phone:
              </strong>

              {

                job.customerPhone

                ||

                job.customer?.phone

                ||

                "N/A"

              }

            </p>

            <p>

              <strong>
                Address:
              </strong>

              {

                job.address

                ||

                job.customerAddress

                ||

                "No address"

              }

            </p>

            <p>

              <strong>
                Amount:
              </strong>

              ₹{

                job.amount
                ?? 0

              }

            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div
          className="
          lg:text-right
          space-y-3
          "
        >

          <p
            className="
            text-slate-500
            "
          >

            <strong>
              Booking Date:
            </strong>

            {" "}

            {

              formatDate(

                job.bookingDate
                ||
                job.createdAt

              )

            }

          </p>

          <p
            className="
            text-slate-500
            "
          >

            <strong>
              Time:
            </strong>

            {

              job.bookingTime
              ||
              "Not Assigned"

            }

          </p>

          <span
            className={`

inline-block
px-4
py-2
rounded-full
text-sm
font-medium

${

job.status==="COMPLETED"

? "bg-emerald-100 text-emerald-700"

: job.status==="PENDING"

? "bg-amber-100 text-amber-700"

: job.status==="CANCELLED"

? "bg-red-100 text-red-700"

: "bg-blue-100 text-blue-700"

}

`}
          >

            {

              job.status
              || "PENDING"

            }

          </span>

        </div>

      </div>

    </div>

  ))}

</div>

          )}

      </Card>

    </DashboardLayout>

  );

}