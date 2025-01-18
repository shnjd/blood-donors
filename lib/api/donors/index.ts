import { Database } from "@/lib/database.types"
import { supabase } from "@/lib/supabase"

export const getDonors = async () => {
  try {
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
