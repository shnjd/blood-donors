import { useQuery } from "@tanstack/react-query";
import { getArea, getAreas } from "../api/area";

export const useArea = (areaId: number | null) => areaId ?
  useQuery({
    queryKey: ['area', areaId],
    queryFn: () => getArea(areaId)
  }) : { data: null }

export const useAreas = () =>
  useQuery({
    queryKey: ['areas'],
    queryFn: () => getAreas()
  })


