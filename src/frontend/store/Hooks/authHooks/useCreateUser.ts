import { useMutation, useQuery } from "react-query";
import { authService } from "@src/frontend/services/auth.service";


export const useCreateUser = (username: string) => {
  const { isLoading, data: response } = useMutation(
    'create user',
    () => authService.createUser(username), {
      onError: (error: any) => {
        alert(error.message)
      },
    }
  )
  return { isLoading, response }
}