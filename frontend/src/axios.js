import axios from 'axios'
import { API_URL } from "./config";

const client = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export default client;
