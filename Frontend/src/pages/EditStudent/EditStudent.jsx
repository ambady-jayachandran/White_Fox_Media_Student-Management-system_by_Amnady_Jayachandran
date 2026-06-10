import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StudentForm from "../../components/StudentForm/StudentForm.jsx";
import { getStudent, updateStudent } from "../../services/studentService";
import { getErrorMessage, getFieldErrors } from "../../utils/errors";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await getStudent(id);
        setStudent(response.data);
      } catch (error) {
        toast.error(getErrorMessage(error, "Unable to load student"));
        navigate("/students");
      } finally {
        setIsLoading(false);
      }
    };
    loadStudent();
  }, [id, navigate]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setServerErrors({});
    try {
      await updateStudent(id, values);
      toast.success("Student updated");
      navigate("/students");
    } catch (error) {
      setServerErrors(getFieldErrors(error));
      toast.error(getErrorMessage(error, "Unable to update student"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Edit Student</h2>
        <p className="mt-1 text-sm text-slate-600">Update the selected student record.</p>
      </div>
      <section className="rounded-md border border-brand-100 bg-white/80 p-5 shadow-sm backdrop-blur">
        {isLoading ? <p className="text-sm text-slate-500">Loading student...</p> : <StudentForm initialValues={student} onSubmit={onSubmit} isSubmitting={isSubmitting} serverErrors={serverErrors} />}
      </section>
    </div>
  );
}
