import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Doughnut,
} from "react-chartjs-2";

import {

  useBookingAnalytics,

} from "../../hooks/useDashboard";

ChartJS.register(

  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend

);

export default function BookingChart({

  chartType="bar",

  period="monthly",

  role="customer",

}){

  const {

    data,

    isLoading,

  } = useBookingAnalytics(

      period,

      role

  );

  if(isLoading){

    return(

      <div className="
        p-6
        bg-white
        rounded-3xl
      ">

        Loading Analytics...

      </div>

    );

  }

  const bookings={

    completed:
      data?.completed || 0,

    pending:
      data?.pending || 0,

    cancelled:
      data?.cancelled || 0,

    confirmed:
      data?.accepted || 0,

  };

  const chartData={

    labels:[

      "Completed",
      "Pending",
      "Cancelled",
      "Confirmed",

    ],

    datasets:[

      {

        label:"Bookings",

        data:[

          bookings.completed,

          bookings.pending,

          bookings.cancelled,

          bookings.confirmed,

        ],

        backgroundColor:[

          "#16a34a",
          "#eab308",
          "#dc2626",
          "#2563eb",

        ],

        borderRadius:12,

      },

    ],

  };

  const options={

    responsive:true,

    maintainAspectRatio:false,

    plugins:{

      legend:{
        position:"bottom",
      },

      tooltip:{
        backgroundColor:"#0f172a",
      },

    },

    scales:

      chartType==="bar"

      ?{

          y:{
            beginAtZero:true,
          },

          x:{
            grid:{
              display:false,
            },
          },

        }

      :{},

  };

  return(

    <div className="
      p-6
      bg-white
      rounded-3xl
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">

        Booking Analytics

      </h2>

      <div className="h-[420px]">

        {

          chartType==="bar"

          ?

          (

            <Bar
              data={chartData}
              options={options}
            />

          )

          :

          (

            <Doughnut
              data={chartData}
              options={options}
            />

          )

        }

      </div>

    </div>

  );

}