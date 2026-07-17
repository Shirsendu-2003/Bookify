import { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaBell,
  FaSearch,
  FaChevronDown,
  FaCompressAlt,
  FaExpandAlt,
  FaBookOpen,
} from "react-icons/fa";

import authService from "../../services/authService";

import { useAuth } from "../../hooks/useAuth";
import { useNotifications } from "../../hooks/useNotifications";

export default function Navbar({ setSidebarOpen, collapsed, setCollapsed }) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = authService.getToken();

  const { data: notifications = [], isLoading } = useNotifications(!!token);

  const dropdownRef = useRef(null);

  const notificationRef = useRef(null);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/customer/providers?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  async function handleLogout() {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header
      className="
sticky
top-0
z-30
bg-white
border-b
border-slate-200
shadow-sm
"
    >
      <div
        className="
flex
items-center
justify-between
px-6
py-4
"
      >
        {/* LEFT */}

        <div
          className="
flex
items-center
gap-5
"
        >
          {user && (
            <button
              onClick={() => setSidebarOpen?.(true)}
              className="
lg:hidden
text-slate-700
"
            >
              <FaBars size={22} />
            </button>
          )}

          <div
            className="
flex
items-center
gap-3
"
          >
            <FaBookOpen
              className="
text-blue-600
text-2xl
"
            />

            <h1
              className="
text-2xl
font-bold
text-slate-900
"
            >
              Bookify
            </h1>
          </div>

          {user && (
            <button
              onClick={() => setCollapsed?.(!collapsed)}
              className="
hidden
lg:flex
text-slate-700
"
            >
              {collapsed ? (
                <FaExpandAlt size={18} />
              ) : (
                <FaCompressAlt size={18} />
              )}
            </button>
          )}
        </div>

        {/* SEARCH */}

        {user && (
          <div
            className="
  hidden
  lg:flex
  flex-1
  max-w-xl
  mx-8
  gap-2
  "
          >
            <div
              className="
    relative
    flex-1
    "
            >
              <FaSearch
                className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-slate-400
      "
              />

              <input
                type="text"
                placeholder="Search Technician..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="
      w-full
      rounded-xl
      border
      border-slate-300
      bg-slate-50
      py-2.5
      pl-11
      pr-4
      outline-none
      focus:ring-2
      focus:ring-blue-300
      "
              />
            </div>

            <button
              onClick={() => {
                if (searchTerm.trim()) {
                  navigate(
                    `/customer/providers?search=${encodeURIComponent(
                      searchTerm,
                    )}`,
                  );
                }
              }}
              className="
    px-5
    rounded-xl
    bg-blue-600
    text-white
    hover:bg-blue-700
    "
            >
              Search
            </button>
          </div>
        )}

        {/* RIGHT START */}

        <div
          className="
flex
items-center
gap-6
"
        >
          {!user && (
            <>
              <nav
                className="
      hidden
      md:flex
      items-center
      gap-8
      "
              >
                <Link to="/">Home</Link>

                <Link to="/about">About</Link>

                <Link to="/contact">Contact</Link>

                <Link
                  to="/login"
                  className="
md:hidden
absolute
top-full
left-0
w-full
bg-white
shadow-xl
border-t
border-slate-200
animate-in
slide-in-from-top-2
duration-200
z-50
"
                >
                  Login
                </Link>
              </nav>

              {/* MOBILE MENU BUTTON */}

              <button
                className="
md:hidden
text-slate-700
"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </>
          )}

          {user ? (
            <>
              {/* NOTIFICATIONS */}

              <div
                ref={notificationRef}
                className="
relative
"
              >
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="
relative
text-slate-700
hover:text-blue-600
transition
"
                >
                  <FaBell size={20} />

                  <span
                    className="
absolute
-top-2
-right-2
h-5
w-5
rounded-full
bg-red-500
text-white
text-xs
flex
items-center
justify-center
"
                  >
                    {notifications.length}
                  </span>
                </button>

                {notificationOpen && (
  <div
    className="
fixed
top-16
left-2
right-2
sm:absolute
sm:right-0
sm:left-auto
sm:top-auto
sm:mt-4
sm:w-80
bg-white
rounded-2xl
border
shadow-xl
overflow-hidden
z-[9999]
"
  >
    <div
      className="
px-4
py-3
border-b
font-bold
flex
justify-between
items-center
"
    >
      <span>Notifications</span>

      <span className="text-blue-600 text-sm">
        {Array.isArray(notifications)
  ? notifications.length
  : 0}
      </span>
    </div>

    <div
      className="
max-h-[60vh]
sm:max-h-96
overflow-y-auto
"
    >
      {Array.isArray(notifications)
  ? (
        notifications.map((item) => (
          <div
  key={item.id}
  className="
px-4
py-3
border-b
hover:bg-slate-50
"
>
  <p className="font-semibold text-sm">
    {item.title}
  </p>

  <p
    className="
text-xs
text-slate-500
mt-1
break-words
"
  >
    {item.message}
  </p>
</div>
        ))
      ) : (
        <div className="p-4 text-center text-slate-500">
          No notifications
        </div>
      )}
    </div>
  </div>
)}
              </div>

              {/* PROFILE */}

              <div
                ref={dropdownRef}
                className="
relative
"
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="
flex
items-center
gap-3
"
                >
                  <div
                    className="
h-10
w-10
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
font-bold
"
                  >
                    {user?.firstName
                      ? user.firstName.charAt(0).toUpperCase()
                      : "U"}
                  </div>

                  <div
                    className="
hidden
md:block
"
                  >
                    <p
                      className="
font-semibold
"
                    >
                      {user
                        ? `${user.firstName || ""} ${user.lastName || ""}`
                        : "User"}
                    </p>

                    <p className="text-sm text-slate-500">
  {user?.role === "ROLE_PROVIDER"
    ? "Professional Service"
    : user?.role === "ROLE_CUSTOMER"
      ? "Customer"
      : user?.role === "ROLE_ADMIN"
        ? "Admin"
        : "Member"}
</p>
                  </div>

                  <FaChevronDown />
                </button>

                {dropdownOpen && (
                  <div
                    className="
absolute
right-0
mt-4
w-64
rounded-2xl
bg-white
border
shadow-xl
overflow-hidden
"
                  >
                    <div
                      className="
p-5
border-b
"
                    >
                      <p
                        className="
font-bold
"
                      >
                        {user
                          ? `${user.firstName || ""} ${user.lastName || ""}`
                          : "User"}
                      </p>

                      <p
                        className="
text-sm
text-slate-500
"
                      >
                        {user?.email}
                      </p>
                    </div>

                    <div
                      className="
p-2
"
                    >
                      {/* PROFILE */}

                      <Link
                        to={
                          user?.role === "ROLE_ADMIN"
                            ? "/admin/settings"
                            : user?.role === "ROLE_PROVIDER"
                              ? "/provider/profile"
                              : "/customer/profile"
                        }
                        className="
flex
items-center
gap-3
px-4
py-3
rounded-xl
hover:bg-slate-100
"
                        onClick={() => {
                          setDropdownOpen(false);
                        }}
                      >
                        Profile
                      </Link>

                      {/* FORGOT PASSWORD */}

                      <Link
                        to="/forgot-password"
                        className="
flex
items-center
gap-3
px-4
py-3
rounded-xl
hover:bg-slate-100
"
                        onClick={() => {
                          setDropdownOpen(false);
                        }}
                      >
                        Forgot Password
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="
w-full
flex
items-center
gap-3
px-4
py-3
rounded-xl
text-red-600
hover:bg-red-50
"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden md:block">
              <Link
                to="/login"
                className="
    bg-blue-600
    text-white
    px-5
    py-2.5
    rounded-xl
    font-medium
    hover:bg-blue-700
    transition
    "
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {user && user.role === "ROLE_CUSTOMER" && (

  <div
    className="
    lg:hidden
    px-4
    pb-4
    "
  >

    <div className="flex gap-2">

      <div className="relative flex-1">

        <FaSearch
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          "
        />

        <input
          type="text"
          placeholder="
          Search Technician...
          "
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          onKeyDown={handleSearch}
          className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-slate-50
          py-3
          pl-11
          pr-4
          "
        />

      </div>

      <button
        onClick={() => {

          if (searchTerm.trim()) {

            navigate(
              `/customer/providers?search=${encodeURIComponent(
                searchTerm
              )}`
            );

          }

        }}
        className="
        px-4
        rounded-xl
        bg-blue-600
        text-white
        "
      >
        Search
      </button>

    </div>

  </div>

)}

      {mobileMenuOpen && !user && (
        <div
          className="
      md:hidden
      bg-white
      border-t
      border-slate-200
      shadow-lg
      "
        >
          <Link
            to="/"
            className="
block
px-6
py-4
hover:bg-slate-100
"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about"
            className="
block
px-6
py-4
hover:bg-slate-100
"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="
block
px-6
py-4
hover:bg-slate-100
"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>

          <Link
            to="/login"
            className="
block
px-6
py-4
font-semibold
text-blue-600
hover:bg-slate-100
"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
block
px-6
py-4
font-semibold
text-green-600
hover:bg-slate-100
"
            onClick={() => setMobileMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
}
