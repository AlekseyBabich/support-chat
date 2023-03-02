import instance from "@src/frontend/pages/api/helpers/axios";




export const authService = {
  async createUser( userName: string ) {
    return instance.post('/signUp', { userName: userName })
  },

  async loginUser( userName: string ) {
    return instance.post('/login', { userName: userName })
  }
}