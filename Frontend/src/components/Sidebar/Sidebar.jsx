import { NavLink } from "react-router-dom";
import { createElement } from "react";
import { HomeIcon, PlusCircleIcon, UserGroupIcon, XMarkIcon } from "@heroicons/react/24/outline";
import BrandMark from "../BrandMark/BrandMark.jsx";

const links = [
  { to: "/", label: "Dashboard", icon: HomeIcon },
  { to: "/students", label: "Students", icon: UserGroupIcon },
  { to: "/students/add", label: "Add Student", icon: PlusCircleIcon },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-brand-900/45 transition lg:hidden ${isOpen ? "block" : "hidden"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[min(18rem,85vw)] border-r border-brand-200 bg-brand-700 transition-transform lg:static lg:z-auto lg:w-72 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <BrandMark className="text-white" />
          <button type="button" onClick={onClose} className="rounded-md p-2 text-brand-50 hover:bg-white/10 lg:hidden" aria-label="Close navigation">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-white text-brand-700 shadow-sm" : "text-brand-50 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {createElement(icon, { className: "h-5 w-5" })}
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
