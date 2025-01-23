import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, getStaff, listUsers, removeUser, updateUser } from "../api/users";
import { queryClient } from "../react-query";
import { toast } from "sonner-native";
import { router } from "expo-router";

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: listUsers
  })

export const useStaff = (userId: string) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => getStaff(userId)
  })


export const useCreateUser = () =>
  useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success("Added new staff")
    },
    onError: (err) => {
      toast.error('Failed to save changes! try again')
    }
  })

export const useUpdateUser = () =>
  useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Saved changes to staff')
    },
    onError: (err) => {
      toast.error('Failed to save changes! try again')
    }
  })

export const useRemoveUser = () =>
  useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Deleted staff')
      router.push('/app/(tabs)/staffs')
    },
    onError: (err) => {
      toast.error('Failed to delete. try again')
    }
  })

