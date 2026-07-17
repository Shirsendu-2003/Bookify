import { useState, useMemo } from "react";

import {
  FaBriefcase,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaCreditCard,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardCheck,
  FaTasks,
  FaLocationArrow,
  FaCamera ,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

import bookingService from "../../services/bookingService";

import { useAuth } from "../../hooks/useAuth";

import {
  useProviderBookings,
  useAcceptBooking,
  useRejectBooking,
  useFinishWork,
  useVerifyStartOtp,
  useVerifyCompletionOtp,
} from "../../hooks/useBookings";

import { formatDate } from "../../utils/formatter";

import { showSuccess, showError } from "../../utils/swal";

export default function Jobs() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const { user } = useAuth();

  const providerId = user?.providerId;

  const { data, isLoading, error } = useProviderBookings(providerId, {
    enabled: !!providerId,
  });

  const [startOtp, setStartOtp] = useState({});

  const [completionOtp, setCompletionOtp] = useState({});

  const [proofImage, setProofImage] = useState({});
const [proofUploaded, setProofUploaded] = useState({});
const [uploadingProof, setUploadingProof] = useState({});

  const [finishedJobs, setFinishedJobs] = useState({});

  const [loadingBookingId, setLoadingBookingId] = useState(null);

  const acceptJob = useAcceptBooking();

  const rejectJob = useRejectBooking();

  const finishWork = useFinishWork();

  const verifyStartOtp = useVerifyStartOtp();

  const verifyCompletionOtp = useVerifyCompletionOtp();

  const filteredJobs = useMemo(() => {
    const list = data?.data?.content || data?.content || [];

    return list.filter((job) => {
      const matchesSearch = (job.customerName || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = !status || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  // Current Jobs
const currentJobs = filteredJobs.filter((job) => {
  // Rejected and Cancelled always go to history
  if (["REJECTED", "CANCELLED"].includes(job.status)) {
    return false;
  }

  // Completed but payment is still pending
  if (
    job.status === "COMPLETED" &&
    job.paymentStatus !== "SUCCESS"
  ) {
    return true;
  }

  // Pending, Accepted and In Progress
  return job.status !== "COMPLETED";
});

// Job History
const historyJobs = filteredJobs.filter((job) => {
  if (["REJECTED", "CANCELLED"].includes(job.status)) {
    return true;
  }

  return (
    job.status === "COMPLETED" &&
    job.paymentStatus === "SUCCESS"
  );
});

  const handleAccept = async (id) => {
    try {
      setLoadingBookingId(id);

      await acceptJob.mutateAsync(id);

      showSuccess("Accepted", "Job accepted.");
    } catch (error) {
      showError("Failed", error.message);
    } finally {
        setLoadingBookingId(null);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectJob.mutateAsync(id);

      showSuccess("Rejected", "Job rejected.");
    } catch (error) {
      showError("Failed", error.message);
    }
  };

  const handleFinishWork = async (bookingId) => {
    try {
      await finishWork.mutateAsync(bookingId);

      setFinishedJobs((prev) => ({
        ...prev,
        [bookingId]: true,
      }));

      showSuccess("Success", "Work finished. Completion OTP sent to customer.");
    } catch (error) {
      showError("Failed", error?.response?.data?.message || error.message);
    }
  };

  const handleVerifyStartOtp = async (bookingId) => {
    try {
      await verifyStartOtp.mutateAsync({
        bookingId,

        otp: startOtp[bookingId],
      });

      showSuccess("Success", "OTP Verified. Service Started.");
    } catch (error) {
      showError(
        "OTP Verification Failed",
        error?.response?.data?.message || error.message,
      );
    }
  };
  const handleVerifyCompletionOtp = async (bookingId) => {
    try {
      await verifyCompletionOtp.mutateAsync({
        bookingId,

        otp: completionOtp[bookingId],
      });

      showSuccess("Success", "Booking completed successfully.");
    } catch (error) {
      showError(
        "Verification Failed",
        error?.response?.data?.message || error.message,
      );
    }
  };

  const handleTrackCustomer = (job) => {
    if (!job.customerLatitude || !job.customerLongitude) {
      showError("Location Missing", "Customer location unavailable");

      return;
    }

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${job.customerLatitude},${job.customerLongitude}`,

      "_blank",
    );
  };

 const handleUploadProof = async (job) => {

    const bookingId = job.id;

    const file = proofImage[bookingId];

    if (!file) {
        showError("Required", "Please capture a work completion photo.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {

            try {

                setUploadingProof((prev) => ({
                    ...prev,
                    [bookingId]: true,
                }));

                const formData = new FormData();

                formData.append("photo", file);
                formData.append("latitude", position.coords.latitude);
                formData.append("longitude", position.coords.longitude);
                formData.append("address", job.address);

                await bookingService.uploadProof(
                    bookingId,
                    formData
                );

                setProofUploaded((prev) => ({
                    ...prev,
                    [bookingId]: true,
                }));

                showSuccess(
                    "Success",
                    "Proof uploaded successfully."
                );

                // Refresh bookings here if your hook exposes refetch()
                // await refetch();

            } catch (error) {

                showError(
                    "Upload Failed",
                    error?.response?.data?.message || error.message
                );

            } finally {

                setUploadingProof((prev) => ({
                    ...prev,
                    [bookingId]: false,
                }));

            }
        },
        () => {
            showError(
                "Location Error",
                "Unable to fetch current location."
            );
        }
    );
};

  if (isLoading) {
    return (
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

  if (error) {
    return (
      <DashboardLayout>
        <EmptyState title="Unable To Load Jobs" description="Please refresh." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1
          className="
text-4xl
font-bold
flex
items-center
gap-3
"
        >
          <FaBriefcase
            className="
text-blue-600
"
          />
          Jobs
        </h1>

        <p
          className="
mt-3
text-slate-500
"
        >
          Manage assigned service requests.
        </p>
      </div>

      <div
        className="
grid
lg:grid-cols-2
gap-6
mb-10
"
      >
        <Input
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            {
              label: "All Status",
              value: "",
            },
            {
              label: "PENDING",
              value: "PENDING",
            },
            {
              label: "ACCEPTED",
              value: "ACCEPTED",
            },
            {
              label: "IN_PROGRESS",
              value: "IN_PROGRESS",
            },
            {
              label: "COMPLETED",
              value: "COMPLETED",
            },
            {
              label: "REJECTED",
              value: "REJECTED",
            },
            {
              label: "CANCELLED",
              value: "CANCELLED",
            },
          ]}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <EmptyState title="No Jobs Found" description="No bookings assigned." />
      ) : (
        <>
          {/* CURRENT JOBS */}

          <div className="mb-12">
            <h2
              className="
    text-2xl
    font-bold
    mb-6
    text-slate-900
    "
            >
              Current Jobs
            </h2>

            {currentJobs.length === 0 ? (
              <EmptyState
                title="No Current Jobs"
                description="There are no active jobs at the moment."
              />
            ) : (
              <div className="space-y-8">
                {currentJobs.map((job) => (
                  <Card key={job.id}>
                    <div
                      className="
flex
flex-col
xl:flex-row
justify-between
gap-8
"
                    >
                      <div className="space-y-4">
                        <h3
                          className="
text-xl
font-bold
"
                        >
                          {job.serviceType}
                        </h3>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaUser />
                          Customer:
                          {job.customerName}
                        </p>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaCalendarAlt />

                          {formatDate(job.bookingDate)}
                        </p>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaClock />
                          {job.startTime}-{job.endTime}
                        </p>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaMoneyBillWave />₹{job.amount}
                        </p>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaCreditCard />

                          <span
                            className={`
inline-block
px-3
py-1
rounded-full
text-sm
font-semibold

${
  job.paymentStatus === "SUCCESS"
    ? "bg-green-100 text-green-700"
    : job.paymentStatus === "FAILED"
      ? "bg-red-100 text-red-700"
      : job.paymentStatus === "CANCELLED"
        ? "bg-gray-100 text-gray-700"
        : "bg-yellow-100 text-yellow-700"
}
`}
                          >
                            {job.paymentStatus || "PENDING"}
                          </span>
                        </p>

                        <div
                          className="
  bg-slate-50
  border
  rounded-xl
  p-4
  "
                        >
                          <div
                            className="
    flex
    items-center
    gap-2
    font-medium
    text-slate-700
    mb-2
    "
                          >
                            <FaMapMarkerAlt />
                            Service Address
                          </div>

                          <p className="text-slate-600">{job.address}</p>

                          <p className="text-slate-500 text-sm">
                            {job.city},{job.state},{job.country}
                          </p>
                        </div>

                        {job.customerLatitude && (
                          <div
                            className="
    bg-blue-50
    border
    border-blue-100
    rounded-xl
    p-3
    "
                          >
                            <p className="font-medium text-blue-700">
                              GPS Location Available
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                              Latitude:
                              {job.customerLatitude}
                            </p>

                            <p className="text-xs text-slate-500">
                              Longitude:
                              {job.customerLongitude}
                            </p>
                          </div>
                        )}

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaFileAlt />

                          {job.description}
                        </p>

                        <div>
                          <span
                            className="
px-3
py-1
rounded-full
text-sm
bg-blue-100
text-blue-700
inline-flex
items-center
gap-2
"
                          >
                            <FaTasks />

                            {job.status}
                          </span>
                        </div>
                      </div>

                      <div
                        className="
  flex
  flex-col
  gap-4
  min-w-[280px]
  "
                      >
                        {/* STATUS */}

                        <div>
                          <span
                            className={`
      px-4
      py-2
      rounded-full
      text-sm
      font-semibold
      inline-flex
      items-center
      gap-2

      ${
        job.status === "PENDING"
          ? "bg-yellow-100 text-yellow-700"
          : job.status === "ACCEPTED"
            ? "bg-blue-100 text-blue-700"
            : job.status === "IN_PROGRESS"
              ? "bg-purple-100 text-purple-700"
              : job.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
      }
      `}
                          >
                            <FaTasks />
                            {job.status}
                          </span>
                        </div>

                        {/* TRACK CUSTOMER */}

                        <Button
                          variant="secondary"
                          onClick={() => handleTrackCustomer(job)}
                          className="
    w-full
    flex
    items-center
    justify-center
    "
                        >
                          <FaLocationArrow className="mr-2" />
                          Navigate Customer
                        </Button>

                        {/* PENDING */}

                        {job.status === "PENDING" && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAccept(job.id)}
                              loading={loadingBookingId === job.id}
                              disabled={loadingBookingId === job.id}
                              className="flex-1"
                            >
                              <FaCheckCircle className="mr-2" />
                              Accept
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => handleReject(job.id)}
                              className="flex-1"
                            >
                              <FaTimesCircle className="mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}

                        {/* ACCEPTED */}

                        {job.status === "ACCEPTED" && (
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Enter Start OTP"
                              value={startOtp[job.id] || ""}
                              onChange={(e) =>
                                setStartOtp((prev) => ({
                                  ...prev,
                                  [job.id]: e.target.value,
                                }))
                              }
                              className="
        w-full
        border
        rounded-xl
        px-3
        py-2
        "
                            />

                            <Button
                              className="w-full"
                              onClick={() => handleVerifyStartOtp(job.id)}
                            >
                              Verify Start OTP
                            </Button>
                          </div>
                        )}

                        {/* IN PROGRESS */}

                        {job.status === "IN_PROGRESS" && (
                          <div className="space-y-3">
                            {!finishedJobs[job.id] ? (
                              <div className="space-y-3">

    <input
    id={`proof-${job.id}`}
    type="file"
    accept="image/*"
    capture="environment"
    hidden
    onChange={(e) =>
        setProofImage((prev) => ({
            ...prev,
            [job.id]: e.target.files[0],
        }))
    }
/>

<label
    htmlFor={`proof-${job.id}`}
    className="
        cursor-pointer
        bg-blue-600
        hover:bg-blue-700
        text-white
        rounded-xl
        px-4
        py-3
        flex
        items-center
        justify-center
        gap-2
        transition
    "
>
    <FaCamera />
    Capture Work Proof
</label>

{proofImage[job.id] && (
    <img
        src={URL.createObjectURL(proofImage[job.id])}
        alt="Work Proof Preview"
        className="w-full h-48 object-cover rounded-xl border"
    />
)}

{!job.proofImage ? (
    <Button
        className="w-full"
        loading={uploadingProof[job.id]}
        onClick={() => handleUploadProof(job)}
    >
        <FaCamera className="mr-2" />
        Upload Proof
    </Button>
) : (
    <>
        <div className="rounded-xl bg-green-100 text-green-700 p-3 text-center">
            ✓ Proof Uploaded Successfully
        </div>

        <img
            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${job.proofImage}`}
            alt="Uploaded Proof"
            className="w-full h-48 object-cover rounded-xl border"
        />

        <Button
            variant="success"
            className="w-full"
            onClick={() => handleFinishWork(job.id)}
        >
            Finish Work
        </Button>
    </>
)}

</div>
                            ) : (
                              <>
                                <input
                                  type="text"
                                  placeholder="Enter Completion OTP"
                                  value={completionOtp[job.id] || ""}
                                  onChange={(e) =>
                                    setCompletionOtp((prev) => ({
                                      ...prev,
                                      [job.id]: e.target.value,
                                    }))
                                  }
                                  className="
            w-full
            border
            rounded-xl
            px-3
            py-2
            "
                                />

                                <Button
                                  variant="success"
                                  className="w-full"
                                  onClick={() =>
                                    handleVerifyCompletionOtp(job.id)
                                  }
                                >
                                  Verify Completion OTP
                                </Button>
                              </>
                            )}
                          </div>
                        )}

                        {/* COMPLETED */}

                        {job.status === "COMPLETED" && (
                          <Button variant="success" disabled className="w-full">
                            <FaCheckCircle className="mr-2" />
                            Completed
                          </Button>
                        )}

                        {/* REJECTED */}

                        {job.status === "REJECTED" && (
                          <Button variant="danger" disabled className="w-full">
                            Rejected
                          </Button>
                        )}

                        {/* CANCELLED */}

                        {job.status === "CANCELLED" && (
                          <Button variant="danger" disabled className="w-full">
                            Cancelled
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* JOB HISTORY */}

          <div>
            <h2
              className="
    text-2xl
    font-bold
    mb-6
    text-slate-900
    "
            >
              Job History
            </h2>

            {historyJobs.length === 0 ? (
              <EmptyState
                title="No Job History"
                description="Completed, rejected and cancelled jobs will appear here."
              />
            ) : (
              <div className="space-y-8">
                {historyJobs.map((job) => (
                  <Card key={job.id}>
                    <div
                      className="
flex
flex-col
xl:flex-row
justify-between
gap-8
"
                    >
                      <div className="space-y-4">
                        <h3
                          className="
text-xl
font-bold
"
                        >
                          {job.serviceType}
                        </h3>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaUser />
                          Customer:
                          {job.customerName}
                        </p>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaCalendarAlt />

                          {formatDate(job.bookingDate)}
                        </p>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaClock />
                          {job.startTime}-{job.endTime}
                        </p>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaMoneyBillWave />₹{job.amount}
                        </p>

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaCreditCard />

                          <span
                            className={`
inline-block
px-3
py-1
rounded-full
text-sm
font-semibold

${
  job.paymentStatus === "SUCCESS"
    ? "bg-green-100 text-green-700"
    : job.paymentStatus === "FAILED"
      ? "bg-red-100 text-red-700"
      : job.paymentStatus === "CANCELLED"
        ? "bg-gray-100 text-gray-700"
        : "bg-yellow-100 text-yellow-700"
}
`}
                          >
                            {job.paymentStatus || "PENDING"}
                          </span>
                        </p>

                        <div
                          className="
  bg-slate-50
  border
  rounded-xl
  p-4
  "
                        >
                          <div
                            className="
    flex
    items-center
    gap-2
    font-medium
    text-slate-700
    mb-2
    "
                          >
                            <FaMapMarkerAlt />
                            Service Address
                          </div>

                          <p className="text-slate-600">{job.address}</p>

                          <p className="text-slate-500 text-sm">
                            {job.city},{job.state},{job.country}
                          </p>
                        </div>

                        {job.customerLatitude && (
                          <div
                            className="
    bg-blue-50
    border
    border-blue-100
    rounded-xl
    p-3
    "
                          >
                            <p className="font-medium text-blue-700">
                              GPS Location Available
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                              Latitude:
                              {job.customerLatitude}
                            </p>

                            <p className="text-xs text-slate-500">
                              Longitude:
                              {job.customerLongitude}
                            </p>
                          </div>
                        )}

                        <p className="text-slate-500 flex items-center gap-2">
                          <FaFileAlt />

                          {job.description}
                        </p>

                        <div>
                          <span
                            className="
px-3
py-1
rounded-full
text-sm
bg-blue-100
text-blue-700
inline-flex
items-center
gap-2
"
                          >
                            <FaTasks />

                            {job.status}
                          </span>
                        </div>
                      </div>

                      <div
                        className="
  flex
  flex-col
  gap-4
  min-w-[280px]
  "
                      >
                        {/* STATUS */}

                        <div>
                          <span
                            className={`
      px-4
      py-2
      rounded-full
      text-sm
      font-semibold
      inline-flex
      items-center
      gap-2

      ${
        job.status === "PENDING"
          ? "bg-yellow-100 text-yellow-700"
          : job.status === "ACCEPTED"
            ? "bg-blue-100 text-blue-700"
            : job.status === "IN_PROGRESS"
              ? "bg-purple-100 text-purple-700"
              : job.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
      }
      `}
                          >
                            <FaTasks />
                            {job.status}
                          </span>
                        </div>

                        {/* TRACK CUSTOMER */}

                        <Button
                          variant="secondary"
                          onClick={() => handleTrackCustomer(job)}
                          className="
    w-full
    flex
    items-center
    justify-center
    "
                        >
                          <FaLocationArrow className="mr-2" />
                          Navigate Customer
                        </Button>

                        {/* PENDING */}

                        {job.status === "PENDING" && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAccept(job.id)}
                              className="flex-1"
                            >
                              <FaCheckCircle className="mr-2" />
                              Accept
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => handleReject(job.id)}
                              className="flex-1"
                            >
                              <FaTimesCircle className="mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}

                        {/* ACCEPTED */}

                        {job.status === "ACCEPTED" && (
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Enter Start OTP"
                              value={startOtp[job.id] || ""}
                              onChange={(e) =>
                                setStartOtp((prev) => ({
                                  ...prev,
                                  [job.id]: e.target.value,
                                }))
                              }
                              className="
        w-full
        border
        rounded-xl
        px-3
        py-2
        "
                            />

                            <Button
                              className="w-full"
                              onClick={() => handleVerifyStartOtp(job.id)}
                            >
                              Verify Start OTP
                            </Button>
                          </div>
                        )}

                        {/* IN PROGRESS */}

                        {job.status === "IN_PROGRESS" && (
                          <div className="space-y-3">
                            {!finishedJobs[job.id] ? (
                              <Button
                                variant="success"
                                className="w-full"
                                onClick={() => handleFinishWork(job.id)}
                              >
                                Finish Work
                              </Button>
                            ) : (
                              <>
                                <input
                                  type="text"
                                  placeholder="Enter Completion OTP"
                                  value={completionOtp[job.id] || ""}
                                  onChange={(e) =>
                                    setCompletionOtp((prev) => ({
                                      ...prev,
                                      [job.id]: e.target.value,
                                    }))
                                  }
                                  className="
            w-full
            border
            rounded-xl
            px-3
            py-2
            "
                                />

                                <Button
                                  variant="success"
                                  className="w-full"
                                  onClick={() =>
                                    handleVerifyCompletionOtp(job.id)
                                  }
                                >
                                  Verify Completion OTP
                                </Button>
                              </>
                            )}
                          </div>
                        )}

                        {/* COMPLETED */}

                        {job.status === "COMPLETED" && (
                          <Button variant="success" disabled className="w-full">
                            <FaCheckCircle className="mr-2" />
                            Completed
                          </Button>
                        )}

                        {/* REJECTED */}

                        {job.status === "REJECTED" && (
                          <Button variant="danger" disabled className="w-full">
                            Rejected
                          </Button>
                        )}

                        {/* CANCELLED */}

                        {job.status === "CANCELLED" && (
                          <Button variant="danger" disabled className="w-full">
                            Cancelled
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
