import { authAdmin } from "@/lib/supabase"

export const listUsers = async () => {
  try {
    const { data, error } = await authAdmin.listUsers()
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    Promise.reject(err)
  }
}

export const getStaff = async (userId: string) => {
  try {
    const { data, error } = await authAdmin.getUserById(userId)
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    Promise.reject(err)
  }
}

export const createUser = async (user: ICreateUserRequest) => {
  try {
    const { data, error } = await authAdmin.createUser({ ...user, email_confirm: true })
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    Promise.reject(err)
  }
}

export const updateUser = async (payload: { userId: string, user: Partial<ICreateUserRequest> }) => {
  try {
    const { data, error } = await authAdmin.updateUserById(payload.userId, payload.user)
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    Promise.reject(err)
  }
}

export const removeUser = async (userId: string) => {
  try {
    const { data, error } = await authAdmin.deleteUser(userId)
    if (error) return Promise.reject(error)
    return Promise.resolve(data)
  } catch (err) {
    Promise.reject(err)
  }
}
