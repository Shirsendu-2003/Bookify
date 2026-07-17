import {
  useMemo,
  useState,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import Card from
"../../components/common/Card";

import Input from
"../../components/common/Input";

import Select from
"../../components/common/Select";

import Button from
"../../components/common/Button";

import Loader from
"../../components/common/Loader";

import EmptyState from
"../../components/common/EmptyState";

import {

  useBookings,

  useUpdateBookingStatus,

} from "../../hooks/useBookings";

import {

  formatDate,

} from "../../utils/formatter";

import {

  showSuccess,
  showError,

} from "../../utils/swal";

export default function Bookings(){

  const [search,setSearch] =
    useState("");

  const [status,setStatus] =
    useState("");

  const {

    data,

    isLoading,

    error,

  } = useBookings();

  const updateStatus =
    useUpdateBookingStatus();

  const bookings = useMemo(() => {

  const list =

    Array.isArray(data)
      ? data

      : Array.isArray(data?.data)
      ? data.data

      : Array.isArray(data?.data?.content)
      ? data.data.content

      : Array.isArray(data?.content)
      ? data.content

      : [];

  return list.filter((booking) => {

    const matchesSearch =

      (
        booking.customerName ||
        booking.customer?.firstName ||
        ""
      )

      .toLowerCase()

      .includes(
        search.toLowerCase()
      )

      ||

      (
        booking.providerName ||
        booking.provider?.name ||
        ""
      )

      .toLowerCase()

      .includes(
        search.toLowerCase()
      );

    const matchesStatus =

      !status ||

      booking.status === status;

    return (

      matchesSearch &&
      matchesStatus

    );

  });

}, [

  data,
  search,
  status,

]);

  const handleUpdate =
    async(

      id,

      status

    )=>{

    try{

      await updateStatus
      .mutateAsync({

        id,
        status,

      });

      showSuccess(

        "Updated",

        "Booking status updated."

      );

    }catch(error){

      showError(

        "Update Failed",

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

        <EmptyState

          title="
Unable To Load Bookings"

          description="
Please refresh."

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

          Bookings

        </h1>

        <p
          className="

mt-3
text-slate-500

"

        >

          Manage platform
          bookings and statuses.

        </p>

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
Search booking..."

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
              "PENDING",

              value:
              "PENDING",
            },

            {
              label:
              "CONFIRMED",

              value:
              "CONFIRMED",
            },

            {
              label:
              "COMPLETED",

              value:
              "COMPLETED",
            },

            {
              label:
              "CANCELLED",

              value:
              "CANCELLED",
            },

          ]}

        />

      </div>

      {/* TABLE */}

      {

        bookings.length===0

        ? (

          <EmptyState

            title="
No Bookings Found"

            description="
Try different filters."

          />

        )

        : (

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

                      Service

                    </th>

                    <th className="p-4 text-left">

                      Customer

                    </th>

                    <th className="p-4 text-left">

                      Professional Service

                    </th>

                    <th className="p-4 text-left">

                      Date

                    </th>

                    <th className="p-4 text-left">

                      Status

                    </th>

                    <th className="p-4 text-right">

                      Actions

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {bookings.map(

                    (booking)=>(

                    <tr

                      key={
                        booking.id
                      }

                      className="

border-b
border-slate-100

"

                    >

                      <td className="p-4">

                        {

 booking.serviceType

                        }

                      </td>

                      <td className="p-4">

                        {

booking.customerName

                        }

                      </td>

                      <td className="p-4">

                        {

booking.providerName

                        }

                      </td>

                      <td className="p-4">

                        {

formatDate(

booking.date

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

booking.status===

"COMPLETED"

?

"bg-emerald-100 text-emerald-700"

:

booking.status===

"CANCELLED"

?

"bg-red-100 text-red-700"

:

"bg-amber-100 text-amber-700"

}

`}
                        >

                          {

booking.status

                          }

                        </span>

                      </td>

                      <td
                        className="
p-4
text-right
"
                      >

                        <div
                          className="
flex
justify-end
gap-3
"
                        >

                          <Button

                            size="sm"

                            onClick={()=>

handleUpdate(

booking.id,

"COMPLETED"

)

                            }

                          >

                            Complete

                          </Button>

                          <Button

                            size="sm"

                            variant="
danger"

                            onClick={()=>

handleUpdate(

booking.id,

"CANCELLED"

)

                            }

                          >

                            Cancel

                          </Button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </Card>

        )

      }

    </DashboardLayout>

  );

}