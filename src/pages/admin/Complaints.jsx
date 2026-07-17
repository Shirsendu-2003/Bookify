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

  useComplaints,

  useResolveComplaint,

  useCloseComplaint,

} from "../../hooks/useDashboard";

import {
  formatDate,
} from "../../utils/formatter";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function Complaints(){

  const [search,setSearch] =
    useState("");

  const [status,setStatus] =
    useState("");

  const {

    data,
    isLoading,
    error,

  } = useComplaints();

  const resolveComplaint =
    useResolveComplaint();

  const closeComplaint =
    useCloseComplaint();

  const complaints =
    useMemo(()=>{

      const list =

        data?.data?.content ||

        data?.content ||

        data?.data ||

        data ||

        [];

      if(!Array.isArray(list))
        return [];

      return list.filter(

        (item)=>{

          const matchesSearch =

            (
              item.subject ||
              ""
            )

            .toLowerCase()

            .includes(

              search
                .toLowerCase()

            );

          const matchesStatus =

            !status ||

            item.status===status;

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

  const handleResolve =
    async(id)=>{

      try{

        await resolveComplaint
          .mutateAsync(id);

        showSuccess(

          "Resolved",

          "Complaint resolved."

        );

      }catch(error){

        showError(

          "Failed",

          error?.response
            ?.data?.message ||

          error.message

        );

      }

    };

  const handleClose =
    async(id)=>{

      try{

        await closeComplaint
          .mutateAsync(id);

        showSuccess(

          "Closed",

          "Complaint closed."

        );

      }catch(error){

        showError(

          "Failed",

          error?.response
            ?.data?.message ||

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
Unable To Load Complaints"

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

          Complaints

        </h1>

        <p
          className="
mt-3
text-slate-500
"
        >

          Handle disputes,
          complaints and
          support tickets.

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
Search complaint..."

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
              label:"All Status",
              value:"",
            },

            {
              label:"OPEN",
              value:"OPEN",
            },

            {
              label:"RESOLVED",
              value:"RESOLVED",
            },

            {
              label:"CLOSED",
              value:"CLOSED",
            },

          ]}

        />

      </div>

      {/* TABLE */}

      {

        complaints.length===0

        ?(

          <EmptyState

            title="
No Complaints"

            description="
Tickets will appear here."

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
                      Subject
                    </th>

                    <th className="p-4 text-left">
                      User
                    </th>

                    <th className="p-4 text-left">
                      Priority
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

                  {

                    complaints.map(

                      (item)=>(

                        <tr

                          key={
                            item.id
                          }

                          className="
border-b
border-slate-100
"
                        >

                          <td className="p-4">

                            <h4
                              className="
font-bold
"
                            >

                              {
                                item.subject
                              }

                            </h4>

                            <p
                              className="
text-sm
text-slate-500
"
                            >

                              {
                                item.description
                              }

                            </p>

                          </td>

                          <td className="p-4">

                            {

                              item.userName ||

                              "Unknown"

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

item.priority===

"HIGH"

?

"bg-red-100 text-red-700"

:

item.priority===

"MEDIUM"

?

"bg-amber-100 text-amber-700"

:

"bg-blue-100 text-blue-700"

}

`}
                            >

                              {
                                item.priority
                              }

                            </span>

                          </td>

                          <td className="p-4">

                            {

                              formatDate(
                                item.createdAt
                              )

                            }

                          </td>

                          <td className="p-4">

                            {
                              item.status
                            }

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

                              {

                                item.status
                                !=="RESOLVED"

                                &&(

                                  <Button

                                    size="sm"

                                    onClick={()=>

                                      handleResolve(
                                        item.id
                                      )

                                    }

                                  >

                                    Resolve

                                  </Button>

                                )

                              }

                              {

                                item.status
                                !=="CLOSED"

                                &&(

                                  <Button

                                    size="sm"

                                    variant="
secondary"

                                    onClick={()=>

                                      handleClose(
                                        item.id
                                      )

                                    }

                                  >

                                    Close

                                  </Button>

                                )

                              }

                            </div>

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