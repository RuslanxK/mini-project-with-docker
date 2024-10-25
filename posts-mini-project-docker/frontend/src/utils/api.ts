import axios, { AxiosError, AxiosResponse } from 'axios';

const BASE_URL = process.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

const handleRequest = async <T>(request: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.error('API Error:', error.response.data);
      throw error.response.data;
    } else {
      console.error('API Error:', error);
      throw new Error('API Request failed');
    }
  }
};

export const API_URLS = {
  posts: '/posts',
};

export const getData = <T>(url: string) => handleRequest<T>(api.get<T>(url));

