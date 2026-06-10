import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ConfirmModal({ open, title, message, confirmLabel = "Delete", onConfirm, onCancel, isLoading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-brand-900/55 px-4">
      <div className="w-full max-w-md rounded-md border border-brand-200 bg-white p-6 shadow-xl">
        <div className="flex gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-100 text-red-600">
            <ExclamationTriangleIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-2 text-sm text-brand-500">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn-secondary" disabled={isLoading}>
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="btn-danger" disabled={isLoading}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
