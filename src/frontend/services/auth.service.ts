import axios from "axios";
import instance from "@src/frontend/pages/api/helpers/axios";




export const authService = {
  async createUser( userName: string ) {
    return instance.post('/signUp', userName)
  }
}