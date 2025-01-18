import { supabase } from "@/lib/supabase";

export const signIn = async ({ email, password }: ISigninRequest) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) return Promise.reject(error)
    return Promise.resolve()
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) return Promise.reject(error)
    return Promise.resolve(user)
  } catch (err) {
    return Promise.reject(err)
  }
}
