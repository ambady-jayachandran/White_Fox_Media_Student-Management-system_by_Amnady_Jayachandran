import { createElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircleIcon, UserGroupIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { getStudents } from "../../services/studentService";
import { getErrorMessage } from "../../utils/errors";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, recent: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getStudents({ page_size: 5, ordering: "-created_at" });
        setStats({
          total: response.data.count,
          recent: response.data.results,
        });
      } catch (error) {
        toast.error(getErrorMessage(error, "Unable to load dashboard"));
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const cards = [
    { label: "Total Students", value: isLoading ? "..." : stats.total, icon: UserGroupIcon, to: "/students" },
    { label: "Add Student", value: "New", icon: PlusCircleIcon, to: "/students/add" },
    { label: "Student List", value: "Manage", icon: ClipboardDocumentListIcon, to: "/students" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Dashboard</h2>
        <p className="mt-1 text-sm text-brand-500">Monitor enrollment records and jump into common workflows.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ label, value, icon, to }) => (
          <Link key={label} to={to} className="rounded-md border border-brand-200 bg-white p-5 shadow-sm transition hover:border-brand-500 hover:shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-brand-500">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                {createElement(icon, { className: "h-7 w-7" })}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <section className="rounded-md border border-brand-200 bg-white shadow-sm">
        <div className="border-b border-brand-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-ink">Recent Students</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {stats.recent.length ? (
            stats.recent.map((student) => (
              <div key={student.id} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-ink">
                    {student.first_name} {student.last_name}
                  </p>
                  <p className="text-sm text-brand-500">{student.email}</p>
                </div>
                <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">{student.gender}</span>
              </div>
            ))
          ) : (
            <p className="px-5 py-8 text-sm text-brand-500">{isLoading ? "Loading..." : "No recent students yet."}</p>
          )}
        </div>
      </section>
    </div>
  );
}
