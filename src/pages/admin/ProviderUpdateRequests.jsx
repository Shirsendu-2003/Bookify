import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import TextArea from "../../components/common/TextArea";

import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

import {
  usePendingProviderUpdates,
  useApproveProviderUpdate,
  useRejectProviderUpdate,
} from "../../hooks/useProviderUpdateRequests";

export default function ProviderUpdateRequests() {

  /* ============================
        QUERY
  ============================ */

  const {
    data,
    isLoading,
    refetch,
  } = usePendingProviderUpdates();

  const approveMutation =
    useApproveProviderUpdate();

  const rejectMutation =
    useRejectProviderUpdate();

  const requests =
    data?.data?.data ??
    data?.data ??
    [];

  /* ============================
        STATE
  ============================ */

  const [remarks, setRemarks] =
    useState({});

  const [loading, setLoading] =
    useState({

      approve: null,

      reject: null,

    });

  /* ============================
        REMARK CHANGE
  ============================ */

  const handleRemarkChange = (
    id,
    value
  ) => {

    setRemarks((prev) => ({

      ...prev,

      [id]: value,

    }));

  };

  /* ============================
        APPROVE
  ============================ */

  const approveRequest = async (
    request
  ) => {

    try {

      setLoading({

        approve: request.id,

        reject: null,

      });

      await approveMutation.mutateAsync({

        requestId: request.id,

        remarks:
          remarks[request.id] ||
          "Profile approved."

      });

      showSuccess(

        "Approved",

        "Provider profile updated successfully."

      );

      await refetch();

    } catch (error) {

      showError(

        "Approval Failed",

        error?.response?.data?.message ||

        error.message ||

        "Unable to approve provider."

      );

    } finally {

      setLoading({

        approve: null,

        reject: null,

      });

    }

  };

  /* ============================
        REJECT
  ============================ */

  const rejectRequest = async (
    request
  ) => {

    try {

      setLoading({

        approve: null,

        reject: request.id,

      });

      await rejectMutation.mutateAsync({

        requestId: request.id,

        remarks:
          remarks[request.id] ||
          "Profile update rejected."

      });

      showSuccess(

        "Rejected",

        "Provider profile update rejected."

      );

      await refetch();

    } catch (error) {

      showError(

        "Reject Failed",

        error?.response?.data?.message ||

        error.message ||

        "Unable to reject provider."

      );

    } finally {

      setLoading({

        approve: null,

        reject: null,

      });

    }

  };

  /* ============================
        LOADING
  ============================ */

  if (isLoading) {

    return (

      <DashboardLayout>

        <div className="min-h-[70vh] flex items-center justify-center">

          <Loader />

        </div>

      </DashboardLayout>

    );

  }

  /* ============================
        JSX STARTS HERE
  ============================ */

  return (

    <DashboardLayout>

      {/* ===========================================
                PAGE HEADER
=========================================== */}

<div className="mb-8">

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

        <div>

            <h1 className="text-3xl font-bold text-slate-800">

                Provider Profile Update Requests

            </h1>

            <p className="text-slate-500 mt-2">

                Review provider profile changes before they become visible
                to customers.

            </p>

        </div>

        <div className="mt-4 lg:mt-0">

            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3">

                <p className="text-sm text-slate-500">

                    Pending Requests

                </p>

                <h2 className="text-2xl font-bold text-blue-700">

                    {requests.length}

                </h2>

            </div>

        </div>

    </div>

</div>

{/* ===========================================
                EMPTY STATE
=========================================== */}

{requests.length === 0 ? (

    <Card>

        <div className="flex flex-col items-center justify-center py-20">

            <div className="text-7xl mb-6">

                🎉

            </div>

            <h2 className="text-3xl font-bold text-slate-700">

                No Pending Requests

            </h2>

            <p className="text-slate-500 mt-4 text-center max-w-xl">

                There are currently no provider profile update requests
                waiting for approval.

            </p>

        </div>

    </Card>

) : (

<div className="space-y-8">

    {requests.map((request) => (

        <Card
            key={request.id}
            className="overflow-hidden"
        >

            {/* ===========================================
                    PROVIDER HEADER
            =========================================== */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border-b pb-6">

                <div className="flex items-center gap-5">

                    <div
                        className="
                            w-20
                            h-20
                            rounded-full
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <FaUser
                            className="text-3xl text-blue-600"
                        />

                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">

                            {request.providerName}

                        </h2>

                        <div className="mt-2 flex flex-wrap gap-3">

                            <span
                                className="
                                    bg-blue-100
                                    text-blue-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                "
                            >

                                <FaBriefcase className="inline mr-2" />

                                {request.providerType}

                            </span>

                            <span
                                className="
                                    bg-green-100
                                    text-green-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                "
                            >

                                <FaMapMarkerAlt className="inline mr-2" />

                                {request.location}

                            </span>

                            <span
                                className="
                                    bg-yellow-100
                                    text-yellow-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                "
                            >

                                <FaMoneyBillWave className="inline mr-2" />

                                ₹ {request.hourlyRate}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="text-right">

                    <span
                        className="
                            bg-orange-100
                            text-orange-700
                            px-4
                            py-2
                            rounded-full
                            font-semibold
                        "
                    >

                        Pending Approval

                    </span>

                    <p className="text-sm text-slate-500 mt-3">

                        <FaClock className="inline mr-2" />

                        {new Date(
                            request.requestedAt
                        ).toLocaleString()}

                    </p>

                </div>

            </div>

           {/* ===========================================
        PROFILE COMPARISON
=========================================== */}

<div className="mt-8">

    <h3 className="text-xl font-bold mb-6">

        Compare Current Profile vs Requested Changes

    </h3>

    <div className="overflow-x-auto">

        <table className="min-w-full border rounded-xl overflow-hidden">

            <thead className="bg-slate-100">

                <tr>

                    <th className="px-5 py-4 text-left font-semibold">
                        Field
                    </th>

                    <th className="px-5 py-4 text-left font-semibold text-red-600">
                        Current
                    </th>

                    <th className="px-5 py-4 text-left font-semibold text-green-600">
                        Requested
                    </th>

                </tr>

            </thead>

            <tbody>

                <tr className="border-t">

                    <td className="px-5 py-4 font-medium">
                        Name
                    </td>

                    <td className="px-5 py-4">
                        {request.currentName}
                    </td>

                    <td
                        className={`px-5 py-4 ${
                            request.currentName !== request.name
                                ? "bg-green-50 font-semibold text-green-700"
                                : ""
                        }`}
                    >
                        {request.name}
                    </td>

                </tr>

                <tr className="border-t">

                    <td className="px-5 py-4 font-medium">
                        Service Type
                    </td>

                    <td className="px-5 py-4">
                        {request.currentProviderType}
                    </td>

                    <td
                        className={`px-5 py-4 ${
                            request.currentProviderType !== request.providerType
                                ? "bg-green-50 font-semibold text-green-700"
                                : ""
                        }`}
                    >
                        {request.providerType}
                    </td>

                </tr>

                <tr className="border-t">

                    <td className="px-5 py-4 font-medium">
                        Experience
                    </td>

                    <td className="px-5 py-4">
                        {request.currentExperience}
                    </td>

                    <td
                        className={`px-5 py-4 ${
                            request.currentExperience !== request.experience
                                ? "bg-green-50 font-semibold text-green-700"
                                : ""
                        }`}
                    >
                        {request.experience}
                    </td>

                </tr>

                <tr className="border-t">

                    <td className="px-5 py-4 font-medium">
                        Location
                    </td>

                    <td className="px-5 py-4">
                        {request.currentLocation}
                    </td>

                    <td
                        className={`px-5 py-4 ${
                            request.currentLocation !== request.location
                                ? "bg-green-50 font-semibold text-green-700"
                                : ""
                        }`}
                    >
                        {request.location}
                    </td>

                </tr>

                <tr className="border-t">

                    <td className="px-5 py-4 font-medium">
                        Skills
                    </td>

                    <td className="px-5 py-4 whitespace-pre-wrap">
                        {request.currentSkills}
                    </td>

                    <td
                        className={`px-5 py-4 whitespace-pre-wrap ${
                            request.currentSkills !== request.skills
                                ? "bg-green-50 font-semibold text-green-700"
                                : ""
                        }`}
                    >
                        {request.skills}
                    </td>

                </tr>

                <tr className="border-t">

                    <td className="px-5 py-4 font-medium">
                        Hourly Rate
                    </td>

                    <td className="px-5 py-4">
                        ₹ {request.currentHourlyRate}
                    </td>

                    <td
                        className={`px-5 py-4 ${
                            request.currentHourlyRate !== request.hourlyRate
                                ? "bg-green-50 font-semibold text-green-700"
                                : ""
                        }`}
                    >
                        ₹ {request.hourlyRate}
                    </td>

                </tr>

                <tr className="border-t">

                    <td className="px-5 py-4 font-medium align-top">
                        Bio
                    </td>

                    <td className="px-5 py-4 whitespace-pre-wrap">
                        {request.currentBio}
                    </td>

                    <td
                        className={`px-5 py-4 whitespace-pre-wrap ${
                            request.currentBio !== request.bio
                                ? "bg-green-50 font-semibold text-green-700"
                                : ""
                        }`}
                    >
                        {request.bio}
                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>

{/* ===========================================
        ADMIN REMARKS
=========================================== */}

<div className="mt-8">

    <h3 className="text-lg font-bold mb-4">

        Admin Remarks

    </h3>

    <TextArea
        rows={4}
        placeholder="Enter approval/rejection remarks..."
        value={remarks[request.id] || ""}
        onChange={(e) =>
            handleRemarkChange(
                request.id,
                e.target.value
            )
        }
    />

</div>

{/* ===========================================
        ACTION BUTTONS
=========================================== */}

<div className="mt-8 flex flex-col md:flex-row gap-4 justify-end">

    <Button
        variant="danger"
        loading={
            loading.reject === request.id
        }
        disabled={
            loading.approve === request.id ||
            loading.reject === request.id
        }
        onClick={() =>
            rejectRequest(request)
        }
    >

        <FaTimesCircle className="mr-2" />

        Reject Request

    </Button>

    <Button
        loading={
            loading.approve === request.id
        }
        disabled={
            loading.approve === request.id ||
            loading.reject === request.id
        }
        onClick={() =>
            approveRequest(request)
        }
    >

        <FaCheckCircle className="mr-2" />

        Approve Request

    </Button>

</div>

        </Card>

    ))}

</div>

)}

    </DashboardLayout>

  );

}