/* ====================================== */
/* ENV HELPERS */
/* ====================================== */

const getEnv = (

  key,

  fallback = ""

)=>{

  return (

    import.meta.env[key]

    ??

    fallback

  );

};

/* ====================================== */
/* APP CONFIG */
/* ====================================== */

export const ENV = {

  /* APP */

  APP_NAME:

    getEnv(

      "VITE_APP_NAME",

      "ServiceHub"

    ),

  APP_VERSION:

    getEnv(

      "VITE_APP_VERSION",

      "1.0.0"

    ),

  APP_ENV:

    getEnv(

      "MODE",

      "development"

    ),

  /* API */

  API_URL:

    getEnv(

      "VITE_API_URL",

      "http://localhost:8080/api"

    ),

  API_TIMEOUT:

    Number(

      getEnv(

        "VITE_API_TIMEOUT",

        30000

      )

    ),

  /* AUTH */

  JWT_STORAGE_KEY:

    getEnv(

      "VITE_TOKEN_KEY",

      "accessToken"

    ),

  USER_STORAGE_KEY:

    getEnv(

      "VITE_USER_KEY",

      "user"

    ),

  /* FEATURES */

  ENABLE_ANALYTICS:

    getEnv(

      "VITE_ENABLE_ANALYTICS",

      "false"

    ) === "true",

  ENABLE_DARK_MODE:

    getEnv(

      "VITE_ENABLE_DARK_MODE",

      "true"

    ) === "true",

  ENABLE_PAYMENTS:

    getEnv(

      "VITE_ENABLE_PAYMENTS",

      "true"

    ) === "true",

};

/* ====================================== */
/* ENV FLAGS */
/* ====================================== */

export const IS_DEV =

  import.meta.env.DEV;

export const IS_PROD =

  import.meta.env.PROD;

export const IS_TEST =

  ENV.APP_ENV ===
  "test";

/* ====================================== */
/* LOGGER */
/* ====================================== */

export const logger = {

  log:(...args)=>{

    if(IS_DEV){

      console.log(
        "[APP]",

        ...args
      );

    }

  },

  warn:(...args)=>{

    if(IS_DEV){

      console.warn(
        "[WARN]",

        ...args
      );

    }

  },

  error:(...args)=>{

    console.error(

      "[ERROR]",

      ...args

    );

  },

};

/* ====================================== */
/* EXPORT DEFAULT */
/* ====================================== */

export default ENV;