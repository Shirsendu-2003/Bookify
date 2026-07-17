import { useState, useEffect } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import ProviderProfile from "../../components/provider/ProviderProfile";
import ServiceCard from "../../components/provider/ServiceCard";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import {
  useProviderProfile,
  useProviderServices,
  useSubmitUpdateRequest,
usePendingUpdateRequest,
} from "../../hooks/useProviders";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

const providerTypes = [
  { label: "Select Service Type", value: "" },
  { label: "Electrician", value: "ELECTRICIAN" },
  { label: "Plumber", value: "PLUMBER" },
  { label: "Cleaner", value: "CLEANER" },
  { label: "Painter", value: "PAINTER" },
  { label: "AC Repair", value: "AC_REPAIR" },
  { label: "Carpenter", value: "CARPENTER" },
  { label: "Mechanic", value: "MECHANIC" },
  { label: "Appliance Repair", value: "APPLIANCE_REPAIR" },
];

export default function Profile() {

  // =============================
  // Fetch Profile
  // =============================
const {
    data,
    isLoading,
    refetch: refetchProfile,
} = useProviderProfile();

  const profile =
    data?.data?.data ||
    data?.data ||
    data ||
    null;

  // =============================
  // Fetch Services
  // =============================

  const {
    data: servicesData,
  } = useProviderServices(profile?.id);

  const services = servicesData || [];

  // =============================
  // Update Hook
  // =============================

  const submitUpdate =
    useSubmitUpdateRequest();

    const {
    data: pendingData,
    refetch: refetchPending,
} = usePendingUpdateRequest(profile?.id);

const pendingRequest =

    pendingData?.data?.data ||

    pendingData?.data ||

    null;

  // =============================
  // Form State
  // =============================

  const [form, setForm] = useState({
    name: "",
    providerType: "",
    experience: "",
    location: "",
    skills: "",
    hourlyRate: "",
    bio: "",
  });

  // Prevent resetting while editing
  const [initialized, setInitialized] =
    useState(false);

  // =============================
  // Populate Form
  // =============================

  useEffect(() => {

    if (profile && !initialized) {

      setForm({

        name: profile.name || "",

        providerType:
          profile.providerType || "",

        experience:
          profile.experience || "",

        location:
          profile.location || "",

        skills:
          profile.skills || "",

        hourlyRate:
          profile.hourlyRate || "",

        bio:
          profile.bio || "",

      });

      setInitialized(true);

    }

  }, [profile, initialized]);

  // =============================
  // Input Change
  // =============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // =============================
  // Submit
  // =============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!profile?.id) {

      showError(
        "Update Failed",
        "Provider profile not found."
      );

      return;

    }

    try {

      await submitUpdate.mutateAsync({
    providerId: profile.id,
    payload: form,
});

await refetchProfile();
await refetchPending();

showSuccess(
    "Submitted",
    "Your profile update request has been submitted. It will be updated after admin approval."
);

    } catch (error) {

      showError(

        "Update Failed",

        error?.response?.data?.message ||

        error.message ||

        "Something went wrong."

      );

    }

  };

  // =============================
  // Loading Screen
  // =============================

  if (isLoading) {

    return (

      <DashboardLayout>

        <div className="min-h-[70vh] flex items-center justify-center">

          <Loader />

        </div>

      </DashboardLayout>

    );

  }
    return (

    <DashboardLayout>

      {/* ==============================
            Page Header
      ============================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Professional Service Profile
          </h1>

          <p className="text-slate-500 mt-2">
            Manage your personal information, service details and professional profile.
          </p>

        </div>

        <Button
          type="submit"
          form="providerProfileForm"
          loading={submitUpdate.isPending}
          disabled={
        pendingRequest?.status === "PENDING"
    }
        >
          Save Changes
        </Button>

      </div>

      {/* ==============================
            Provider Summary Card
      ============================== */}

      {pendingRequest?.status === "PENDING" && (

<Card className="mb-6 border-yellow-300 bg-yellow-50">

    <div className="flex items-center gap-4">

        <div className="text-4xl">
            ⏳
        </div>

        <div>

            <h2 className="font-bold text-yellow-800">
                Profile Update Pending
            </h2>

            <p className="text-yellow-700">

                Your profile update request has been submitted.

                It will become visible after admin approval.

            </p>

        </div>

    </div>

</Card>

)}

      <ProviderProfile

        provider={{

          ...(profile || {}),

          services,

        }}

        reviews={profile?.reviews || []}

      />

      {/* ==============================
            Statistics Cards
      ============================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 mb-8">

        <Card>

          <h3 className="text-slate-500 text-sm">
            Service Type
          </h3>

          <p className="text-2xl font-bold mt-2">
            {profile?.providerType || "-"}
          </p>

        </Card>

        <Card>

          <h3 className="text-slate-500 text-sm">
            Experience
          </h3>

          <p className="text-2xl font-bold mt-2">
            {profile?.experience || "0 Years"}
          </p>

        </Card>

        <Card>

          <h3 className="text-slate-500 text-sm">
            Hourly Rate
          </h3>

          <p className="text-2xl font-bold mt-2">
            ₹ {profile?.hourlyRate || 0}
          </p>

        </Card>

        <Card>

          <h3 className="text-slate-500 text-sm">
            Services
          </h3>

          <p className="text-2xl font-bold mt-2">
            {services.length}
          </p>

        </Card>

      </div>

      {/* ==============================
            Main Grid
      ============================== */}

      <div className="grid xl:grid-cols-3 gap-8">

        {/* =====================================
                LEFT COLUMN
        ====================================== */}

        <div className="xl:col-span-2">

          <Card>

            <div className="mb-8">

              <h2 className="text-2xl font-bold">
                Edit Profile
              </h2>

              <p className="text-slate-500 mt-2">
                Keep your professional profile updated so customers can find and trust your services.
              </p>

            </div>

            <form

              id="providerProfileForm"

              onSubmit={handleSubmit}

              className="space-y-8"
            >
                          {/* =============================
                    Basic Information
              ============================= */}

              <div>

                <h3 className="text-xl font-semibold mb-5 border-b pb-2">
                  Basic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                  <Input
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    disabled={
    pendingRequest?.status === "PENDING"
}
                  />

                  <Select
                    label="Professional Service Type"
                    name="providerType"
                    value={form.providerType}
                    onChange={handleChange}
                    options={providerTypes}
                    disabled
                    
                  />

                  <Input
                    label="Experience"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="Example: 5 Years"
                    disabled={
    pendingRequest?.status === "PENDING"
}
                  />

                  <Input
                    label="Hourly Rate"
                    type="number"
                    name="hourlyRate"
                    value={form.hourlyRate}
                    onChange={handleChange}
                    placeholder="₹ Per Hour"
                    disabled={
    pendingRequest?.status === "PENDING"
}
                  />

                </div>

              </div>

              {/* =============================
                    Contact Information
              ============================= */}

              <div>

                <h3 className="text-xl font-semibold mb-5 border-b pb-2">
                  Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                  <Input
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City / Area"
                    disabled={
    pendingRequest?.status === "PENDING"
}
                  />

                  <Input
                    label="Skills"
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                    placeholder="Plumbing, Wiring, Installation"
                    disabled={
    pendingRequest?.status === "PENDING"
}
                  />

                </div>

              </div>

              {/* =============================
                    About Yourself
              ============================= */}

              <div>

                <h3 className="text-xl font-semibold mb-5 border-b pb-2">
                  About Yourself
                </h3>

                <TextArea
                  label="Professional Bio"
                  name="bio"
                  rows={6}
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Describe your experience, expertise and services..."
                  disabled={pendingRequest?.status === "PENDING"}
                />

              </div>

              {/* =============================
                    Account Information
              ============================= */}

              <div>

                <h3 className="text-xl font-semibold mb-5 border-b pb-2">
                  Account Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                  <Input
                    label="Email Address"
                    value={profile?.user?.email || ""}
                    disabled
                  />

                  <Input
                    label="Mobile Number"
                    value={profile?.user?.phone || profile?.mobile || ""}
                    disabled
                  />

                </div>

              </div>

              {/* =============================
                    Save Button
              ============================= */}

              <div className="flex justify-end pt-4">

                <Button

    type="submit"

    loading={submitUpdate.isPending}

    disabled={
        pendingRequest?.status === "PENDING"
    }

>
                  Save Profile
                </Button>

              </div>

            </form>

          </Card>

        </div>
  {/* =====================================
                RIGHT COLUMN
        ====================================== */}

        <div>

          <Card>

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold">
                  Services
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Services offered by this provider
                </p>

              </div>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {services.length}
              </span>

            </div>

            {services.length === 0 ? (

              <div className="text-center py-12">

                <div className="text-5xl mb-4">
                  🛠️
                </div>

                <h3 className="text-lg font-semibold text-slate-700">
                  No Services Available
                </h3>

                <p className="text-slate-500 mt-2">
                  You haven't added any services yet.
                </p>

              </div>

            ) : (

              <div className="space-y-5">

                {services.map((service) => (

                  <ServiceCard
                    key={service.id}
                    service={service}
                  />

                ))}

              </div>

            )}

          </Card>

          {/* =============================
                Provider Tips
          ============================= */}

          <Card className="mt-6">

            <h3 className="text-lg font-bold mb-4">
              Profile Tips
            </h3>

            <ul className="space-y-3 text-sm text-slate-600">

              <li>
                ✅ Keep your profile information up to date.
              </li>

              <li>
                ✅ Add all your professional skills.
              </li>

              <li>
                ✅ Set a reasonable hourly rate.
              </li>

              <li>
                ✅ Write a detailed bio to attract customers.
              </li>

              <li>
                ✅ Add more services to increase visibility.
              </li>

            </ul>

          </Card>

        </div>

      </div>

    </DashboardLayout>

  );

}