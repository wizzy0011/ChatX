"use client";

interface FilterRowProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterRow({ activeFilter, onFilterChange }: FilterRowProps) {
  const filters = ["All", "Unread", "Favorites", "Groups"];

  return (
    <div className="px-4 py-3 border-b border-slate-700 bg-black overflow-x-auto">
      <div className="flex gap-2 mb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all flex-shrink-0 active:scale-95 ${
              activeFilter === filter
                ? "bg-blue-600 text-white active:bg-blue-700"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 active:bg-slate-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
