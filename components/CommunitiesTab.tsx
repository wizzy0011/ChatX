"use client";

import { useCommunities } from "@/lib/use-data";
import { Users, Plus } from "lucide-react";

export function CommunitiesTab() {
  const { communities, loading } = useCommunities();

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      <div className="px-4 py-4 space-y-3">
        {loading ? (
          <div className="text-center text-slate-400 py-4">
            <p>Loading communities...</p>
          </div>
        ) : communities.length > 0 ? (
          communities.map((community) => (
            <div
              key={community.id}
              className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-100">{community.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{community.description}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                    <Users size={14} />
                    <span>{community.members} members</span>
                  </div>
                </div>
                <button className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-400 py-4">
            <p>No communities</p>
          </div>
        )}
      </div>
    </div>
  );
}
