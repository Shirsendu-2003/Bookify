import {
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import AnalyticsCard
from "../../components/dashboard/AnalyticsCard";

import RevenueChart
from "../../components/dashboard/RevenueChart";

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

  useAdminDashboard,
  useActivities,

} from "../../hooks/useDashboard";

import {

  formatDateTime,
  formatCurrency,

} from "../../utils/formatter";

export default function Dashboard(){

  const {

    data,
    isLoading,
    error,

  } = useAdminDashboard();

  const {

    data:activitiesData,

  } = useActivities();

  const activities =

    Array.isArray(
      activitiesData
    )

      ? activitiesData

      : Array.isArray(
          activitiesData?.content
        )

      ? activitiesData.content

      : Array.isArray(
          activitiesData?.data
        )

      ? activitiesData.data

      : Array.isArray(
          activitiesData?.data?.content
        )

      ? activitiesData.data.content

      : [];

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

          <Loader />

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
          Please refresh."

        />

      </DashboardLayout>

    );

  }

  const stats = {

    users:
      data?.totalUsers || 0,

    providers:
      data?.totalProviders || 0,

    bookings:
      data?.totalBookings || 0,

    revenue:
      data?.totalRevenue || 0,

  };

  return(

    <DashboardLayout>

      {/* HEADER */}

      <div
        className="
        mb-10
        "
      >

        <h1
          className="
          text-4xl
          font-bold
          "
        >

          Admin Dashboard

        </h1>

        <p
          className="
          mt-3
          text-slate-500
          "
        >

          Platform overview,
          analytics and system
          monitoring.

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

          title="Users"

          value={
            stats.users
          }

          growth={12}

          color="blue"

          icon={
            <FaUsers/>
          }

        />

        <AnalyticsCard

          title="Professional Services"

          value={
            stats.providers
          }

          growth={8}

          color="emerald"

          icon={
            <FaUserTie/>
          }

        />

        <AnalyticsCard

          title="Bookings"

          value={
            stats.bookings
          }

          growth={15}

          color="amber"

          icon={
            <FaClipboardList/>
          }

        />

        <AnalyticsCard

          title="Revenue"

          value={

            formatCurrency(
              stats.revenue
            )

          }

          growth={18}

          color="violet"

          icon={
            <FaMoneyBillWave/>
          }

        />

      </div>

      {/* CHARTS */}

      <div
        className="
        grid
        xl:grid-cols-2
        gap-8
        mb-10
        "
      >

        <RevenueChart
    role="admin"
/>

        <BookingChart
  role="admin"
/>

      </div>

      {/* OVERVIEW */}

      <div
        className="
        grid
        xl:grid-cols-3
        gap-8
        mb-10
        "
      >

        <StatsCard

          title="Success Rate"

          value="96%"

          trend={7}

          color="emerald"

        />

        <StatsCard

          title="Platform Health"

          value="Excellent"

          trend={5}

          color="blue"

        />

        <StatsCard

          title="Growth"

          value="+18%"

          trend={12}

          color="amber"

        />

      </div>

      {/* ACTIVITY */}

      <Card>

        <h2
          className="
          text-2xl
          font-bold
          mb-8
          "
        >

          Recent Activity

        </h2>

        {

          activities.length===0

          ? (

            <EmptyState

              title="
              No Activities"

              description="
              Activity feed appears here."

            />

          )

          : (

            <div
              className="
              space-y-5
              "
            >

              {

                activities.map(

(activity)=>(

<div

  key={activity.id}

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

{activity.serviceType}

</h3>

<p
className="
text-slate-500
mt-2
"
>

Customer:

<strong>

{activity.customerName}

</strong>

</p>

<p
className="
text-slate-500
mt-2
"
>

Professional Service:

<strong>

{activity.providerName}

</strong>

</p>

<p
className="
text-slate-500
mt-2
"
>

Address:

{activity.address}

</p>

</div>

<div>

<p
className="
font-semibold
text-emerald-600
"
>

{

formatCurrency(

activity.amount

)

}

</p>

<p
className="
mt-3
text-slate-500
"
>

{

formatDateTime(

activity.createdAt

)

}

</p>

<span
className="

inline-block

mt-4

bg-blue-100
text-blue-700

px-4
py-2

rounded-full
text-sm

"

>

{activity.status}

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