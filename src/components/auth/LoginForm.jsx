import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";

import Input from "../common/Input";
import Button from "../common/Button";

export default function LoginForm({
  onSubmit,

  loading = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",

    password: "",

    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {
      name,

      value,

      type,

      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email Address"
        name="email"
        type="email"
        required
        icon={<FaEnvelope />}
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <div className="relative">
        <Input
          label="Password"
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
          onClick={() => setShowPassword(!showPassword)}
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

      <div
        className="

flex
flex-col
sm:flex-row
sm:items-center
sm:justify-between
gap-4

"
      >
        <label
          className="

flex
items-center
gap-2
text-sm
text-slate-600

"
        >
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
          />
          Remember me
        </label>

        <Link
          to="/forgot-password"
          className="

text-sm
font-medium
text-blue-600

"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
  type="submit"
  loading={loading}
  disabled={loading}
  className="w-full"
>
  {loading ? (
    <>
      <span className="flex items-center justify-center gap-2">
        Signing In...
      </span>
    </>
  ) : (
    "Sign In"
  )}
</Button>

      
    </form>
  );
}
