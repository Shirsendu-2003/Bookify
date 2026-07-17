import {
  FaCreditCard,
  FaUniversity,
  FaWallet,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUndo,
} from "react-icons/fa";

import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";

const statusVariant = {

  SUCCESS:"success",

  PENDING:"warning",

  FAILED:"danger",

  REFUNDED:"info",

};

const methodIcons = {

  CARD:<FaCreditCard/>,

  UPI:<FaWallet/>,

  NET_BANKING:<FaUniversity/>,

  COD:<FaWallet/>,

};

export default function PaymentCard({

  payment,

  role="CUSTOMER",

  onPay,

}) {

  const statusIcon = {

    SUCCESS:<FaCheckCircle/>,

    PENDING:<FaClock/>,

    FAILED:<FaTimesCircle/>,

    REFUNDED:<FaUndo/>,

  };

  return (

    <Card className="overflow-hidden">

      {/* HEADER */}

      <div
        className="

flex
flex-col
lg:flex-row
lg:items-center
lg:justify-between
gap-5
mb-8

"
      >

        <div>

          <h2
            className="

text-xl
font-bold
text-slate-900

"
          >

            Payment Summary

          </h2>

          <p
            className="

mt-2
text-slate-500

"
          >

            Transaction ID:

            {" "}

            #

            {payment.transactionId}

          </p>

        </div>

        <Badge
          variant={
            statusVariant[
              payment.status
            ] || "warning"
          }
        >

          {payment.status}

        </Badge>

      </div>

      {/* BODY */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT */}

        <div className="space-y-6">

          <div className="flex gap-4">

            <div
              className="

text-blue-600
text-xl
mt-1

"
            >

              {
                methodIcons[
                  payment.paymentMethod
                ] || <FaWallet/>
              }

            </div>

            <div>

              <p className="text-sm text-slate-500">

                Payment Method

              </p>

              <h4 className="font-semibold">

                {payment.paymentMethod}

              </h4>

            </div>

          </div>

          <div className="flex gap-4">

            <div
              className="

text-green-600
text-xl
mt-1

"
            >

              {
                statusIcon[
                  payment.status
                ]
              }

            </div>

            <div>

              <p className="text-sm text-slate-500">

                Payment Status

              </p>

              <h4 className="font-semibold">

                {payment.status}

              </h4>

            </div>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Booking

            </p>

            <h4
              className="

mt-2
font-semibold

"
            >

              Booking #

              {" "}

              {payment.bookingId}

            </h4>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          <div>

            <p className="text-sm text-slate-500">

              Amount Paid

            </p>

            <h3
              className="

mt-2
text-4xl
font-extrabold
text-slate-900

"
            >

              ₹

              {payment.amount}

            </h3>

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Payment Date

            </p>

            <h4
              className="

mt-2
font-semibold

"
            >

              {

                payment.createdAt

                ?

                new Date(

                  payment.createdAt

                ).toLocaleString()

                :

                "N/A"

              }

            </h4>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div
        className="

mt-8
pt-6
border-t

flex
flex-wrap
gap-4

"
      >

        {

          payment.status==="PENDING"

          &&

          role==="CUSTOMER"

          &&(

            <Button
              onClick={()=>

                onPay?.(payment)

              }
            >

              Pay Now

            </Button>

          )

        }

      </div>

    </Card>

  );

}