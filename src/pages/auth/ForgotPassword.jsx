import {
  Link,
} from "react-router-dom";

import {
  useState,
} from "react";

import AuthLayout from
"../../components/layout/AuthLayout";

import ForgotPasswordForm from
"../../components/auth/ForgotPasswordForm";

import authService from
"../../services/authService";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function ForgotPassword(){

  const [loading,
    setLoading
  ] = useState(false);

  /* ---------------------- */
  /* SUBMIT */
  /* ---------------------- */

  const handleSubmit =
    async(values)=>{

    try{

      setLoading(true);

      await authService
      .forgotPassword(

        values.email

      );

      await showSuccess(

        "Reset Link Sent",

        "Check your email inbox."

      );

    }catch(error){

      showError(

        "Request Failed",

        error.message ||

        "Unable to send reset link."

      );

    }finally{

      setLoading(false);

    }

  };

  return(

    <AuthLayout

      title="
Forgot Password"

      subtitle="
Enter your registered email address."

    >

      <ForgotPasswordForm

        onSubmit={
          handleSubmit
        }

        loading={
          loading
        }

      />

      {/* FOOTER */}

      <div
        className="

mt-8
text-center

"

      >

        <Link

          to="/login"

          className="

text-blue-600
font-semibold

hover:underline

"

        >

          Back To Login

        </Link>

      </div>

    </AuthLayout>

  );

}