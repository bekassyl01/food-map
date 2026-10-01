import { useEffect, useMemo, useState } from 'react'
import { Plus, X } from 'lucide-react'
import MapView from './components/MapView'
import Filters from './components/Filters'
import SpotForm from './components/SpotForm'
import { getSpots, addSpot, uploadPhoto } from './api/spots'
import { supabase } from './lib/supabase'

export default function App() {
  const [spots, setSpots] = useState([])
  const [filters, setFilters] = useState({ categories: [], min: '', max: '' })
  const [addMode, setAddMode] = useState(false)
  const [draft, setDraft] = useState(null)

  const upsert = (s) =>
    setSpots((prev) => (prev.some((p) => p.id === s.id) ? prev : [s, ...prev]))

  useEffect(() => {
    getSpots().then(setSpots).catch(console.error)

    const channel = supabase
      .channel('spots-live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'spots' }, (p) => upsert(p.new))
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const visible = useMemo(
    () =>
      spots.filter((s) => {
        if (filters.categories.length && !filters.categories.includes(s.category)) return false
        if (filters.min !== '' && s.price < Number(filters.min)) return false
        if (filters.max !== '' && s.price > Number(filters.max)) return false
        return true
      }),
    [spots, filters]
  )

  async function handleSubmit(values, file) {
    const photo_url = file ? await uploadPhoto(file) : null
    const created = await addSpot({ ...values, photo_url, lat: draft.lat, lng: draft.lng })
    upsert(created)
    setDraft(null)
    setAddMode(false)
  }

  return (
    <div className="relative h-full w-full">
      <MapView spots={visible} addMode={addMode} draft={draft} onPick={setDraft} />

      <div className="absolute top-3 left-3 z-[1100]">
        <Filters filters={filters} onChange={setFilters} />
      </div>

      <button
        onClick={() => { setAddMode(!addMode); setDraft(null) }}
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-[1100] flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-white font-medium ${
          addMode ? 'bg-red-500' : 'bg-green-600'
        }`}
      >
        {addMode ? <><X size={18} /> Отмена — тапни на карту</> : <><Plus size={18} /> Добавить точку</>}
      </button>

      {draft && <SpotForm onSubmit={handleSubmit} onCancel={() => setDraft(null)} />}
    </div>
  )
}