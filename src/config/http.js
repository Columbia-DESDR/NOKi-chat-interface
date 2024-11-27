import axios from "axios";
import {get} from "lodash";

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000', // for local testing
  baseURL: 'https://fist-noki.iri.columbia.edu/',// for prod
  withCredentials: true , 
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config)
    const authToken = localStorage.getItem("auth");
    if (authToken) {
      config.headers = {...config.headers, Authorization: 'Bearer ' + authToken}
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('oops: ', get(error, 'response.status'))
    if (get(error, 'response.status') === 401) {
      window.location.href = window.location.origin + '/chat'
    }
    return Promise.reject(error);
  }
);