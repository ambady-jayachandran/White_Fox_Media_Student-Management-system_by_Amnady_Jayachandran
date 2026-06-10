import { Link } from "react-router-dom";
import { CheckCircleIcon, ChevronUpDownIcon, NoSymbolIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const columns = [
  { key: "id", label: "ID" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "gender", label: "Gender" },
  { key: "is_active", label: "Status" },
  { key: "date_of_birth", label: "DOB" },
];

export default function StudentTable({ students, ordering, onSort, onDelete, onToggleStatus }) {
  if (!students.length) {
    return (
      <div className="rounded-md border border-dashed border-brand-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-medium text-brand-700">No students found</p>
        <p className="mt-1 text-sm text-brand-500">Adjust search filters or add the first student record.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-brand-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] divide-y divide-brand-200 lg:min-w-full">
          <thead className="bg-brand-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase text-brand-700">
                  <button type="button" onClick={() => onSort(column.key)} className="inline-flex items-center gap-1">
                    {column.label}
                    <ChevronUpDownIcon className={`h-4 w-4 ${ordering?.replace("-", "") === column.key ? "text-brand-700" : "text-brand-500/60"}`} />
                  </button>
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase text-brand-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100 bg-white">
            {students.map((student) => (
              <tr key={student.id} className="group transition hover:bg-emerald-50">
                <td className="whitespace-nowrap px-4 py-3 text-sm text-brand-700 group-hover:text-brand-900">{student.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-ink group-hover:text-brand-900">{student.first_name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-brand-900 group-hover:text-ink">{student.last_name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-brand-900 group-hover:text-ink">{student.email}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-brand-900 group-hover:text-ink">{student.phone}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-brand-900 group-hover:text-ink">{student.gender}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                      student.is_active
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : "bg-slate-100 text-slate-600 ring-slate-200"
                    }`}
                  >
                    {student.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-brand-900 group-hover:text-ink">{student.date_of_birth}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(student)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-xs font-semibold ${
                        student.is_active ? "text-slate-600 hover:bg-slate-100" : "text-emerald-700 hover:bg-emerald-50"
                      }`}
                      aria-label={`Mark ${student.first_name} ${student.is_active ? "inactive" : "active"}`}
                      title={student.is_active ? "Mark inactive" : "Mark active"}
                    >
                      {student.is_active ? <NoSymbolIcon className="h-5 w-5" /> : <CheckCircleIcon className="h-5 w-5" />}
                      {student.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <Link to={`/students/${student.id}/edit`} className="rounded-md p-2 text-brand-700 hover:bg-brand-50" aria-label={`Edit ${student.first_name}`}>
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    <button type="button" onClick={() => onDelete(student)} className="rounded-md p-2 text-red-600 hover:bg-red-50" aria-label={`Delete ${student.first_name}`}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
