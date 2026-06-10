import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

const columns = [
  { key: "id", label: "ID" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "gender", label: "Gender" },
  { key: "date_of_birth", label: "DOB" },
];

export default function StudentTable({ students, ordering, onSort, onDelete }) {
  if (!students.length) {
    return (
      <div className="rounded-md border border-dashed border-brand-200 bg-white/80 p-10 text-center backdrop-blur">
        <p className="text-sm font-medium text-slate-700">No students found</p>
        <p className="mt-1 text-sm text-slate-500">Adjust search filters or add the first student record.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-brand-100 bg-white/80 shadow-sm backdrop-blur">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-100">
          <thead className="bg-brand-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase text-slate-600">
                  <button type="button" onClick={() => onSort(column.key)} className="inline-flex items-center gap-1">
                    {column.label}
                    <ChevronUpDownIcon className={`h-4 w-4 ${ordering?.replace("-", "") === column.key ? "text-brand-600" : "text-slate-400"}`} />
                  </button>
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white/70">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-brand-50/60">
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{student.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-ink">{student.first_name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{student.last_name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{student.email}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{student.phone}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{student.gender}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{student.date_of_birth}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
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
