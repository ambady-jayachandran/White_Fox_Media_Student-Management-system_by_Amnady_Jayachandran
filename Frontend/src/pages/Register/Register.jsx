import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import { getErrorMessage, getFieldErrors } from "../../utils/errors.js";
import BrandMark from "../../components/BrandMark/BrandMark.jsx";

export default function Register() {
  const { register: registerUser, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const fieldError = (name) => errors[name]?.message || serverErrors[name]?.[0] || serverErrors[name];

  const onSubmit = async (values) => {
    setIsLoading(true);
    setServerErrors({});
    try {
      await registerUser(values);
      toast.success("Account created");
      navigate("/", { replace: true });
    } catch (error) {
      setServerErrors(getFieldErrors(error));
      toast.error(getErrorMessage(error, "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-100 via-sky-50 to-brand-200 px-4 py-10">
      <section className="w-full max-w-md rounded-md border border-brand-100 bg-white/85 p-8 shadow-soft backdrop-blur">
        <div className="mb-8">
          <BrandMark className="mb-6" />
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-foxgreen-50 px-3 py-1 text-xs font-semibold text-foxgreen-600 ring-1 ring-foxgreen-100">
            <UserPlusIcon className="h-4 w-4" />
            New Admin Profile
          </div>
          <h1 className="text-2xl font-semibold text-ink">Create account</h1>
          <p className="mt-2 text-sm text-slate-600">Register an admin user for the student management console.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <label className="block">
            <span className="form-label">Username</span>
            <input className="form-input" autoComplete="username" {...register("username", { required: "Username is required", minLength: { value: 3, message: "Use at least 3 characters" } })} />
            {fieldError("username") && <p className="mt-1 text-sm text-red-600">{fieldError("username")}</p>}
          </label>
          <label className="block">
            <span className="form-label">Email</span>
            <input
              type="email"
              className="form-input"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
              })}
            />
            {fieldError("email") && <p className="mt-1 text-sm text-red-600">{fieldError("email")}</p>}
          </label>
          <label className="block">
            <span className="form-label">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input pr-11"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Use at least 8 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-0 mt-1 grid w-11 place-items-center text-slate-500 hover:text-ink"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {fieldError("password") && <p className="mt-1 text-sm text-red-600">{fieldError("password")}</p>}
          </label>
          <label className="block">
            <span className="form-label">Confirm Password</span>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-input pr-11"
                autoComplete="new-password"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute inset-y-0 right-0 mt-1 grid w-11 place-items-center text-slate-500 hover:text-ink"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {fieldError("confirm_password") && <p className="mt-1 text-sm text-red-600">{fieldError("confirm_password")}</p>}
          </label>
          <button type="submit" className="btn-primary w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </button>
        </form>
        <div className="mt-6 border-t border-slate-200 pt-5 text-center">
          <p className="text-sm text-slate-600">Already have an account?</p>
          <Link to="/login" className="btn-secondary mt-3 w-full">
            Back to login
          </Link>
        </div>
      </section>
    </main>
  );
}
