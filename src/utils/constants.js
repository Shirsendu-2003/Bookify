/* ====================================== */
/* API */
/* ====================================== */

export const API = {

  BASE_URL:

    import.meta.env
      .VITE_API_URL ||

    "http://localhost:8080/api",

  TIMEOUT:30000,

};

/* ====================================== */
/* ROLES */
/* ====================================== */

export const ROLES = {

  ADMIN:"ADMIN",

  PROVIDER:"PROVIDER",

  CUSTOMER:"CUSTOMER",

};

/* ====================================== */
/* BOOKING STATUS */
/* ====================================== */

export const BOOKING_STATUS = {

  PENDING:"PENDING",

  CONFIRMED:"CONFIRMED",

  IN_PROGRESS:
    "IN_PROGRESS",

  COMPLETED:"COMPLETED",

  CANCELLED:"CANCELLED",

};

/* ====================================== */
/* PAYMENT STATUS */
/* ====================================== */

export const PAYMENT_STATUS = {

  PENDING:"PENDING",

  PAID:"PAID",

  FAILED:"FAILED",

  REFUNDED:"REFUNDED",

};

/* ====================================== */
/* PAYMENT METHODS */
/* ====================================== */

export const PAYMENT_METHODS = {

  CARD:"CARD",

  UPI:"UPI",

  NET_BANKING:
    "NET_BANKING",

  COD:"COD",

};

/* ====================================== */
/* PROVIDER STATUS */
/* ====================================== */

export const PROVIDER_STATUS = {

  AVAILABLE:
    "AVAILABLE",

  BUSY:"BUSY",

  OFFLINE:"OFFLINE",

};

/* ====================================== */
/* THEMES */
/* ====================================== */

export const THEMES = {

  LIGHT:"light",

  DARK:"dark",

  SYSTEM:"system",

};

/* ====================================== */
/* QUERY KEYS */
/* ====================================== */

export const QUERY_KEYS = {

  AUTH:["auth"],

  BOOKINGS:["bookings"],

  PROVIDERS:["providers"],

  PAYMENTS:["payments"],

  DASHBOARD:["dashboard"],

};

/* ====================================== */
/* PAGINATION */
/* ====================================== */

export const PAGINATION = {

  DEFAULT_PAGE:0,

  DEFAULT_SIZE:10,

  MAX_SIZE:100,

};

/* ====================================== */
/* LOCAL STORAGE KEYS */
/* ====================================== */

export const STORAGE_KEYS = {

  TOKEN:
    "accessToken",

  USER:
    "user",

  THEME:
    "app-theme",

  PREFERENCES:
    "preferences",

};

/* ====================================== */
/* ROUTES */
/* ====================================== */

export const ROUTES = {

  HOME:"/",

  LOGIN:"/login",

  REGISTER:"/register",

  DASHBOARD:
    "/dashboard",

  ADMIN:
    "/admin",

  PROVIDER:
    "/provider",

  CUSTOMER:
    "/customer",

};

/* ====================================== */
/* SWEET ALERT */
/* ====================================== */

export const ALERT_TIMER = {

  SUCCESS:1800,

  ERROR:2500,

  WARNING:2200,

};

/* ====================================== */
/* DATE FORMAT */
/* ====================================== */

export const DATE_FORMATS = {

  SHORT:
    "DD/MM/YYYY",

  LONG:
    "MMMM DD, YYYY",

  TIME:
    "hh:mm A",

  DATETIME:
    "DD/MM/YYYY hh:mm A",

};