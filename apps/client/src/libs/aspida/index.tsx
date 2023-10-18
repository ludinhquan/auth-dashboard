import api from "@/api/$api";
import { getConfig } from "@/config";
import aspida from "@aspida/axios";
import Axios from "axios";

// Add a response interceptor

export const handleRefreshToken = async () => {
  try {
    await aspidaClient.refresh.get();
  } catch (error) {
    window.location.pathname = "/login";
  }
};

const axios = Axios.create();
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await handleRefreshToken();
      return axios.request(error.config);
    }

    return Promise.reject(error);
  },
);

export const aspidaClient = api(
  aspida(axios, {
    baseURL: getConfig().apiEndpoint,
    withCredentials: true,
  }),
);
