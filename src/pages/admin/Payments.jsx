import {
  useMemo,
  useState,
} from "react";

import {
  FaMoneyBillWave,
  FaReceipt,
} from "react-icons/fa";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import Card
from "../../components/common/Card";

import AnalyticsCard
from "../../components/dashboard/AnalyticsCard";

import Input
from "../../components/common/Input";

import Select
from "../../components/common/Select";

import Button
from "../../components/common/Button";

import Loader
from "../../components/common/Loader";

import EmptyState
from "../../components/common/EmptyState";

import {

  usePayments,
  useRefundPayment,

} from "../../hooks/usePayments";

import {

  formatCurrency,
  formatDate,

} from "../../utils/formatter";

import {

  showSuccess,
  showError,

} from "../../utils/swal";

export default function Payments(){

  const [search,setSearch] =
    useState("");

  const [status,setStatus] =
    useState("");

  const {

    data,

    isLoading,

    error,

  } = usePayments();

  const refundPayment =
    useRefundPayment();

  const payments =
    useMemo(()=>{

      const list =

        data?.data?.content ||

        data?.content ||

        data?.data ||

        [];

      return list.filter(

        (payment)=>{

          const matchesSearch =

            (

              payment.customerName ||

              ""

            )

            .toLowerCase()

            .includes(

              search
                .toLowerCase()

            );

          const matchesStatus =

            !status ||

            payment.status===status;

          return(

            matchesSearch &&

            matchesStatus

          );

        }

      );

    },[

      data,
      search,
      status,

    ]);

  const handleRefund =
    async(id)=>{

      try{

        await refundPayment
          .mutateAsync({

            paymentId:id,

            reason:
              "Admin Refund",

          });

        showSuccess(

          "Refund Processed",

          "Payment refunded successfully."

        );

      }catch(error){

        showError(

          "Refund Failed",

          error?.response
            ?.data?.message ||

          error.message ||

          "Unable to process refund."

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

        <EmptyState

          title="
Unable To Load Payments"

          description="
Please refresh."

        />

      </DashboardLayout>

    );

  }

  const totalRevenue =

    payments.reduce(

      (sum,p)=>

        sum +

        Number(
          p.amount || 0
        ),

      0

    );

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

          Payments

        </h1>

        <p
          className="
mt-3
text-slate-500
"
        >

          Manage transactions,
          invoices and refunds.

        </p>

      </div>

      {/* KPI */}

      <div
        className="
grid
md:grid-cols-2
gap-8
mb-10
"
      >

        <AnalyticsCard

          title="
Revenue"

          value={

            formatCurrency(
              totalRevenue
            )

          }

          growth={12}

          color="emerald"

          icon={
            <FaMoneyBillWave/>
          }

        />

        <AnalyticsCard

          title="
Transactions"

          value={
            payments.length
          }

          growth={8}

          color="blue"

          icon={
            <FaReceipt/>
          }

        />

      </div>

      {/* FILTERS */}

      <div
        className="
grid
lg:grid-cols-2
gap-6
mb-10
"
      >

        <Input

          placeholder="
Search customer..."

          value={search}

          onChange={(e)=>

            setSearch(
              e.target.value
            )

          }

        />

        <Select

          value={status}

          onChange={(e)=>

            setStatus(
              e.target.value
            )

          }

          options={[

            {
              label:
              "All Status",

              value:"",
            },

            {
              label:
              "SUCCESS",

              value:
              "SUCCESS",
            },

            {
              label:
              "REFUNDED",

              value:
              "REFUNDED",
            },

            {
              label:
              "FAILED",

              value:
              "FAILED",
            },

          ]}

        />

      </div>

      {/* TABLE */}

      {

        payments.length===0

        ?(

          <EmptyState

            title="
No Payments Found"

            description="
Transactions appear here."

          />

        )

        :(

          <Card>

            <div
              className="
overflow-x-auto
"
            >

              <table
                className="
w-full
"
              >

                <thead>

                  <tr
                    className="
border-b
border-slate-200
"
                  >

                    <th className="p-4 text-left">

                      Customer

                    </th>

                    <th className="p-4 text-left">

                      Method

                    </th>

                    <th className="p-4 text-left">

                      Amount

                    </th>

                    <th className="p-4 text-left">

                      Date

                    </th>

                    <th className="p-4 text-left">

                      Status

                    </th>

                    <th className="p-4 text-right">

                      Action

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    payments.map(

                      (payment)=>(

                        <tr

                          key={
                            payment.id
                          }

                          className="
border-b
border-slate-100
"
                        >

                          <td className="p-4">

                            {

                              payment.customerName

                            }

                          </td>

                          <td className="p-4">

                            {

                              payment.paymentMethod

                            }

                          </td>

                          <td className="p-4">

                            {

                              formatCurrency(
                                payment.amount
                              )

                            }

                          </td>

                          <td className="p-4">

                            {

                              formatDate(
                                payment.createdAt
                              )

                            }

                          </td>

                          <td className="p-4">

                            <span
                              className={`

px-3
py-1
rounded-full
text-xs

${

payment.status===

"SUCCESS"

?

"bg-emerald-100 text-emerald-700"

:

payment.status===

"FAILED"

?

"bg-red-100 text-red-700"

:

"bg-amber-100 text-amber-700"

}

`}
                            >

                              {

                                payment.status

                              }

                            </span>

                          </td>

                          <td
                            className="
p-4
text-right
"
                          >

                            {

                              payment.status !==

                              "REFUNDED"

                              &&(

                                <Button

                                  size="sm"

                                  variant="
danger"

                                  onClick={()=>

                                    handleRefund(
                                      payment.id
                                    )

                                  }

                                >

                                  Refund

                                </Button>

                              )

                            }

                          </td>

                        </tr>

                      )

                    )

                  }

                </tbody>

              </table>

            </div>

          </Card>

        )

      }

    </DashboardLayout>

  );

}