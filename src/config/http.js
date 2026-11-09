import axios from "axios";

export const axiosInstance = axios.create({
  // In `npm start`, call the dev server, which forwards to Noki (see "proxy" in
  // package.json). The session cookie then belongs to localhost, so the browser
  // keeps sending it and the game state survives between messages.
  baseURL: process.env.NODE_ENV === 'development'
    ? '/'
    : 'https://fist-noki.iri.columbia.edu/', // for prod
  withCredentials: true ,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const authToken = localStorage.getItem("auth");
    if (authToken) {
      config.headers.Authorization = 'Bearer ' + authToken;
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
    const status = error.response?.status;
    console.log('oops: ', status)
    // Send the user back to the home page (respecting the GitHub Pages
    // basename). Skip if already there to avoid a reload loop.
    const home = process.env.PUBLIC_URL + '/';
    if (status === 401 && window.location.pathname !== home) {
      window.location.href = window.location.origin + home;
    }
    return Promise.reject(error);
  }
);
