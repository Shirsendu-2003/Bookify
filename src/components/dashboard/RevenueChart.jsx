import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
  useRevenueAnalytics,
} from "../../hooks/useDashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function RevenueChart({

  title="Revenue Analytics",

  period="monthly",

  role="customer",

}){

  const {

    data,

    isLoading,

  } = useRevenueAnalytics(

      period,

      role

  );

  if(isLoading){

    return(

      <div className="
        h-[420px]
        flex
        items-center
        justify-center
        text-slate-500
      ">

        Loading revenue analytics...

      </div>

    );

  }

  const revenue =
    data?.stats?.total || 0;

  const monthly =
    data?.stats?.monthly || 0;

  const refunded =
    data?.stats?.pending || 0;

  const revenueData =

      data?.monthlyRevenue ||

      Array(12).fill(monthly);

  const labels=[

    "Jan","Feb","Mar","Apr",

    "May","Jun","Jul","Aug",

    "Sep","Oct","Nov","Dec"

  ];

  const chartData={

    labels,

    datasets:[

      {

        label:"Revenue",

        data:revenueData,

        borderColor:"#2563eb",

        backgroundColor:
          "rgba(37,99,235,0.15)",

        fill:true,

        tension:0.4,

        pointRadius:5,

      },

    ],

  };

  return(

    <div className="
      rounded-3xl
      bg-white
      border
      border-slate-200
      p-8
    ">

      <div className="
        flex
        justify-between
        mb-8
      ">

        <div>

          <h2 className="
            text-2xl
            font-bold
          ">

            {title}

          </h2>

          <p className="
            mt-2
            text-slate-500
          ">

            {role==="admin"

              ? "Platform revenue analytics"

              : role==="provider"

              ? "Provider earnings overview"

              : "Customer payment overview"

            }

          </p>

        </div>

        <div className="
          bg-blue-50
          rounded-2xl
          px-6
          py-4
        ">

          <p className="
            text-sm
            text-slate-500
          ">

            Total Revenue

          </p>

          <h3 className="
            mt-2
            text-3xl
            font-bold
            text-blue-700
          ">

            ₹{
              Number(revenue)
                .toLocaleString()
            }

          </h3>

        </div>

      </div>

      <div className="
        h-[420px]
      ">

        <Line
          data={chartData}
          options={{
            responsive:true,
            maintainAspectRatio:false,
          }}
        />

      </div>

    </div>

  );

}