import axios from 'axios';
import backend from '@config/backend'

const instance = axios.create({
    baseURL: backend.baseApiURL,
});

export default instance;