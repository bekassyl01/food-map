import { useState } from 'react'
import { CATEGORIES, CURRENCIES } from '../constants'

export default function SpotForm({ onSubmit, onCancel }) {
  const [values, setValues] = useState({
    title: '', category: CATEGORIES[0], price: '', currency: 'KZT', description: '',
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setValues({ ...values, [k]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await onSubmit({ ...values, price: Number(values.price) }, file)
    } catch (err) {
      setError(err.message || 'Ошибка сохранения')
      setLoading(false)
    }
  }

  const input = 'w-full border rounded px-3 py-2 text-sm'

  return (
    <div className="fixed inset-0 z-[1200] bg-black/40 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-5 space-y-3">
        <h2 className="text-lg font-semibold">Новая точка</h2>

        <input required placeholder="Название (например, Кусок пиццы)" value={values.title} onChange={set('title')} className={input} />

        <select value={values.category} onChange={set('category')} className={input}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>

        <div className="flex gap-2">
          <input required type="number" min="0" step="any" placeholder="Цена" value={values.price} onChange={set('price')} className={input} />
          <select value={values.currency} onChange={set('currency')} className="border rounded px-2 py-2 text-sm">
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <textarea rows="3" placeholder="Описание / комментарий" value={values.description} onChange={set('description')} className={input} />

        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} className="text-sm" />

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onCancel} className="flex-1 border rounded py-2 text-sm">Отмена</button>
          <button disabled={loading} className="flex-1 bg-green-600 text-white rounded py-2 text-sm disabled:opacity-50">
            {loading ? 'Сохранение…' : 'Добавить'}
          </button>
        </div>
      </form>
    </div>
  )
}