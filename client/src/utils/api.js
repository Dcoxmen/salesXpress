import axios from 'axios';
import store from '../mystore';

const api = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  export default api;