import api from "./api";

const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

const authService = {

  /* LOGIN */

  async login(
    credentials,
    remember = true
  ){

    const response = await api.post(
      "/auth/login",
      credentials
    );

    const result =
      response.data.data;

    if(!result?.accessToken){

      throw new Error(
        "No access token received"
      );

    }

    const user = {

      id:
        result.userId,

      providerId:
    result.providerId,  

      email:
        result.email,

      role:

        result.role ||

        result.roles?.[0] ||

        "ROLE_CUSTOMER",

      roles:
        result.roles || [],

    };

    const storage =
      remember
        ? localStorage
        : sessionStorage;

    storage.setItem(
      TOKEN_KEY,
      result.accessToken
    );

    storage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );

    return user;
  },

  /* REGISTER */

 /* REGISTER */

async register(formData) {

  const response =
    await api.post(
      "/auth/register",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
},
  /* CURRENT USER */

  async me(){

    const response =
      await api.get(
        "/auth/me"
      );

    return response
      .data
      .data;
  },

  async updateProfile(payload) {

  const response = await api.put(
    "/auth/profile",
    payload
  );

  return response.data.data;
},

  /* LOGOUT */

  logout(){

    localStorage.removeItem(
      TOKEN_KEY
    );

    localStorage.removeItem(
      USER_KEY
    );

    sessionStorage.removeItem(
      TOKEN_KEY
    );

    sessionStorage.removeItem(
      USER_KEY
    );

  },

  getToken(){

    return (

      localStorage.getItem(
        TOKEN_KEY
      ) ||

      sessionStorage.getItem(
        TOKEN_KEY
      )

    );

  },

  getUser(){

    return JSON.parse(

      localStorage.getItem(
        USER_KEY
      ) ||

      sessionStorage.getItem(
        USER_KEY
      ) ||

      "null"

    );

  },

  isAuthenticated(){

    return !!this.getToken();

  },

};

export default authService;