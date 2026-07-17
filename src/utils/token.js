import {
  STORAGE_KEYS,
} from "./constants";

/* ====================================== */
/* STORAGE */
/* ====================================== */

const ACCESS_KEY =

  STORAGE_KEYS.TOKEN;

/* ====================================== */
/* TOKEN STORAGE */
/* ====================================== */

export function setToken(

  token,

  remember=true

){

  if(!token) return;

  if(remember){

    localStorage.setItem(

      ACCESS_KEY,

      token

    );

  }else{

    sessionStorage.setItem(

      ACCESS_KEY,

      token

    );

  }

}

export function getToken(){

  return(

    localStorage.getItem(
      ACCESS_KEY
    )

    ||

    sessionStorage.getItem(
      ACCESS_KEY
    )

  );

}

export function removeToken(){

  localStorage.removeItem(
    ACCESS_KEY
  );

  sessionStorage.removeItem(
    ACCESS_KEY
  );

}

/* ====================================== */
/* JWT DECODE */
/* ====================================== */

export function decodeToken(

  token = getToken()

){

  try{

    if(!token){

      return null;

    }

    const payload =

      token.split(".")[1];

    const decoded =

      atob(payload);

    return JSON.parse(
      decoded
    );

  }catch(error){

    console.error(

      "JWT decode error:",

      error

    );

    return null;

  }

}

/* ====================================== */
/* EXPIRATION */
/* ====================================== */

export function isTokenExpired(

  token = getToken()

){

  const decoded =

    decodeToken(token);

  if(

    !decoded?.exp

  ){

    return true;

  }

  const currentTime =

    Math.floor(

      Date.now()/1000

    );

  return(

    decoded.exp <=
    currentTime

  );

}

/* ====================================== */
/* AUTH */
/* ====================================== */

export function isAuthenticated(){

  const token =
    getToken();

  if(!token){

    return false;

  }

  return !isTokenExpired(
    token
  );

}

/* ====================================== */
/* USER */
/* ====================================== */

export function getUserFromToken(){

  const decoded =

    decodeToken();

  if(!decoded){

    return null;

  }

  return {

    id:
      decoded.sub ||

      decoded.id,

    email:
      decoded.email,

    role:
      decoded.role,

    exp:
      decoded.exp,

  };

}

/* ====================================== */
/* CLEAR SESSION */
/* ====================================== */

export function clearSession(){

  removeToken();

  localStorage.removeItem(
    STORAGE_KEYS.USER
  );

  sessionStorage.clear();

}

/* ====================================== */
/* AUTH HEADER */
/* ====================================== */

export function getAuthHeader(){

  const token =
    getToken();

  return token

    ? {

      Authorization:
      `Bearer ${token}`,

    }

    : {};

}