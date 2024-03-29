import axios, { AxiosRequestConfig } from 'axios';
import store from "@src/frontend/store";

const instance = axios.create({
  baseURL: 'https://support-chat-api.vsquad.ru',
});

instance.interceptors.request.use(setTokenToHeaders as any)

function setTokenToHeaders(config: AxiosRequestConfig) {
  const state = store.getState()
  if (state.auth.token && config && config.headers) {
    config.headers.Authorization = 'Bearer ' + state.auth.token
  }
  return config
}

export default instance;
