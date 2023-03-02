import { useMutation, useQuery } from "react-query";
import { authService } from "@src/frontend/services/auth.service";


export const useCreateUser = (userName: string) => {
  const { isLoading, data: response } = useMutation(
    () => authService.createUser(userName), {
      onError: (error: any) => {
        alert(error.message)
      },
    }
  )
  console.log(12)
  return { isLoading, response, }
}