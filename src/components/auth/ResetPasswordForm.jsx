import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

import Swal from "sweetalert2";

import { FaLock, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";

import Input from "../common/Input";
import Button from "../common/Button";
import api from "../../services/api";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!token) {
      newErrors.token = "Invalid or missing reset token.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Include at least one uppercase letter.";
    }

    if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Include at least one number.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const passwordStrength = () => {
    const pwd = formData.password;

    if (pwd.length < 8) return "Weak";

    if (pwd.length >= 8 && pwd.length < 12) return "Medium";

    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/auth/reset-password", {
        token,

        password: formData.password,
      });

      Swal.fire({
        icon: "success",

        title: "Password Reset Successful",

        text: "Your password has been updated.",
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Reset Failed",

        text: error.response?.data?.message || "Unable to reset password.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <div className="flex gap-4">
          <FaShieldAlt
            className="

text-blue-600
text-xl
mt-1

"
          />

          <div>
            <h3
              className="

font-semibold
text-slate-900

"
            >
              Create New Password
            </h3>

            <p
              className="

mt-2
text-sm
leading-6
text-slate-600

"
            >
              Choose a strong, secure password for your account.
            </p>
          </div>
        </div>
      </div>

      {/* PASSWORD */}

      <div className="relative">
        <Input
          label="New Password"
          name="password"
          required
          icon={<FaLock />}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="button"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="

absolute
right-4
top-[48px]
text-slate-500

"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* STRENGTH */}

      <div className="text-sm">
        <span className="text-slate-500">Strength:</span>

        <span
          className={`

ml-2
font-semibold

${
  passwordStrength() === "Weak"
    ? "text-red-500"
    : passwordStrength() === "Medium"
      ? "text-yellow-500"
      : "text-green-600"
}

`}
        >
          {passwordStrength()}
        </span>
      </div>

      {/* CONFIRM */}

      <div className="relative">
        <Input
          label="Confirm Password"
          name="confirmPassword"
          required
          icon={<FaLock />}
          type={showConfirm ? "text" : "password"}
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="button"
          onClick={() => {
            setShowConfirm(!showConfirm);
          }}
          className="

absolute
right-4
top-[48px]
text-slate-500

"
        >
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* TOKEN ERROR */}

      {errors.token && (
        <p
          className="

text-red-500
text-sm

"
        >
          {errors.token}
        </p>
      )}

      {/* BUTTON */}

      <Button type="submit" loading={loading} className="w-full">
        Update Password
      </Button>

      {/* LOGIN */}

      <div
        className="

text-center
text-sm
text-slate-600

"
      >
        Back to
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
  );
}
