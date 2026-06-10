import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.jsx";
import StudentTable from "../../components/StudentTable/StudentTable.jsx";
import useDebounce from "../../hooks/useDebounce";
import { deleteStudent, getStudents } from "../../services/studentService";
import { getErrorMessage } from "../../utils/errors";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState({ count: 0, next: null, previous: null });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("-created_at");
  const [isLoading, setIsLoading] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const debouncedSearch = useDebounce(search);

  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getStudents({ search: debouncedSearch, page, ordering });
      setStudents(response.data.results);
      setMeta({ count: response.data.count, next: response.data.next, previous: response.data.previous });
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to load students"));
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, page, ordering]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleSort = (field) => {
    setOrdering((current) => (current === field ? `-${field}` : field));
  };

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

  const totalPages = Math.max(1, Math.ceil(meta.count / 10));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Students</h2>
          <p className="mt-1 text-sm text-slate-600">Search, sort, edit, and maintain student records.</p>
        </div>
        <Link to="/students/add" className="btn-primary">
          <PlusIcon className="h-5 w-5" />
          Add Student
        </Link>
      </div>
      <div className="flex flex-col gap-3 rounded-md border border-brand-100 bg-white/80 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-md">
          <span className="sr-only">Search students</span>
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-md border-slate-300 bg-white pl-10 text-sm focus:border-brand-500 focus:ring-brand-500"
            placeholder="Search by name or email"
          />
        </label>
        <p className="w-fit rounded-full bg-foxgreen-50 px-3 py-1 text-xs font-semibold text-foxgreen-600 ring-1 ring-foxgreen-100">
          {isLoading ? "Loading..." : `${meta.count} records`}
        </p>
      </div>
      <StudentTable students={students} ordering={ordering} onSort={handleSort} onDelete={setStudentToDelete} />
      <div className="flex items-center justify-between">
        <button type="button" className="btn-secondary" disabled={!meta.previous} onClick={() => setPage((value) => Math.max(1, value - 1))}>
          Previous
        </button>
        <span className="text-sm font-medium text-slate-600">
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
