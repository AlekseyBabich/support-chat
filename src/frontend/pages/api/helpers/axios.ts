import axios from 'axios';
import store from "@src/frontend/store";

const instance = axios.create({
  baseURL: 'http://localhost:5100',
  headers: {
    Authorization: `Bearer ${store.getState().auth.token}`
  }
});

export default instance;