import { authAdmin } from "@/lib/supabase"

export const listUsers = async () => {
  try {
    const { data, error } = await authAdmin.listUsers()
    if (error) return Promise.reject(error)
    console.log(error)
    return Promise.resolve(data)
  } catch (err) {
    console.log(err)
    Promise.reject(err)
  }
}
