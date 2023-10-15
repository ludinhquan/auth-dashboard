import api from "@/api/$api";
import aspida from "@aspida/axios";
import Axios from "axios";

// Add a response interceptor

const axios = Axios.create();
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // return axios.request(error.config);
    }

    return Promise.reject(error);
  },
);

export const aspidaClient = api(
  aspida(axios, {
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
  }),
);
