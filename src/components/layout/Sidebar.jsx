import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaBriefcase,
  FaStar,
  FaUserCircle,
  FaTimes,
  FaSearch,
  FaClipboardList,
  FaClock,
  FaExclamationTriangle,
  FaUserEdit,
} from "react-icons/fa";


import {useAuthContext} from "../../context/AuthContext";

const menuConfig = {

  ADMIN: [

    { name:"Dashboard", path:"/dashboard/admin", icon:<FaHome/> },
    { name:"Users", path:"/admin/users", icon:<FaUsers/> },
    { name:"Professional Service", path:"/admin/providers", icon:<FaUserTie/> },
    { name: "Professionals Updates", icon: <FaUserEdit />, path: "/admin/providers/provider-update-requests", },
    { name:"Bookings", path:"/admin/bookings", icon:<FaCalendarAlt/> },
    { name:"Payments", path:"/admin/payments", icon:<FaMoneyBillWave/> },
    { name:"Reports", path:"/admin/reports", icon:<FaChartBar/> },
    { name:"Complaints", path:"/admin/complaints", icon:<FaExclamationTriangle/> },
    { name:"Settings", path:"/admin/settings", icon:<FaCog/> },

  ],

  PROVIDER: [

    { name:"Dashboard", path:"/dashboard/provider", icon:<FaHome/> },
    { name:"Jobs", path:"/provider/jobs", icon:<FaBriefcase/> },
    { name:"Availability", path:"/provider/availability", icon:<FaClock/> },
    { name:"Earnings", path:"/provider/earnings", icon:<FaMoneyBillWave/> },
    { name:"Reviews", path:"/provider/reviews", icon:<FaStar/> },
     {
      name:"Complaints",
      path:"/provider/complaints",
      icon:<FaExclamationTriangle/>
    },
    { name:"Profile", path:"/provider/profile", icon:<FaUserCircle/> },

  ],

  CUSTOMER: [

    { name:"Dashboard", path:"/dashboard/customer", icon:<FaHome/> },

    

    { name:"Instant Booking", path:"/customer/instant-booking", icon:<FaClock/> },

    { name:"My Bookings", path:"/customer/bookings", icon:<FaCalendarAlt/> },

    { name:"Payments", path:"/customer/payments", icon:<FaMoneyBillWave/> },

    { name:"Professional Services", path:"/customer/providers", icon:<FaSearch/> },

    { name:"Reviews", path:"/customer/reviews", icon:<FaStar/> },

    { name:"Profile", path:"/customer/profile", icon:<FaUserCircle/> },
    { name:"Complaints", path:"/customer/complaints", icon:<FaExclamationTriangle/> },
  ],

};

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
}) {

  const {

    user,

  } = useAuthContext();



  const role = (

    user?.role ||

    user?.roles?.[0] ||

    "ROLE_CUSTOMER"

  )

    .replace(
      "ROLE_",
      ""
    )

    .toUpperCase();



  const menus =
    menuConfig[role] || [];

  return (
    <>

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
fixed
inset-0
bg-black/40
z-40
lg:hidden
"
        />

      )}

      <aside
        className={`

fixed
lg:static
top-0
left-0
z-50
h-screen
bg-slate-900
text-white
transition-all
duration-300
flex
flex-col

${collapsed ? "w-[90px]" : "w-[270px]"}

${sidebarOpen
? "translate-x-0"
: "-translate-x-full lg:translate-x-0"}

`}
      >

        {/* HEADER */}

        <div
          className="
flex
items-center
justify-between
p-5
border-b
border-slate-800
"
        >

          {!collapsed && (

            <h1
              className="
text-2xl
font-bold
text-blue-400
"
            >

              Bookify

            </h1>

          )}

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="lg:hidden"
          >

            <FaTimes size={22}/>

          </button>

        </div>

        {/* USER */}

       {/* USER */}

<div
  className="
px-4
py-5
border-b
border-slate-800
"
>

  <div
    className="
flex
items-center
gap-3
"
  >

    <div
      className="
h-12
w-12
rounded-full
bg-blue-600
flex
items-center
justify-center
text-lg
font-bold
"
    >

      {
        user?.firstName
          ?.charAt(0)
          ?.toUpperCase()

        ||

        "U"
      }

    </div>

    {!collapsed && (

      <div>

        <h3
          className="
font-semibold
"
        >

          {
            user

            ?

            `${

              user.firstName || ""

            } ${

              user.lastName || ""

            }`

            :

            "Guest User"
          }

        </h3>

      </div>

    )}

  </div>

</div>

        {/* NAVIGATION */}

        <nav
          className="
flex-1
px-3
py-5
overflow-y-auto
"
        >

          <ul className="space-y-2">

            {menus.map((item) => (

              <li key={item.path}>

                <NavLink
                  to={item.path}
                  className={({
                    isActive,
                  }) => `

flex
items-center
gap-3
rounded-xl
px-4
py-3
transition-all

${
isActive
? "bg-blue-600 text-white"
: "text-slate-300 hover:bg-slate-800"
}

`}
                >

                  <span className="text-lg">

                    {item.icon}

                  </span>

                  {!collapsed && (

                    <span className="font-medium">

                      {item.name}

                    </span>

                  )}

                </NavLink>

              </li>

            ))}

          </ul>

        </nav>
        {/* FOOTER */}

{/* FOOTER */}

<div className="border-t border-slate-800 p-4">
  {!collapsed ? (
    <div className="flex items-center justify-between text-xs text-slate-400">
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Online
      </span>

      <span>Bookify • v1.0</span>
    </div>
  ) : (
    <div className="flex justify-center">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
    </div>
  )}
</div>

       

      </aside>

    </>
  );

}