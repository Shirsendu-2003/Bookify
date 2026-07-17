import {
  FaMoneyBillWave,
  FaWallet,
  FaArrowTrendUp,
  FaReceipt,
} from "react-icons/fa6";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import RevenueChart
from "../../components/dashboard/RevenueChart";

import AnalyticsCard
from "../../components/dashboard/AnalyticsCard";

import Card from
"../../components/common/Card";

import Loader from
"../../components/common/Loader";

import EmptyState from
"../../components/common/EmptyState";

import {

  useProviderRevenueAnalytics,

} from "../../hooks/useDashboard";

import {

  formatCurrency,
  formatDate,

} from "../../utils/formatter";

export default function Earnings(){

  const {

    data,

    isLoading,

    error,

  } = useProviderRevenueAnalytics(
    "monthly"
  );

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
Unable To Load Earnings"

          description="
Please try again."

        />

      </DashboardLayout>

    );

  }

  const stats =

    data?.stats ||

    {

      total:45200,

      pending:7200,

      monthly:12800,

      transactions:56,

    };

  const transactions =

    data?.transactions ||

    [];

  return(

    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h1
          className="

text-4xl
font-bold

"

        >

          Earnings

        </h1>

        <p
          className="

mt-3
text-slate-500

"

        >

          Revenue analytics
          and payout overview.

        </p>

      </div>

      {/* CARDS */}

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
Total Revenue"

          value={

            formatCurrency(

              stats.total

            )

          }

          growth={12}

          color="emerald"

          icon={
            <FaWallet/>
          }

        />

        <AnalyticsCard

          title="
Pending Payout"

          value={

            formatCurrency(

              stats.pending

            )

          }

          growth={5}

          color="amber"

          icon={
            <FaMoneyBillWave/>
          }

        />

        <AnalyticsCard

          title="
Monthly Revenue"

          value={

            formatCurrency(

              stats.monthly

            )

          }

          growth={15}

          color="blue"

          icon={
            <FaArrowTrendUp/>
          }

        />

        <AnalyticsCard

          title="
Transactions"

          value={
            stats.transactions
          }

          growth={8}

          color="violet"

          icon={
            <FaReceipt/>
          }

        />

      </div>

      {/* CHART */}

      <Card
        className="
mb-10
"
      >

        <RevenueChart
    role="provider"
/>

      </Card>

      {/* HISTORY */}

      <Card>

        <h2
          className="

text-2xl
font-bold

mb-8

"

        >

          Transactions

        </h2>

        {

          transactions.length===0

          ? (

            <EmptyState

              title="
No Transactions"

              description="
Payments appear here."

            />

          )

          : (

            <div
              className="
space-y-5
"
            >

              {transactions.map(

                (tx)=>(

                <div

                  key={
                    tx.id
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
"
                    >

                      {

                        tx.customerName

                      }

                    </h3>

                    <p
                      className="
text-slate-500
mt-2
"
                    >

                      {

                        formatDate(

                          tx.date

                        )

                      }

                    </p>

                  </div>

                  <div>

                    <p
                      className="

font-bold
text-emerald-600

"

                    >

                      {

formatCurrency(

tx.amount

)

                      }

                    </p>

                    <span
                      className="

inline-block

mt-3

bg-emerald-100
text-emerald-700

px-4
py-2

rounded-full
text-sm

"

                    >

                      {

                        tx.status

                      }

                    </span>

                  </div>

                </div>

              ))}

            </div>

          )

        }

      </Card>

    </DashboardLayout>

  );

}