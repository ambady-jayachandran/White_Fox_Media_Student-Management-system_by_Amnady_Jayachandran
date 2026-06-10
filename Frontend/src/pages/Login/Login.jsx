import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import { getErrorMessage } from "../../utils/errors.js";
import BrandMark from "../../components/BrandMark/BrandMark.jsx";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await login(values);
      toast.success("Welcome back");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed"));
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
            <LockClosedIcon className="h-4 w-4" />
            Secure Admin Access
          </div>
          <h1 className="text-2xl font-semibold text-ink">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">Access the student management console.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <label className="block">
            <span className="form-label">Username</span>
            <input className="form-input" autoComplete="username" {...register("username", { required: "Username is required" })} />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
          </label>
          <label className="block">
            <span className="form-label">Password</span>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-input pr-11"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
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
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </label>
          <button type="submit" className="btn-primary w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 border-t border-slate-200 pt-5 text-center">
          <p className="text-sm text-slate-600">Need an admin account?</p>
          <Link to="/register" className="btn-secondary mt-3 w-full">
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}
