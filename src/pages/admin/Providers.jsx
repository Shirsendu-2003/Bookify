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

  useAdminProviders,

  useApproveProvider,

  useRejectProvider,

} from "../../hooks/useProviders";

import {

  formatDate,

} from "../../utils/formatter";

import {

  showSuccess,
  showError,

} from "../../utils/swal";

export default function Providers(){

  const [search,setSearch] =
    useState("");

  const [status,setStatus] =
    useState("");

  const {

    data,

    isLoading,

    error,

  } = useAdminProviders();

  const approveProvider =
    useApproveProvider();

  const rejectProvider =
    useRejectProvider();

  const providers = useMemo(() => {

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

  return list.filter((provider) => {

    const providerName =

      provider.name ||

      `${provider.user?.firstName || ""} ${provider.user?.lastName || ""}`;

    const matchesSearch =

      providerName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesStatus =

      !status ||

      provider.verificationStatus === status;

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

  const handleApprove =
    async(id)=>{

    try{

      await approveProvider
      .mutateAsync(id);

      showSuccess(

        "Approved",

        "Professional Service verified."

      );

    }catch(error){

      showError(

        "Approval Failed",

        error.message

      );

    }

  };

  const handleReject =
    async(id)=>{

    try{

      await rejectProvider
      .mutateAsync(id);

      showSuccess(

        "Rejected",

        "Professional Service rejected."

      );

    }catch(error){

      showError(

        "Rejection Failed",

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
Unable To Load Professional Service"

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

          Professional Services

        </h1>

        <p
          className="

mt-3
text-slate-500

"

        >

          Manage Technician
          onboarding and
          verification.

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
Search Professional Service..."

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
              "APPROVED",

              value:
              "APPROVED",

            },

            {

              label:
              "REJECTED",

              value:
              "REJECTED",

            },

          ]}

        />

      </div>

      {/* TABLE */}

      {

        providers.length===0

        ? (

          <EmptyState

            title="
No Professional Service Found"

            description="
Try different filters."

          />

        )

        : (

         <Card>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-200">
          <th className="text-left p-4">
            Professional Service
          </th>

          <th className="text-left p-4">
            Category
          </th>

          <th className="text-left p-4">
            Government ID
          </th>

          <th className="text-left p-4">
            Certificate
          </th>

          <th className="text-left p-4">
            Joined
          </th>

          <th className="text-left p-4">
            Status
          </th>

          <th className="text-right p-4">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {providers.map((provider) => (
          <tr
            key={provider.id}
            className="
            border-b
            border-slate-100
            "
          >
            {/* PROVIDER */}
            <td className="p-4">
              <h4 className="font-bold">
                {provider.name ||
                  `${provider.user?.firstName || ""}
                   ${provider.user?.lastName || ""}`}
              </h4>

              <p
                className="
                text-sm
                text-slate-500
                "
              >
                {provider.user?.email ||
                  provider.email ||
                  "-"}
              </p>
            </td>

            {/* CATEGORY */}
            <td className="p-4">
              {provider.providerType ||
                provider.category ||
                "-"}
            </td>

            {/* GOVERNMENT ID */}
            <td className="p-4">
  {provider.governmentIdUrl ? (
    <a
      href={`http://localhost:8080${provider.governmentIdUrl}`}
      target="_blank"
      rel="noreferrer"
      className="
      text-blue-600
      hover:underline
      "
    >
      View ID
    </a>
  ) : (
    "-"
  )}
</td>
            

            {/* CERTIFICATE */}
           <td className="p-4">
  {provider.certificateUrl ? (
    <a
      href={`http://localhost:8080${provider.certificateUrl}`}
      target="_blank"
      rel="noreferrer"
      className="
      text-blue-600
      hover:underline
      "
    >
      View Certificate
    </a>
  ) : (
    "-"
  )}
</td>

            {/* JOINED DATE */}
            <td className="p-4">
              {provider.createdAt
                ? formatDate(
                    provider.createdAt
                  )
                : "-"}
            </td>

            {/* STATUS */}
            <td className="p-4">
              <span
                className={`
                px-3
                py-1
                rounded-full
                text-xs
                font-medium

                ${
                  provider.verificationStatus ===
                  "APPROVED"
                    ? "bg-emerald-100 text-emerald-700"
                    : provider.verificationStatus ===
                      "PENDING"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
                }
              `}
              >
                {provider.verificationStatus}
              </span>
            </td>

            {/* ACTIONS */}
            <td className="p-4 text-right">
              {provider.verificationStatus ===
              "PENDING" ? (
                <div
                  className="
                  flex
                  justify-end
                  gap-3
                  "
                >
                  <Button
                    size="sm"
                    onClick={() =>
                      handleApprove(
                        provider.id
                      )
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      handleReject(
                        provider.id
                      )
                    }
                  >
                    Reject
                  </Button>
                </div>
              ) : (
                <span
                  className="
                  text-sm
                  text-slate-400
                  "
                >
                  Action Completed
                </span>
              )}
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