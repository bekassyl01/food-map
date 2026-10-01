import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import icon2x from 'leaflet/dist/images/marker-icon-2x.png'
import shadow from 'leaflet/dist/images/marker-shadow.png'
import SpotPopup from './SpotPopup'
import { DEFAULT_CENTER } from '../constants'
import 'leaflet/dist/leaflet.css'

L.Icon.Default.mergeOptions({ iconUrl: icon, iconRetinaUrl: icon2x, shadowUrl: shadow })

function ClickHandler({ enabled, onPick }) {
  useMapEvents({
    click(e) {
      if (enabled) onPick(e.latlng)
    },
  })
  return null
}

export default function MapView({ spots, addMode, draft, onPick }) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={13}
      className={`h-full w-full ${addMode ? 'add-mode' : ''}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler enabled={addMode} onPick={onPick} />

      {spots.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng]}>
          <Popup><SpotPopup spot={s} /></Popup>
        </Marker>
      ))}

      {draft && <Marker position={[draft.lat, draft.lng]} opacity={0.6} />}
    </MapContainer>
  )
}