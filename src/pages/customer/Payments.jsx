import {
  FaMoneyBillWave,
  FaDownload,
} from "react-icons/fa";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import PaymentCard
from "../../components/booking/PaymentCard";

import Loader
from "../../components/common/Loader";

import EmptyState
from "../../components/common/EmptyState";

import Button
from "../../components/common/Button";
import { useAuth }
from "../../hooks/useAuth";

import {

  useCustomerPayments,

  useDownloadInvoice,

} from "../../hooks/usePayments";

import {

  formatCurrency,

  formatDate,

} from "../../utils/formatter";

import {

  showError,

  toastSuccess,

} from "../../utils/swal";

export default function Payments(){

  const { user } =
    useAuth();

  const customerId =

    user?.id ||

    user?.userId ||

    user?.customerId;

  const {

    data,
    isLoading,
    error,

  } = useCustomerPayments(
      customerId
  );



const downloadInvoice =
  useDownloadInvoice();

const payments =
  data?.data?.content || [];



  /* DOWNLOAD INVOICE */

  const handleDownload =
    async(id)=>{

      try{

        await downloadInvoice
          .mutateAsync(id);

        toastSuccess(
          "Invoice downloaded."
        );

      }catch(error){

        showError(

          "Download Failed",

          error?.response
            ?.data
            ?.message ||

          error.message ||

          "Unable to download invoice."

        );

      }
 
    };

  /* LOADING */

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

  /* ERROR */

  if(error){

    return(

      <DashboardLayout>

        <EmptyState

          title="
Unable To Load Payments"

          description="
Please try again."

        />

      </DashboardLayout>

    );

  }

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

          View transaction
          history and invoices.

        </p>

      </div>

      {/* EMPTY */}

      {payments.length===0 ? (

        <EmptyState

          icon={
            <FaMoneyBillWave/>
          }

          title="
No Payments Found"

          description="
Your transactions will appear here."

        />

      ) : (

        <div className="space-y-8">

          {payments.map(

            (payment)=>(

              <PaymentCard

                key={
                  payment.id
                }

                payment={
                  payment
                }

                footer={

                  <div
                    className="

flex
justify-between
items-center
mt-5

"
                  >

                    {/* LEFT */}

                    <div>

                      <p
                        className="
font-semibold
"
                      >

                        {

                          formatCurrency(
                            payment.amount
                          )

                        }

                      </p>

                      <p
                        className="
text-sm
text-slate-500
"
                      >

                        {

                          formatDate(
                            payment.createdAt
                          )

                        }

                      </p>

                    </div>

                    {/* DOWNLOAD */}

                    <Button

                      size="sm"

                      onClick={()=>

                        handleDownload(
                          payment.id
                        )

                      }

                    >

                      <FaDownload/>

                      Invoice

                    </Button>

                  </div>

                }

              />

          ))}

        </div>

      )}

    </DashboardLayout>

  );

}