import { supabase } from "@/lib/supabase";

const authApi = {
  signIn: async ({ email, password }: ILoginRequest) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return Promise.reject(error)
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  },
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) return Promise.reject(error)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default authApi
