"use client";

import { useUpdates } from "@/lib/use-data";

export function UpdatesTab() {
  const { updates, loading } = useUpdates();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 py-6 space-y-4">
        {loading ? (
          <div className="text-center text-slate-400">
            <p>Loading updates...</p>
          </div>
        ) : updates.length > 0 ? (
          updates.map((update) => (
            <div
              key={update.id}
              className="flex gap-4 p-4 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-100">{update.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{update.status}</p>
                <p className="text-xs text-slate-500 mt-2">{update.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-400">
            <p>No updates</p>
          </div>
        )}
      </div>
    </div>
  );
}
