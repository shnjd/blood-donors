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
        .order('last_donated_on')
      if (error) return Promise.reject(error)
      return Promise.resolve(data)
    }

    if (queries?.areaId) {
      const { data, error } = await supabase.
        from('Donors')
        .select()
        .eq('area_committee', queries.areaId)
        .order('last_donated_on')
      if (error) return Promise.reject(error)
      return Promise.resolve(data)
    }

    if (queries?.bloodGroup) {
      const { data, error } = await supabase.
        from('Donors')
        .select()
        .eq('blood_group', queries.bloodGroup)
        .order('last_donated_on')
      if (error) return Promise.reject(error)
      return Promise.resolve(data)
    }

    const { data, error } = await supabase.
      from('Donors')
      .select()
      .order('last_donated_on')
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
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
    Promise.reject(err)
  }
}

export const updateDonor = async (payload: { donorId: number, donor: Database['public']['Tables']['Donors']['Insert'] }) => {
  try {
    const { data, error } = await supabase.
      from('Donors')
      .update(payload.donor)
      .eq('id', payload.donorId)
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    Promise.reject(err)
  }
}

export const removeDonor = async (donorId: number) => {
  try {
    console.log('id', donorId)
    const { data, error } = await supabase.
      from('Donors')
      .delete()
      .eq('id', donorId)
      .select()
    console.log(data, error)
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    Promise.reject(err)
  }
}
