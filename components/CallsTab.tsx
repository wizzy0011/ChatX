"use client";

import { mockCalls } from "@/lib/mockData";
import { Phone, PhoneIncoming, PhoneOutgoing } from "lucide-react";

export function CallsTab() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 py-4 space-y-2">
        {mockCalls.map((call) => (
          <div
            key={call.id}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-100">{call.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {call.type === "incoming" ? (
                  <PhoneIncoming size={14} className="text-red-500" />
                ) : (
                  <PhoneOutgoing size={14} className="text-green-500" />
                )}
                <p className="text-sm text-slate-400">{call.time}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-slate-500">{call.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
