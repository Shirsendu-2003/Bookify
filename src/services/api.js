import axios from "axios";

const API_BASE_URL =

  import.meta.env.VITE_API_URL ||

  "http://localhost:8080/api";

const api = axios.create({

  baseURL: API_BASE_URL,

  timeout: 30000,

  headers: {

    "Content-Type":
      "application/json",

  },

});

/* ----------------------- */
/* TOKEN HELPERS */
/* ----------------------- */

const getToken = () => {

    return (

        localStorage.getItem(
            "accessToken"
        )

        ||

        sessionStorage.getItem(
            "accessToken"
        )

    );

};


/* ----------------------- */
/* REQUEST INTERCEPTOR */
/* ----------------------- */

api.interceptors.request.use(

  (config)=>{

    const token =
      getToken();

    if(token){

      config.headers.Authorization =

        `Bearer ${token}`;

    }

    return config;

  },

  (error)=>

    Promise.reject(error)

);

/* ----------------------- */
/* RESPONSE INTERCEPTOR */
/* ----------------------- */

api.interceptors.response.use(

  (response)=>response,

  async(error)=>{

    const status =

      error.response?.status;

    const originalRequest =
      error.config;

    /* 401 Unauthorized */

    if(

      status===401

      &&

      !originalRequest?._retry

    ){

      originalRequest._retry =
        true;

      try{

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "user"
        );

        if(

          window.location.pathname
          !== "/login"

        ){

          window.location.href =
            "/login";

        }

      }catch(interceptorError){

        console.error(

          "Interceptor Error:",

          interceptorError

        );

      }

    }

    return Promise.reject(

      {

        message:

          error.response?.data
            ?.message ||

          error.message ||

          "Request failed",

        status,

        data:
          error.response?.data,

      }

    );

  }

);

export default api;