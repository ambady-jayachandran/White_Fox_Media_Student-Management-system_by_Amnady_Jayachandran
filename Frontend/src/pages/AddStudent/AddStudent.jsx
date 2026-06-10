import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../../components/StudentForm/StudentForm.jsx";
import { createStudent } from "../../services/studentService";
import { getErrorMessage, getFieldErrors } from "../../utils/errors";

export default function AddStudent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setServerErrors({});
    try {
      await createStudent(values);
      toast.success("Student created");
      navigate("/students");
    } catch (error) {
      setServerErrors(getFieldErrors(error));
      toast.error(getErrorMessage(error, "Unable to create student"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Add Student</h2>
        <p className="mt-1 text-sm text-brand-500">Create a new student record with validated contact details.</p>
      </div>
      <section className="rounded-md border border-brand-200 bg-white p-4 shadow-sm sm:p-5">
        <StudentForm onSubmit={onSubmit} isSubmitting={isSubmitting} serverErrors={serverErrors} />
      </section>
    </div>
  );
}
