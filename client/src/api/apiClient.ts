import axios from 'axios';

const baseURL = process.env.SERVER;

const apiClient = axios.create({baseURL});

export default apiClient;
