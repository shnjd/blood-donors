import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner-native"
import { AuthError, AuthUser } from "@supabase/supabase-js"
import { getUser, signIn, signOut } from "../api/auth"
import { queryClient } from "../react-query"

export const useUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    select: (data) => data as AuthUser
  })

export const useSignin = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success(`Logged in ${data?.user?.email ? `as ${data.user.email}` : ''}`)
      // router.push('/app/account')
    },
    onError: (error: AuthError) => {
      console.log(error)
      if (error?.code === 'invalid_credentials') {
        toast.error('Failed to sign in', {
          description: 'Invalid email or password! try again'
        })
      } else toast.error('Failed to sign in')
    }
  })
}

export const useSignout = () => {
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success("Signed out")
      // router.push('/')
    },
    onError: (error) => {
      console.log(error)
    }
  })
}
