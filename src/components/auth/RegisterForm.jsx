import { useState } from "react";

import {
  FaEnvelope,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

export default function RegisterForm({ onSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "ROLE_CUSTOMER",

    providerType: "",

    governmentIdType: "",
    governmentIdNumber: "",
    governmentIdFile: null,

    certificateFile: null,
  });
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      const newErrors = { ...errors };

      // Real-time password match validation
      if (name === "password" || name === "confirmPassword") {
        if (
          updated.confirmPassword &&
          updated.password !== updated.confirmPassword
        ) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
      }

      setErrors(newErrors);

      return updated;
    });
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

  const getPasswordStrength = (password) => {
    if (!password) return 0;

    let score = 0;

    if (password.length >= 8) score += 20;
    if (/[a-z]/.test(password)) score += 20;
    if (/[A-Z]/.test(password)) score += 20;
    if (/\d/.test(password)) score += 20;
    if (/[@$!%*?&#^()_\-+=]/.test(password)) score += 20;

    return score;
  };

  const strength = getPasswordStrength(formData.password);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.role === "ROLE_PROVIDER") {
      if (!formData.governmentIdType) {
        newErrors.governmentIdType = "Government ID type required";
      }
      if (!formData.providerType) {
        newErrors.providerType = "Provider type required";
      }

      if (!formData.governmentIdNumber.trim()) {
        newErrors.governmentIdNumber = "Government ID number required";
      }

      if (!formData.governmentIdFile) {
        newErrors.governmentIdFile = "Government ID upload required";
      }

      if (!formData.certificateFile) {
        newErrors.certificateFile = "Professional Certificate required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    onSubmit(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <Input
        label="First Name"
        name="firstName"
        icon={<FaUser />}
        placeholder="Enter first name"
        value={formData.firstName}
        onChange={handleChange}
        error={errors.firstName}
      />

      <Input
        label="Last Name"
        name="lastName"
        icon={<FaUser />}
        placeholder="Enter last name"
        value={formData.lastName}
        onChange={handleChange}
        error={errors.lastName}
      />

      <Input
        label="Email"
        name="email"
        type="email"
        icon={<FaEnvelope />}
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <Input
        label="Phone"
        name="phone"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <Select
        label="Account Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={[
          {
            label: "Customer",
            value: "ROLE_CUSTOMER",
          },

          {
            label: "Professional Service",
            value: "ROLE_PROVIDER",
          },
        ]}
      />

      {formData.role === "ROLE_PROVIDER" && (
        <>
          <Select
            label="Professional Service Type"
            name="providerType"
            value={formData.providerType}
            onChange={handleChange}
            options={[
              { label: "Electrician", value: "ELECTRICIAN" },
              { label: "Plumber", value: "PLUMBER" },
              { label: "Cleaner", value: "CLEANER" },
              { label: "Painter", value: "PAINTER" },
              { label: "AC Repair", value: "AC_REPAIR" },
              { label: "Carpenter", value: "CARPENTER" },
              { label: "Mechanic", value: "MECHANIC" },
              { label: "Appliance Repair", value: "APPLIANCE_REPAIR" },
              { label: "General Service", value: "GENERAL_SERVICE" },
            ]}
          />

          {errors.providerType && (
            <p className="text-red-500 text-sm mt-1">{errors.providerType}</p>
          )}

          <Select
            label="Government ID Type"
            name="governmentIdType"
            value={formData.governmentIdType}
            onChange={handleChange}
            options={[
              {
                label: "Aadhaar Card",
                value: "AADHAAR",
              },
              {
                label: "PAN Card",
                value: "PAN",
              },
              {
                label: "Voter ID",
                value: "VOTER_ID",
              },
              {
                label: "Driving License",
                value: "DRIVING_LICENSE",
              },
            ]}
          />

          {errors.governmentIdType && (
            <p className="text-red-500 text-sm">{errors.governmentIdType}</p>
          )}

          <Input
            label="Government ID Number"
            name="governmentIdNumber"
            placeholder="Enter ID Number"
            value={formData.governmentIdNumber}
            onChange={handleChange}
            error={errors.governmentIdNumber}
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Government ID *
            </label>

            <input
              type="file"
              name="governmentIdFile"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-3"
            />

            {errors.governmentIdFile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.governmentIdFile}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Professional Certificate *
            </label>

            <input
              type="file"
              name="certificateFile"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-3"
            />

            {errors.certificateFile && (
              <p className="text-red-500 text-sm mt-1">
                {errors.certificateFile}
              </p>
            )}
          </div>
        </>
      )}

      <div className="relative">
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          icon={<FaLock />}
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Password Strength</span>

            <span
              className={`font-semibold ${
                strength <= 20
                  ? "text-red-500"
                  : strength <= 40
                    ? "text-orange-500"
                    : strength <= 60
                      ? "text-yellow-600"
                      : strength <= 80
                        ? "text-blue-600"
                        : "text-green-600"
              }`}
            >
              {strength <= 20
                ? "Very Weak"
                : strength <= 40
                  ? "Weak"
                  : strength <= 60
                    ? "Fair"
                    : strength <= 80
                      ? "Good"
                      : "Strong"}
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                strength <= 20
                  ? "bg-red-500 w-1/5"
                  : strength <= 40
                    ? "bg-orange-500 w-2/5"
                    : strength <= 60
                      ? "bg-yellow-500 w-3/5"
                      : strength <= 80
                        ? "bg-blue-500 w-4/5"
                        : "bg-green-500 w-full"
              }`}
            />
          </div>

          <ul className="mt-3 space-y-1 text-xs">
            <li
              className={
                formData.password.length >= 8
                  ? "text-green-600"
                  : "text-slate-500"
              }
            >
              ✓ Minimum 8 characters
            </li>

            <li
              className={
                /[A-Z]/.test(formData.password)
                  ? "text-green-600"
                  : "text-slate-500"
              }
            >
              ✓ One uppercase letter
            </li>

            <li
              className={
                /[a-z]/.test(formData.password)
                  ? "text-green-600"
                  : "text-slate-500"
              }
            >
              ✓ One lowercase letter
            </li>

            <li
              className={
                /\d/.test(formData.password)
                  ? "text-green-600"
                  : "text-slate-500"
              }
            >
              ✓ One number
            </li>

            <li
              className={
                /[@$!%*?&#^()_\-+=]/.test(formData.password)
                  ? "text-green-600"
                  : "text-slate-500"
              }
            >
              ✓ One special character
            </li>
          </ul>
        </div>

        <button
          type="button"
          className="
          absolute
          right-4
          top-[42px]
          text-slate-500
          "
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          icon={<FaUserShield />}
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        {formData.confirmPassword && (
          <p
            className={`mt-2 text-sm font-medium ${
              formData.password === formData.confirmPassword
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {formData.password === formData.confirmPassword
              ? "✓ Passwords match"
              : "✗ Passwords do not match"}
          </p>
        )}

        <button
          type="button"
          className="
          absolute
          right-4
          top-[42px]
          text-slate-500
          "
          onClick={() => setShowConfirm(!showConfirm)}
        >
          {showConfirm ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Create Account
      </Button>
    </form>
  );
}
