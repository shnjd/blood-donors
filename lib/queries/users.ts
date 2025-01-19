import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../api/users";

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: listUsers
  })
