import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaUsers,
  FaCalendarCheck,
} from "react-icons/fa";

export default function AuthLayout({
  children,
  title = "Welcome Back",
  subtitle = "Access your account securely.",
}) {

  return (

    <div
      className="

min-h-screen
grid
lg:grid-cols-2
bg-slate-100

"
    >

      {/* LEFT PANEL */}

      <div
        className="

hidden
lg:flex
relative
overflow-hidden

bg-gradient-to-br
from-blue-700
via-indigo-700
to-slate-900

text-white
p-12

"
      >

        {/* BACKGROUND EFFECT */}

        <div
          className="

absolute
top-0
left-0
h-full
w-full
opacity-10

"
        >

          <div
            className="

absolute
top-20
left-16
w-72
h-72
rounded-full
bg-white
blur-[140px]

"
          />

          <div
            className="

absolute
bottom-10
right-10
w-72
h-72
rounded-full
bg-cyan-400
blur-[150px]

"
          />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col justify-between w-full">

          {/* BRAND */}

          <div>

            <Link
              to="/"
              className="text-4xl font-bold"
            >
              Bookify
            </Link>

            <h1
              className="

mt-16
text-5xl
leading-tight
font-extrabold

"
            >

              Smart Booking
              Platform for
              Modern Services

            </h1>

            <p
              className="

mt-8
text-lg
text-slate-200
max-w-xl

"
            >

              Connect customers,
              Professional Service, and admins
              through one scalable
              booking ecosystem.

            </p>

          </div>

          {/* FEATURES */}

          <div className="space-y-6">

            <div className="flex items-start gap-4">

              <FaCalendarCheck
                className="text-cyan-300 mt-1"
                size={22}
              />

              <div>

                <h3 className="font-semibold text-lg">

                  Smart Booking

                </h3>

                <p className="text-slate-300">

                  Fast scheduling and
                  appointment management.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <FaUsers
                className="text-cyan-300 mt-1"
                size={22}
              />

              <div>

                <h3 className="font-semibold text-lg">

                  Multi-Role Access

                </h3>

                <p className="text-slate-300">

                  Customer, Professional Service,
                  and Admin dashboards.

                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <FaShieldAlt
                className="text-cyan-300 mt-1"
                size={22}
              />

              <div>

                <h3 className="font-semibold text-lg">

                  Secure Authentication

                </h3>

                <p className="text-slate-300">

                  JWT authentication with
                  enterprise-grade protection.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div
        className="

flex
items-center
justify-center
p-6
md:p-10

"
      >

        <motion.div
          initial={{
            opacity:0,
            y:30,
          }}
          animate={{
            opacity:1,
            y:0,
          }}
          transition={{
            duration:0.4,
          }}
          className="w-full max-w-md"
        >

          {/* MOBILE BRAND */}

          <div className="lg:hidden text-center mb-10">

            <Link
              to="/"
              className="

text-4xl
font-bold
text-blue-600

"
            >

              Bookify

            </Link>

          </div>

          {/* CARD */}

          <div
            className="

rounded-3xl
bg-white
shadow-xl
border
border-slate-200
p-8

"
          >

            {/* TITLE */}

            <div className="mb-8">

              <h2
                className="

text-3xl
font-bold
text-slate-900

"
              >

                {title}

              </h2>

              <p
                className="

mt-3
text-slate-500

"
              >

                {subtitle}

              </p>

            </div>

            {/* FORM */}

            {children}

          </div>

          {/* FOOTER LINKS */}

          <div
            className="

mt-8
text-center
text-sm
text-slate-500

"
          >

         

          </div>

        </motion.div>

      </div>

    </div>

  );

}