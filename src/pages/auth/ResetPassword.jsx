import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import AuthLayout from
"../../components/layout/AuthLayout";

import ResetPasswordForm from
"../../components/auth/ResetPasswordForm";

import authService from
"../../services/authService";

import {
  showSuccess,
  showError,
} from "../../utils/swal";

export default function ResetPassword(){

  const [loading,
    setLoading
  ] = useState(false);

  const navigate =
    useNavigate();

  const [searchParams] =
    useSearchParams();

  const token =

    searchParams.get(
      "token"
    );

  /* ---------------------- */
  /* SUBMIT */
  /* ---------------------- */

  const handleSubmit =
    async(values)=>{

    if(!token){

      return showError(

        "Invalid Token",

        "Reset token missing."

      );

    }

    try{

      setLoading(true);

      await authService
      .resetPassword(

        token,

        values.password

      );

      await showSuccess(

        "Password Updated",

        "Login with your new password."

      );

      navigate(

        "/login",

        {

          replace:true,

        }

      );

    }catch(error){

      showError(

        "Reset Failed",

        error.message ||

        "Unable to reset password."

      );

    }finally{

      setLoading(false);

    }

  };

  return(

    <AuthLayout

      title="
Reset Password"

      subtitle="
Create a new secure password."

    >

      <ResetPasswordForm

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

        <p
          className="
text-slate-600
"
        >

          Remember your password?

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

  );

}