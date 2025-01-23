import { supabase } from "@/lib/supabase"

export const getArea = async (areaId: number) => {
  try {
    const { data, error } = await supabase
      .from('AreaCommittee')
      .select()
      .eq('id', areaId)
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getAreas = async () => {
  try {
    const { data, error } = await supabase
      .from('AreaCommittee')
      .select()
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}
