import { NavLink } from "react-router-dom";
import authService from "../../services/authService";

import {
  FaHome,
  FaBolt,
  FaCalendarAlt,
  FaWallet,
  FaUser,
  FaBriefcase,
  FaCalendarCheck,
  FaStar,
  FaUsers,
  FaUserTie,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

export default function BottomNavigation() {

  const user = authService.getUser();

  let menu = [];

  if (user?.role === "ROLE_ADMIN") {

    menu = [
      { label:"Home", path:"/dashboard/admin", icon:<FaHome/> },
      { label:"Users", path:"/admin/users", icon:<FaUsers/> },
      { label:"Providers", path:"/admin/providers", icon:<FaUserTie/> },
      { label:"Reports", path:"/admin/reports", icon:<FaChartBar/> },
      { label:"Settings", path:"/admin/settings", icon:<FaCog/> }
    ];

  } else if (user?.role === "ROLE_PROVIDER") {

    menu = [
      { label:"Home", path:"/dashboard/provider", icon:<FaHome/> },
      { label:"Jobs", path:"/provider/jobs", icon:<FaBriefcase/> },
      { label:"Schedule", path:"/provider/availability", icon:<FaCalendarCheck/> },
      { label:"Reviews", path:"/provider/reviews", icon:<FaStar/> },
      { label:"Profile", path:"/provider/profile", icon:<FaUser/> }
    ];

  } else {

    menu = [
      { label:"Home", path:"/dashboard/customer", icon:<FaHome/> },
      {
  label: "Instant",
  path: "/customer/instant-booking",
  icon: <FaBolt />
},
      { label:"Bookings", path:"/customer/bookings", icon:<FaCalendarAlt/> },
      { label:"Payments", path:"/customer/payments", icon:<FaWallet/> },
      { label:"Profile", path:"/customer/profile", icon:<FaUser/> }
    ];

  }

  return (
    <div
      className="
      md:hidden
      fixed
      bottom-4
      left-1/2
      -translate-x-1/2
      w-[95%]
      max-w-md
      bg-white
      rounded-3xl
      shadow-xl
      border
      border-slate-200
      z-50
      "
    >
      <div className="flex justify-around py-3">

        {menu.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex
              flex-col
              items-center
              gap-1
              px-3
              py-2
              rounded-xl
              transition

              ${
                isActive
                ? "bg-orange-50 text-orange-500"
                : "text-slate-500"
              }
            `}
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="text-xs">
              {item.label}
            </span>

          </NavLink>

        ))}

      </div>
    </div>
  );
}