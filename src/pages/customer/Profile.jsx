import {
  useState,
  useEffect,
} from "react";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import Card
from "../../components/common/Card";

import Input
from "../../components/common/Input";

import Select
from "../../components/common/Select";

import Button
from "../../components/common/Button";

import Loader
from "../../components/common/Loader";

import {
  useUserContext,
} from "../../context/UserContext";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function Profile(){

  const {

    profile,
    loading,
    preferences,
    updateProfile,
    updatePreferences,

  } = useUserContext();

  const [form, setForm] = useState({

  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",

});

  useEffect(() => {

  if (profile) {

    setForm({

      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",

      address: profile.address || "",
      city: profile.city || "",
      state: profile.state || "",
      country: profile.country || "",
      zipCode: profile.zipCode || "",

    });

  }

}, [profile]);

  const handleChange =
    (e)=>{

      setForm({

        ...form,

        [e.target.name]:
        e.target.value,

      });

    };

  const handleSubmit =
    async(e)=>{

      e.preventDefault();

      try{

        await updateProfile(
          form
        );

        showSuccess(
          "Success",
          "Profile updated."
        );

      }catch(error){

        showError(
          "Failed",
          error.message
        );

      }

    };

  if(loading){

    return(

      <DashboardLayout>

        <div
        className="
        min-h-[70vh]
        flex
        justify-center
        items-center
        "
        >

          <Loader/>

        </div>

      </DashboardLayout>

    );

  }

  return(

    <DashboardLayout>

      <div className="mb-10">

        <h1
        className="
        text-4xl
        font-bold
        ">

          Customer Profile

        </h1>

        <p
        className="
        mt-3
        text-slate-500
        ">

          Manage your account
          settings and profile.

        </p>

      </div>

      <div
      className="
      grid
      xl:grid-cols-3
      gap-8
      ">

        {/* LEFT */}

        <div className="space-y-8">

          <Card>

            <div
            className="
            flex
            flex-col
            items-center
            text-center
            "
            >

              <div
              className="
              w-28
              h-28
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              mb-5
              "
              >

                {
                  form.firstName
                  ?.charAt(0)
                }

              </div>

              <h2
              className="
              text-2xl
              font-bold
              "
              >

                {
                  form.firstName
                }

                {" "}

                {
                  form.lastName
                }

              </h2>

              <p
              className="
              text-slate-500
              mt-2
              "
              >

                {
                  form.email
                }

              </p>

            </div>

          </Card>

          <Card>

            <h2
            className="
            text-xl
            font-bold
            mb-5
            "
            >

              Preferences

            </h2>

            <div className="space-y-5">

             <Select
  label="Language"

  value={
    preferences?.language
    || "en"
  }

  options={[
    {
      label:"English",
      value:"en",
    },
    {
      label:"Hindi",
      value:"hi",
    },
  ]}

  onChange={(e)=>

    updatePreferences({

      language:
      e.target.value,

    })

  }
/>

              <label
              className="
              flex
              items-center
              gap-3
              "
              >

                <input
                  type="checkbox"

                  checked={
  preferences?.emailNotifications || false
}

                 onChange={(e) =>
  updatePreferences({
    ...preferences,
    emailNotifications: e.target.checked,
  })
}
                />

                Email Notifications

              </label>

            </div>

          </Card>

        </div>

        {/* RIGHT */}

        <div className="xl:col-span-2">

          <Card>

            <h2
            className="
            text-2xl
            font-bold
            mb-8
            "
            >

              Personal Information

            </h2>

            <p className="text-sm text-slate-500 mt-1">
  User ID: {profile?.userId}
</p>

            <form
            onSubmit={
              handleSubmit
            }
            className="
            grid
            md:grid-cols-2
            gap-6
            "
            >

              <Input

                label="First Name"

                name="firstName"

                value={
                  form.firstName
                }

                onChange={
                  handleChange
                }

              />

              <Input

                label="Last Name"

                name="lastName"

                value={
                  form.lastName
                }

                onChange={
                  handleChange
                }

              />

              <Input

                label="Email"

                type="email"

                name="email"

                value={
                  form.email
                }

                disabled

              />

              <Input

                label="Phone"

                name="phone"

                value={
                  form.phone
                }

                onChange={
                  handleChange
                }

              />

              <div className="md:col-span-2">

  <Input

    label="Address"

    name="address"

    value={form.address}

    onChange={handleChange}

  />

</div>

<Input

  label="City"

  name="city"

  value={form.city}

  onChange={handleChange}

/>

<Input

  label="State"

  name="state"

  value={form.state}

  onChange={handleChange}

/>

<Input

  label="Country"

  name="country"

  value={form.country}

  onChange={handleChange}

/>

<Input

  label="Zip Code"

  name="zipCode"

  value={form.zipCode}

  onChange={handleChange}

/>

              <div
              className="
              md:col-span-2
              "
              >

                <Button
                type="submit"
                >

                  Save Changes

                </Button>

              </div>

            </form>

          </Card>

        </div>

      </div>

    </DashboardLayout>

  );

}