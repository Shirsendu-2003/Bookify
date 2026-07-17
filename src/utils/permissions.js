import { ROLES } from "./constants";

/* ====================================== */
/* PERMISSIONS MAP */
/* ====================================== */

export const PERMISSIONS = {

  /* ADMIN */

  MANAGE_USERS:
    "MANAGE_USERS",

  MANAGE_PROVIDERS:
    "MANAGE_PROVIDERS",

  MANAGE_BOOKINGS:
    "MANAGE_BOOKINGS",

  MANAGE_PAYMENTS:
    "MANAGE_PAYMENTS",

  VIEW_REPORTS:
    "VIEW_REPORTS",

  SYSTEM_SETTINGS:
    "SYSTEM_SETTINGS",

  /* PROVIDER */

  MANAGE_SERVICES:
    "MANAGE_SERVICES",

  MANAGE_AVAILABILITY:
    "MANAGE_AVAILABILITY",

  VIEW_PROVIDER_DASHBOARD:
    "VIEW_PROVIDER_DASHBOARD",

  ACCEPT_BOOKINGS:
    "ACCEPT_BOOKINGS",

  VIEW_EARNINGS:
    "VIEW_EARNINGS",

  /* CUSTOMER */

  CREATE_BOOKING:
    "CREATE_BOOKING",

  CANCEL_BOOKING:
    "CANCEL_BOOKING",

  VIEW_CUSTOMER_DASHBOARD:
    "VIEW_CUSTOMER_DASHBOARD",

  WRITE_REVIEW:
    "WRITE_REVIEW",

  MAKE_PAYMENT:
    "MAKE_PAYMENT",

};

/* ====================================== */
/* ROLE → PERMISSIONS */
/* ====================================== */

export const ROLE_PERMISSIONS = {

  [ROLES.ADMIN]: [

    PERMISSIONS.MANAGE_USERS,

    PERMISSIONS.MANAGE_PROVIDERS,

    PERMISSIONS.MANAGE_BOOKINGS,

    PERMISSIONS.MANAGE_PAYMENTS,

    PERMISSIONS.VIEW_REPORTS,

    PERMISSIONS.SYSTEM_SETTINGS,

  ],

  [ROLES.PROVIDER]: [

    PERMISSIONS.MANAGE_SERVICES,

    PERMISSIONS.MANAGE_AVAILABILITY,

    PERMISSIONS.VIEW_PROVIDER_DASHBOARD,

    PERMISSIONS.ACCEPT_BOOKINGS,

    PERMISSIONS.VIEW_EARNINGS,

  ],

  [ROLES.CUSTOMER]: [

    PERMISSIONS.CREATE_BOOKING,

    PERMISSIONS.CANCEL_BOOKING,

    PERMISSIONS.VIEW_CUSTOMER_DASHBOARD,

    PERMISSIONS.WRITE_REVIEW,

    PERMISSIONS.MAKE_PAYMENT,

  ],

};

/* ====================================== */
/* PERMISSION CHECK */
/* ====================================== */

export function hasPermission(

  role,

  permission

){

  if(!role){

    return false;

  }

  return (

    ROLE_PERMISSIONS[
      role
    ]?.includes(
      permission
    ) || false

  );

}

/* ====================================== */
/* MULTIPLE PERMISSIONS */
/* ====================================== */

export function hasAnyPermission(

  role,

  permissions=[]

){

  return permissions.some(

    (permission)=>

      hasPermission(

        role,

        permission

      )

  );

}

export function hasAllPermissions(

  role,

  permissions=[]

){

  return permissions.every(

    (permission)=>

      hasPermission(

        role,

        permission

      )

  );

}

/* ====================================== */
/* ROLE CHECK */
/* ====================================== */

export function hasRole(

  userRole,

  allowedRoles=[]

){

  return allowedRoles.includes(
    userRole
  );

}

/* ====================================== */
/* ROUTE ACCESS */
/* ====================================== */

export const ROUTE_ACCESS = {

  "/admin":[
    ROLES.ADMIN,
  ],

  "/provider":[
    ROLES.PROVIDER,
  ],

  "/customer":[
    ROLES.CUSTOMER,
  ],

  "/dashboard":[

    ROLES.ADMIN,

    ROLES.PROVIDER,

    ROLES.CUSTOMER,

  ],

};

export function canAccessRoute(

  userRole,

  route

){

  const allowed =

    ROUTE_ACCESS[
      route
    ];

  if(!allowed){

    return true;
  }

  return allowed.includes(
    userRole
  );

}

/* ====================================== */
/* FEATURE GUARDS */
/* ====================================== */

export function canManageUsers(
  role
){

  return hasPermission(

    role,

    PERMISSIONS
      .MANAGE_USERS

  );

}

export function canCreateBooking(
  role
){

  return hasPermission(

    role,

    PERMISSIONS
      .CREATE_BOOKING

  );

}

export function canAcceptBookings(
  role
){

  return hasPermission(

    role,

    PERMISSIONS
      .ACCEPT_BOOKINGS

  );

}

export function canManagePayments(
  role
){

  return hasPermission(

    role,

    PERMISSIONS
      .MANAGE_PAYMENTS

  );

}

export function canViewReports(
  role
){

  return hasPermission(

    role,

    PERMISSIONS
      .VIEW_REPORTS

  );

}