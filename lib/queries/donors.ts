import { useMutation, useQuery } from "@tanstack/react-query";
import { addDonor, getDonors } from "../api/donors";
import { toast } from "sonner-native";
import { queryClient } from "../react-query";
import { BloodGroup } from "../constants/enums";

export const useDonors = (queries?: { bloodGroup?: string | string[], areaId?: string | string[] }) => {
  const area = queries?.areaId && !isNaN(Number(queries.areaId)) ? Number(queries?.areaId) : undefined
  // @ts-ignore
  const bg = queries?.bloodGroup && typeof queries.bloodGroup === 'string' ? BloodGroup[queries.bloodGroup] : undefined

  return useQuery({
    queryKey: ['donors', ...(area ? [area] : []), ...(bg ? [bg] : [])],
    queryFn: () => getDonors({ bloodGroup: bg, areaId: area }),
  })
}

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
