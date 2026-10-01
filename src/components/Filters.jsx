import { CATEGORIES } from '../constants'

export default function Filters({ filters, onChange }) {
  const toggle = (c) =>
    onChange({
      ...filters,
      categories: filters.categories.includes(c)
        ? filters.categories.filter((x) => x !== c)
        : [...filters.categories, c],
    })

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 w-64 space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => toggle(c)}
            className={`text-xs px-2.5 py-1 rounded-full border ${
              filters.categories.includes(c)
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number" min="0" placeholder="от"
          value={filters.min}
          onChange={(e) => onChange({ ...filters, min: e.target.value })}
          className="w-full border rounded px-2 py-1 text-sm"
        />
        <span className="text-gray-400">–</span>
        <input
          type="number" min="0" placeholder="до"
          value={filters.max}
          onChange={(e) => onChange({ ...filters, max: e.target.value })}
          className="w-full border rounded px-2 py-1 text-sm"
        />
      </div>
    </div>
  )
}