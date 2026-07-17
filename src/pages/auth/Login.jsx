import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";

import AuthLayout from "../../components/layout/AuthLayout";

import { useAuthContext } from "../../context/AuthContext";

import { showSuccess, showError } from "../../utils/swal";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { updateCurrentLocation } from "../../utils/updateCurrentLocation";
import ScrollButton from "../../components/common/ScrollButton";
import Loader from "../../components/common/Loader";

export default function Login() {
  const { login, loading, isAuthenticated, user } = useAuthContext();

  const navigate = useNavigate();

  const location = useLocation();

  /* ROLE REDIRECT */

  const redirectUser = (role) => {
    const from = location.state?.from?.pathname;

    if (from) {
      navigate(from, {
        replace: true,
      });

      return;
    }

    switch (role) {
      case "ROLE_ADMIN":
        navigate("/dashboard/admin", {
          replace: true,
        });

        break;

      case "ROLE_PROVIDER":
        navigate("/dashboard/provider", {
          replace: true,
        });

        break;

      case "ROLE_CUSTOMER":

      default:
        navigate("/dashboard/customer", {
          replace: true,
        });
    }
  };

  /* AUTO LOGIN REDIRECT */

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user?.role || user?.roles?.[0] || "ROLE_CUSTOMER";

      redirectUser(role);
    }
  }, [isAuthenticated, user]);

  /* LOGIN */

  const handleSubmit = async (values) => {
    try {
      const response = await login({
        email: values.email,

        password: values.password,
      });

      if (!response.success) {
        throw response.error;
      }


      const role =
        response?.data?.role ||
        response?.data?.roles?.[0] ||
        user?.role ||
        user?.roles?.[0] ||
        "ROLE_CUSTOMER";

      // Update provider location immediately after login
      if (role === "ROLE_PROVIDER") {
        await updateCurrentLocation();
      }

      await showSuccess(
        "Login Successful",

        `Welcome ${role}`,
      );

      redirectUser(role);
    } catch (error) {
      showError(
        "Authentication Failed",

        error?.response?.data?.message ||
          error?.message ||
          "Invalid Credentials",
      );
    }
  };

  return (
    <>
      <Navbar />

       {loading && <Loader />}

      <AuthLayout
        title="Welcome Back"
        subtitle="
Login to continue using ServiceHub."
      >
        <LoginForm onSubmit={handleSubmit} loading={loading} />

        <div
          className="
mt-8
space-y-4
text-center
"
        >
          <p
            className="
text-slate-600
"
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
text-blue-600
font-semibold
hover:underline
"
            >
              Create Account
            </Link>
          </p>
        </div>
      </AuthLayout>

      <Footer />
      <ScrollButton />
    </>
  );
}
