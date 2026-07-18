'use client';

interface LogoutConfirmationProps {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function LogoutConfirmation({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: LogoutConfirmationProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-slate-900 rounded-xl shadow-2xl max-w-sm w-full border border-slate-700 animate-in fade-in duration-200">
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Sign Out?</h2>
              <p className="text-slate-400 text-sm mt-2">
                Are you sure you want to sign out of ChatX? You can always sign back in anytime.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-medium rounded-lg transition-all active:scale-95 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium rounded-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? 'Signing Out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
