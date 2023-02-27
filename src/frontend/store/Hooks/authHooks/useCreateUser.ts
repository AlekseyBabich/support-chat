import { useMutation, useQuery } from "react-query";
import { authService } from "@src/frontend/services/auth.service";


export const useCreateUser = (userName: string) => {
  const { isLoading, data: response } = useMutation(
    'create user',
    () => authService.createUser(userName), {
      onError: (error: any) => {
        alert(error.message)
      },
    }
  )
  return { isLoading, response, }
}