import {

  FaHome,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaBriefcase,
  FaCalendarAlt,
  FaStar,
  FaUserCircle,

} from "react-icons/fa";

import { ROLES } from
"../utils/constants";

/* ====================================== */
/* CUSTOMER SIDEBAR */
/* ====================================== */

const customerSidebar = [

  {

    label:"Dashboard",

    path:"/customer",

    icon:FaHome,

  },

  {

    label:"Search Providers",

    path:
      "/customer/providers",

    icon:FaUsers,

  },

  {

    label:"Create Booking",

    path:
      "/customer/bookings/create",

    icon:FaClipboardList,

  },

  {

    label:"My Bookings",

    path:
      "/customer/bookings",

    icon:FaBriefcase,

  },

  {

    label:"Payments",

    path:
      "/customer/payments",

    icon:FaMoneyBillWave,

  },

  {

    label:"Reviews",

    path:
      "/customer/reviews",

    icon:FaStar,

  },

  {

    label:"Profile",

    path:
      "/customer/profile",

    icon:FaUserCircle,

  },

];

/* ====================================== */
/* PROVIDER SIDEBAR */
/* ====================================== */

const providerSidebar = [

  {

    label:"Dashboard",

    path:"/provider",

    icon:FaHome,

  },

  {

    label:"Jobs",

    path:
      "/provider/jobs",

    icon:FaBriefcase,

  },

  {

    label:"Availability",

    path:
      "/provider/availability",

    icon:FaCalendarAlt,

  },

  {

    label:"Earnings",

    path:
      "/provider/earnings",

    icon:FaMoneyBillWave,

  },

  {

    label:"Reviews",

    path:
      "/provider/reviews",

    icon:FaStar,

  },

  {

    label:"Profile",

    path:
      "/provider/profile",

    icon:FaUserCircle,

  },

];

/* ====================================== */
/* ADMIN SIDEBAR */
/* ====================================== */

const adminSidebar = [

  {

    label:"Dashboard",

    path:"/admin",

    icon:FaHome,

  },

  {

    label:"Users",

    path:
      "/admin/users",

    icon:FaUsers,

  },

  {

    label:"Providers",

    path:
      "/admin/providers",

    icon:FaUserTie,

  },

  {

    label:"Bookings",

    path:
      "/admin/bookings",

    icon:FaClipboardList,

  },

  {

    label:"Payments",

    path:
      "/admin/payments",

    icon:FaMoneyBillWave,

  },

  {

    label:"Reports",

    path:
      "/admin/reports",

    icon:FaChartBar,

  },

  {

    label:"Settings",

    path:
      "/admin/settings",

    icon:FaCog,

  },

];

/* ====================================== */
/* ROLE MAP */
/* ====================================== */

export const SIDEBAR_CONFIG = {

  [ROLES.ADMIN]:
    adminSidebar,

  [ROLES.PROVIDER]:
    providerSidebar,

  [ROLES.CUSTOMER]:
    customerSidebar,

};

/* ====================================== */
/* HELPERS */
/* ====================================== */

export function getSidebarByRole(

  role

){

  return (

    SIDEBAR_CONFIG[
      role
    ]

    ||

    []

  );

}

export function hasSidebarAccess(

  role,

  path

){

  return getSidebarByRole(
    role
  ).some(

    (item)=>

      item.path === path

  );

}

export default SIDEBAR_CONFIG;