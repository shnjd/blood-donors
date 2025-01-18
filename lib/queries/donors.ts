import { useMutation, useQuery } from "@tanstack/react-query";
import { addDonor, getDonors } from "../api/donors";
import { toast } from "sonner-native";
import { queryClient } from "../react-query";

export const useDonors = () =>
  useQuery({
    queryKey: ['donors'],
    queryFn: getDonors,
  })

export const useAddDonor = () =>
  useMutation({
    mutationFn: addDonor,
    onSuccess: () => {
      toast.success('Added Donor')
      queryClient.invalidateQueries({ queryKey: ['donors'] })
    },
    onError: (error) => {
      console.log(error)
      toast.error('Failed add donor! try again later')
    }
  })
