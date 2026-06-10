import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext.jsx";
import BrandMark from "../BrandMark/BrandMark.jsx";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-brand-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-md p-2 text-brand-700 hover:bg-brand-50 lg:hidden"
            aria-label="Open navigation"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <BrandMark compact className="hidden sm:flex lg:hidden" />
          <div>
            <p className="text-sm text-brand-500">White Fox Media</p>
            <h1 className="text-lg font-semibold text-ink">Student Module</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-brand-700 sm:inline">{user?.username}</span>
          <button type="button" onClick={logout} className="btn-secondary" aria-label="Logout">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
