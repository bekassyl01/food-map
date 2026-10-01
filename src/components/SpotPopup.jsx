export default function SpotPopup({ spot }) {
  return (
    <div className="w-56">
      {spot.photo_url && (
        <img src={spot.photo_url} alt={spot.title} className="w-full h-32 object-cover rounded mb-2" />
      )}
      <div className="font-semibold text-base">{spot.title}</div>
      <div className="text-lg font-bold text-green-600">
        {Number(spot.price).toLocaleString('ru-RU')} {spot.currency === 'KZT' ? '₸' : spot.currency}
      </div>
      <span className="inline-block text-xs bg-gray-100 rounded px-2 py-0.5 my-1">{spot.category}</span>
      {spot.description && <p className="text-sm text-gray-700 my-1">{spot.description}</p>}
      <div className="text-xs text-gray-400">
        Добавлено: {new Date(spot.created_at).toLocaleDateString('ru-RU')}
      </div>
    </div>
  )
}