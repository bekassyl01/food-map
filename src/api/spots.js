import { supabase } from '../lib/supabase'

export async function getSpots() {
  const { data, error } = await supabase
    .from('spots')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function uploadPhoto(file) {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('spot-photos').upload(path, file)
  if (error) throw error
  return supabase.storage.from('spot-photos').getPublicUrl(path).data.publicUrl
}

export async function addSpot(spot) {
  const { data, error } = await supabase.from('spots').insert(spot).select().single()
  if (error) throw error
  return data
}