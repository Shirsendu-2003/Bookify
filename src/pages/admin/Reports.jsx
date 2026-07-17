import { useState } from "react";

import {
  FaFileExport,
  FaChartPie,
  FaMoneyBillWave,
} from "react-icons/fa";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import RevenueChart
from "../../components/dashboard/RevenueChart";

import BookingChart
from "../../components/dashboard/BookingChart";

import AnalyticsCard
from "../../components/dashboard/AnalyticsCard";

import Card
from "../../components/common/Card";

import Select
from "../../components/common/Select";

import Button
from "../../components/common/Button";

import Loader
from "../../components/common/Loader";

import {
  useReports,
  useExportReport,
} from "../../hooks/useDashboard";

import {
  formatCurrency,
} from "../../utils/formatter";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function Reports(){

  const [period,setPeriod] =
    useState("monthly");

  const {

    data,
    isLoading,
    error,

  } = useReports({

    period,

  });

  const exportReport =
    useExportReport();

const handleExport =
async (
  reportType = "dashboard"
) => {

  try {

    const response =
      await exportReport.mutateAsync({
        reportType,
        format: "pdf"
      });

    const report =
      response.data || response;

    window.open(
      `http://localhost:8080${report.downloadUrl}`,
      "_blank"
    );

  } catch (error) {

    showError(
      "Export Failed",
      error.message
    );

  }

};

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

        <Card>

          Failed to load reports.

        </Card>

      </DashboardLayout>

    );

  }



  const stats = {

    revenue:

      data?.revenue ||

      data?.stats?.revenue ||

      0,

    bookings:

      data?.bookings ||

      data?.stats?.bookings ||

      0,

    growth:

      data?.growth ||

      data?.stats?.growth ||

      0,

  };

  return(

    <DashboardLayout>

      {/* HEADER */}

      <div
        className="
        flex
        flex-col
        lg:flex-row
        justify-between
        gap-6
        mb-10
        "
      >

        <div>

          <h1
            className="
            text-4xl
            font-bold
            "
          >

            Reports

          </h1>

          <p
            className="
            mt-3
            text-slate-500
            "
          >

            Platform analytics,
            insights and exports.

          </p>

        </div>

        <Button
  onClick={() =>
    handleExport("dashboard")
  }
>
  <FaFileExport/>
  Dashboard Report
</Button>


      </div>

      {/* FILTER */}

      <div className="mb-10">

        <Select

          value={period}

          onChange={(e)=>

            setPeriod(
              e.target.value
            )

          }

          options={[

            {

              label:"Monthly",

              value:"monthly",

            },

            {

              label:"Quarterly",

              value:"quarterly",

            },

            {

              label:"Yearly",

              value:"yearly",

            },

          ]}

        />

      </div>

      {/* KPI */}

      <div
        className="
        grid
        md:grid-cols-3
        gap-8
        mb-10
        "
      >

        <AnalyticsCard

          title="Revenue"

          value={

            formatCurrency(
              stats.revenue
            )

          }

          growth={12}

          color="emerald"

          icon={
            <FaMoneyBillWave/>
          }

        />

        <AnalyticsCard

          title="Bookings"

          value={
            stats.bookings
          }

          growth={8}

          color="blue"

          icon={
            <FaChartPie/>
          }

        />

        <AnalyticsCard

          title="Growth"

          value={`${

            stats.growth

          }%`}

          growth={5}

          color="amber"

        />

      </div>

      {/* CHARTS */}

      <div
        className="
        grid
        xl:grid-cols-2
        gap-8
        "
      >

        <RevenueChart

    role="admin"

    period={period}

/>

        <BookingChart

      role="admin"

      period={period}

  />

      </div>

    </DashboardLayout>

  );

}