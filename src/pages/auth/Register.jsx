import { Link, useNavigate }
from "react-router-dom";

import RegisterForm from
"../../components/auth/RegisterForm";

import AuthLayout from
"../../components/layout/AuthLayout";

import {
  useAuthContext,
} from "../../context/AuthContext";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

import Navbar from "../../components/layout/Navbar";

import Footer from "../../components/layout/Footer";
import ScrollButton from "../../components/common/ScrollButton";
import Loader from "../../components/common/Loader";

export default function Register(){

  const {
    register,
      loading,
  } = useAuthContext();

  const navigate =
    useNavigate();

  /* ---------------------- */
  /* SUBMIT */
  /* ---------------------- */

  const handleSubmit = async (formData) => {
  try {
    console.log("REGISTER FORM DATA:", formData);

    const response = await register(formData);

    if (response?.success === false) {
      throw new Error(
        response?.message ||
        "Registration failed"
      );
    }

    await showSuccess(
      "Registration Successful",
      "Your account has been created."
    );

    navigate("/login", {
      replace: true,
    });

  } catch (error) {

    showError(
      "Registration Failed",
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );

  }
};

  return(
     <>
    <Navbar />

    {loading && (
  <Loader text="Creating your account..." />
)}

    <AuthLayout

      title="
Create Account"

      subtitle="
Join ServiceHub and start booking trusted services."

    >

      <RegisterForm
  onSubmit={handleSubmit}
  loading={loading}
/>

      

      {/* FOOTER */}

      <div
        className="

mt-8
text-center

"

      >

        <p
          className="
text-slate-600
"
        >

          Already have an account?

          {" "}

          <Link
            to="/login"
            className="

text-blue-600
font-semibold

hover:underline

"
          >

            Sign In

          </Link>

        </p>

      </div>

    </AuthLayout>

    <Footer />

    <ScrollButton />

    </>

  );

}