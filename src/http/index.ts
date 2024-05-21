import { BASE_URL_API_URL } from '@/consts';
import axios from 'axios';

export default axios.create({
  baseURL: BASE_URL_API_URL,
});
