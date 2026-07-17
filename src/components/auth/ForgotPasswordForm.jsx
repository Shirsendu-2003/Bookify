import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

import Input from "../common/Input";
import Button from "../common/Button";
import api from "../../services/api";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const validateEmail = () => {
    if (!email.trim()) {
      setError("Email address is required");

      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");

      return false;
    }

    setError("");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    try {
      setLoading(true);

      await api.post("/auth/forgot-password", { email });

      setSubmitted(true);

      Swal.fire({
        icon: "success",

        title: "Reset Link Sent",

        text: "Please check your email inbox.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Request Failed",

        text: error.response?.data?.message || "Unable to send reset link",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* INFO */}

          <div
            className="

rounded-2xl
bg-blue-50
border
border-blue-100
p-5

"
          >
            <h3
              className="

font-semibold
text-slate-900

"
            >
              Forgot your password?
            </h3>

            <p
              className="

mt-2
text-sm
leading-6
text-slate-600

"
            >
              Enter your email address and we'll send you a secure password
              reset link.
            </p>
          </div>

          {/* EMAIL */}

          <Input
            label="Email Address"
            type="email"
            required
            icon={<FaEnvelope />}
            placeholder="john@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              if (error) setError("");
            }}
            error={error}
          />

          {/* BUTTON */}

          <Button type="submit" loading={loading} className="w-full">
            <FaPaperPlane />
            Send Reset Link
          </Button>

          {/* LOGIN */}

          <div
            className="

text-center
text-sm
text-slate-600

"
          >
            Remembered your password?
            <Link
              to="/login"
              className="

ml-2
font-semibold
text-blue-600

"
            >
              Login
            </Link>
          </div>
        </form>
      ) : (
        <div
          className="

text-center
space-y-6

"
        >
          {/* SUCCESS */}

          <div
            className="

mx-auto
flex
items-center
justify-center

w-20
h-20
rounded-full

bg-green-100
text-green-600

text-3xl

"
          >
            ✓
          </div>

          <div>
            <h2
              className="

text-2xl
font-bold
text-slate-900

"
            >
              Email Sent Successfully
            </h2>

            <p
              className="

mt-4
leading-7
text-slate-600

"
            >
              We've sent a password reset link to
              <span
                className="

font-semibold
text-slate-900
ml-1

"
              >
                {email}
              </span>
            </p>
          </div>

          {/* RESEND */}

          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
            }}
            className="w-full"
          >
            Resend Email
          </Button>

          {/* BACK */}

          <Link
            to="/login"
            className="

block
text-blue-600
font-medium

"
          >
            Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}
