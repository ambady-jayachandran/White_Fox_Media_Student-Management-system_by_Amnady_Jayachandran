import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FunnelIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.jsx";
import StudentTable from "../../components/StudentTable/StudentTable.jsx";
import useDebounce from "../../hooks/useDebounce";
import { deleteStudent, getStudents, updateStudentStatus } from "../../services/studentService";
import { getErrorMessage } from "../../utils/errors";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState({ count: 0, next: null, previous: null });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-created_at");
  const [status, setStatus] = useState("all");
  const [gender, setGender] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const debouncedSearch = useDebounce(search);

  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getStudents({
        search: debouncedSearch,
        page,
        ordering,
        ...(status !== "all" ? { status } : {}),
        ...(gender !== "all" ? { gender } : {}),
      });
      setStudents(response.data.results);
      setMeta({ count: response.data.count, next: response.data.next, previous: response.data.previous });
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to load students"));
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, page, ordering, status, gender]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, gender, ordering]);

  const handleSort = (field) => {
    setOrdering((current) => (current === field ? `-${field}` : field));
  };

  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
  };

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const orderingOptions = [
    { value: "-created_at", label: "Newest" },
    { value: "created_at", label: "Oldest" },
    { value: "first_name", label: "Alphabetic A-Z" },
    { value: "-first_name", label: "Alphabetic Z-A" },
    { value: "gender", label: "Gender A-Z" },
    { value: "-gender", label: "Gender Z-A" },
  ];

  const genderOptions = [
    { value: "all", label: "All genders" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudent(studentToDelete.id);
      toast.success("Student deleted");
      setStudentToDelete(null);
      loadStudents();
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to delete student"));
    }
  };

  const toggleStudentStatus = async (student) => {
    try {
      await updateStudentStatus(student.id, !student.is_active);
      toast.success(`Student marked ${student.is_active ? "inactive" : "active"}`);
      loadStudents();
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to update student status"));
    }
  };

  const totalPages = Math.max(1, Math.ceil(meta.count / 10));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Students</h2>
          <p className="mt-1 text-sm text-brand-500">Search, sort, edit, and maintain student records.</p>
        </div>
        <Link to="/students/add" className="btn-primary">
          <PlusIcon className="h-5 w-5" />
          Add Student
        </Link>
      </div>
      <div className="flex flex-col gap-3 rounded-md border border-brand-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-md">
          <span className="sr-only">Search students</span>
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-500/70" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-md border-brand-200 bg-white pl-10 text-sm text-brand-700 placeholder:text-brand-500/70 focus:border-brand-500 focus:ring-brand-500"
            placeholder="Search by name or email"
          />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          <div className="grid grid-cols-3 rounded-md border border-brand-200 bg-brand-50 p-1 sm:inline-flex">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setStatus(option.value)}
                className={`rounded px-3 py-1.5 text-xs font-semibold transition sm:min-w-20 ${
                  status === option.value ? "bg-emerald-600 text-white shadow-sm" : "text-brand-700 hover:bg-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 rounded-md border border-brand-200 bg-white px-3 py-2 text-sm font-medium text-brand-700">
            <FunnelIcon className="h-4 w-4" />
            <select value={ordering} onChange={handleOrderingChange} className="border-0 bg-transparent p-0 text-sm font-semibold text-brand-700 focus:ring-0">
              {orderingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            className="rounded-md border-brand-200 bg-white text-sm font-semibold text-brand-700 focus:border-brand-500 focus:ring-brand-500"
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
            {isLoading ? "Loading..." : `${meta.count} records`}
          </p>
        </div>
      </div>
      <StudentTable students={students} ordering={ordering} onSort={handleSort} onDelete={setStudentToDelete} onToggleStatus={toggleStudentStatus} />
      <div className="flex items-center justify-between">
        <button type="button" className="btn-secondary" disabled={!meta.previous} onClick={() => setPage((value) => Math.max(1, value - 1))}>
          Previous
        </button>
        <span className="text-sm font-medium text-brand-700">
          Page {page} of {totalPages}
        </span>
        <button type="button" className="btn-secondary" disabled={!meta.next} onClick={() => setPage((value) => value + 1)}>
          Next
        </button>
      </div>
      <ConfirmModal
        open={Boolean(studentToDelete)}
        title="Delete student"
        message={`Delete ${studentToDelete?.first_name || "this student"} ${studentToDelete?.last_name || ""}? This action cannot be undone.`}
        onCancel={() => setStudentToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
