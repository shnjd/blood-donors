import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner-native"
import { AuthError, AuthUser } from "@supabase/supabase-js"
import { getUser, signIn } from "../api/auth"
import { router } from "expo-router"

export const useUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    select: (data) => data as AuthUser
  })

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      // router.push('/app/account')
    },
    onError: (error: AuthError) => {
      console.log(error)
      if (error?.code === 'invalid_credentials') {
        toast.error('Failed to login', {
          description: 'Invalid email or password! try again'
        })
      } else toast.error('Failed to login')
    }
  })
}
