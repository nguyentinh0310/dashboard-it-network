import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "utils";

const axiosClient = axios.create({
  baseURL: "https://it-network-api.herokuapp.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    // Attach token to request if exists
    // Refresh token
    const accessToken: any = localStorage.getItem("access_token");

    if (accessToken) {
      let headers: any = config.headers;
      headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data; // lấy data
  },
  function (error) {
    toast.error(error.response.data.message);
    console.log("error.response", error.response.data.message);
    if (!error.response) {
      throw new Error("Network error. Please try again later.");
    }

    // redirect to login if not login
    if (error.response.status === 401) {
      // clear token, logout
      history.push("/login");
      localStorage.removeItem("access_token");
      return Promise.reject(error);
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
