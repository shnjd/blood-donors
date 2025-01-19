import { Database } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"
import { IDonorQueries } from "./types"

export const getDonors = async (queries?: IDonorQueries) => {
  try {
    if (queries?.areaId && queries?.bloodGroup) {
      const { data, error } = await supabase.
        from('Donors')
        .select()
        .eq('blood_group', queries.bloodGroup)
        .eq('area_committee', queries.areaId)
      if (error) return Promise.reject(error)
      return Promise.resolve(data)
    }

    if (queries?.areaId) {
      const { data, error } = await supabase.
        from('Donors')
        .select()
        .eq('area_committee', queries.areaId)
      if (error) return Promise.reject(error)
      return Promise.resolve(data)
    }

    if (queries?.bloodGroup) {
      const { data, error } = await supabase.
        from('Donors')
        .select()
        .eq('blood_group', queries.bloodGroup)
      if (error) return Promise.reject(error)
      return Promise.resolve(data)
    }

    const { data, error } = await supabase.
      from('Donors')
      .select()
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

export const addDonor = async (donor: Database['public']['Tables']['Donors']['Insert']) => {
  try {
    const { data, error } = await supabase.
      from('Donors')
      .insert(donor)
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    console.log(err)
    Promise.reject(err)
  }
}
