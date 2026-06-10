import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  gender: "Male",
  address: "",
};

export default function StudentForm({ initialValues, onSubmit, isSubmitting = false, serverErrors = {} }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    reset({ ...defaultValues, ...initialValues });
  }, [initialValues, reset]);

  const fieldError = (name) => errors[name]?.message || serverErrors[name]?.[0] || serverErrors[name];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="form-label">First Name</span>
          <input
            className="form-input"
            {...register("first_name", { required: "First name is required", minLength: { value: 2, message: "Use at least 2 characters" } })}
          />
          {fieldError("first_name") && <p className="mt-1 text-sm text-red-600">{fieldError("first_name")}</p>}
        </label>
        <label className="block">
          <span className="form-label">Last Name</span>
          <input
            className="form-input"
            {...register("last_name", { required: "Last name is required", minLength: { value: 2, message: "Use at least 2 characters" } })}
          />
          {fieldError("last_name") && <p className="mt-1 text-sm text-red-600">{fieldError("last_name")}</p>}
        </label>
        <label className="block">
          <span className="form-label">Email</span>
          <input
            type="email"
            className="form-input"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
            })}
          />
          {fieldError("email") && <p className="mt-1 text-sm text-red-600">{fieldError("email")}</p>}
        </label>
        <label className="block">
          <span className="form-label">Phone</span>
          <input
            className="form-input"
            {...register("phone", {
              required: "Phone is required",
              pattern: { value: /^\d{10,15}$/, message: "Use 10 to 15 digits" },
            })}
          />
          {fieldError("phone") && <p className="mt-1 text-sm text-red-600">{fieldError("phone")}</p>}
        </label>
        <label className="block">
          <span className="form-label">Date Of Birth</span>
          <input type="date" className="form-input" {...register("date_of_birth", { required: "Date of birth is required" })} />
          {fieldError("date_of_birth") && <p className="mt-1 text-sm text-red-600">{fieldError("date_of_birth")}</p>}
        </label>
        <label className="block">
          <span className="form-label">Gender</span>
          <select className="form-input" {...register("gender", { required: "Gender is required" })}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {fieldError("gender") && <p className="mt-1 text-sm text-red-600">{fieldError("gender")}</p>}
        </label>
      </div>
      <label className="block">
        <span className="form-label">Address</span>
        <textarea rows="4" className="form-input" {...register("address", { required: "Address is required" })} />
        {fieldError("address") && <p className="mt-1 text-sm text-red-600">{fieldError("address")}</p>}
      </label>
      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <CheckIcon className="h-5 w-5" />}
          Save Student
        </button>
      </div>
    </form>
  );
}
