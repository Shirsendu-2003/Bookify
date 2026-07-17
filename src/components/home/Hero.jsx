import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaCalendarCheck,
  FaShieldAlt,
} from "react-icons/fa";

export default function Hero() {

  const stats = [
    {
      value: "25K+",
      label: "Bookings Completed",
      icon: <FaCalendarCheck />,
    },
    {
      value: "12K+",
      label: "Active Users",
      icon: <FaUsers />,
    },
    {
      value: "99.9%",
      label: "Secure Platform",
      icon: <FaShieldAlt />,
    },
  ];

  return (

    <section
      className="

relative
overflow-hidden
bg-gradient-to-br
from-slate-950
via-blue-950
to-slate-900
text-white

"
    >

      {/* Background Blur */}

      <div
        className="

absolute
inset-0
overflow-hidden

"
      >

        <div
          className="

absolute
top-20
left-10
h-72
w-72
rounded-full
bg-blue-500/20
blur-[130px]

"
        />

        <div
          className="

absolute
bottom-10
right-10
h-80
w-80
rounded-full
bg-cyan-400/20
blur-[150px]

"
        />

      </div>

      {/* Main Container */}

      <div
        className="

relative
z-10
max-w-7xl
mx-auto
px-6
lg:px-10
pt-24
pb-20

"
      >

        <div
          className="

grid
lg:grid-cols-2
gap-16
items-center

"
        >

          {/* LEFT */}

          <motion.div
            initial={{
              opacity:0,
              x:-50,
            }}
            animate={{
              opacity:1,
              x:0,
            }}
            transition={{
              duration:0.7,
            }}
          >

            {/* Badge */}

            <div
              className="

inline-flex
items-center
gap-2
rounded-full
border
border-blue-500/40
bg-blue-500/10
px-4
py-2
text-sm
font-medium
text-blue-200
mb-8

"
            >

              <FaCheckCircle />

              Trusted by thousands of customers

            </div>

            {/* Heading */}

            <h1
              className="

text-5xl
md:text-6xl
lg:text-7xl
font-extrabold
leading-tight

"
            >

              Modern
              <span className="text-cyan-400">
                {" "}Booking Platform{" "}
              </span>

              for Smart Services

            </h1>

            {/* Description */}

            <p
              className="

mt-8
max-w-2xl
text-lg
leading-8
text-slate-300

"
            >

              Simplify appointments,
              Professionals Service management,
              and customer experiences
              through one scalable
              SaaS ecosystem.

            </p>

            {/* CTA */}

            <div
              className="

mt-10
flex
flex-col
sm:flex-row
gap-4

"
            >

              <Link
                to="/register"
                className="

inline-flex
items-center
justify-center
gap-3

rounded-2xl
bg-blue-600
px-8
py-4
font-semibold
transition
hover:bg-blue-700

"
              >

                Get Started

                <FaArrowRight />

              </Link>

              <Link
                to="/about"
                className="

inline-flex
items-center
justify-center

rounded-2xl
border
border-slate-700
bg-white/5
px-8
py-4
font-semibold
transition
hover:bg-white/10

"
              >

                Learn More

              </Link>

            </div>

            {/* Features */}

            <div
              className="

mt-12
grid
sm:grid-cols-2
gap-5

"
            >

              {[
                "Real-time bookings",
                "Role-based dashboards",
                "Secure payments",
                "Analytics & reports",
              ].map((item)=>(
                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <FaCheckCircle
                    className="text-cyan-400"
                  />

                  <span className="text-slate-300">

                    {item}

                  </span>

                </div>
              ))}

            </div>

          </motion.div>

         {/* RIGHT */}

<motion.div
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.7 }}
  className="relative"
>
  <div className="rounded-3xl border border-slate-700 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

    {/* Header */}

    <div className="flex items-center justify-between mb-8">
      <div>
        <p className="text-slate-400 text-sm">
          Live Booking Dashboard
        </p>

        <h2 className="text-3xl font-bold mt-1">
          Today's Overview
        </h2>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-emerald-300 text-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Live
      </div>
    </div>

    {/* Stats */}

    <div className="grid grid-cols-2 gap-4">

      <div className="rounded-2xl bg-white/5 border border-slate-800 p-5">
        <p className="text-slate-400 text-sm">
          Today's Bookings
        </p>

        <h3 className="text-3xl font-bold mt-2">
          248
        </h3>

        <p className="text-emerald-400 text-sm mt-2">
          ↑ 12% Today
        </p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-slate-800 p-5">
        <p className="text-slate-400 text-sm">
          Active Professionals Service
        </p>

        <h3 className="text-3xl font-bold mt-2">
          146
        </h3>

        <p className="text-cyan-400 text-sm mt-2">
          Online Now
        </p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-slate-800 p-5">
        <p className="text-slate-400 text-sm">
          Customer Rating
        </p>

        <h3 className="text-3xl font-bold mt-2">
          4.9★
        </h3>

        <p className="text-yellow-400 text-sm mt-2">
          Excellent
        </p>
      </div>

      <div className="rounded-2xl bg-white/5 border border-slate-800 p-5">
        <p className="text-slate-400 text-sm">
          Success Rate
        </p>

        <h3 className="text-3xl font-bold mt-2">
          99.7%
        </h3>

        <p className="text-emerald-400 text-sm mt-2">
          Completed
        </p>
      </div>

    </div>

    {/* Recent Activity */}

    <div className="mt-8">

      <h4 className="font-semibold mb-4">
        Recent Activity
      </h4>

      <div className="space-y-4">

        {[
          {
            name: "Electrician booked",
            time: "2 min ago",
            color: "bg-emerald-500",
          },
          {
            name: "Plumbing service completed",
            time: "8 min ago",
            color: "bg-blue-500",
          },
          {
            name: "Cleaning request confirmed",
            time: "15 min ago",
            color: "bg-cyan-500",
          },
        ].map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-white/5 border border-slate-800 p-4"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />

              <div>
                <p className="font-medium">
                  {item.name}
                </p>

                <p className="text-xs text-slate-400">
                  {item.time}
                </p>
              </div>
            </div>

            <FaCheckCircle className="text-emerald-400" />
          </div>
        ))}

      </div>

    </div>

  </div>
</motion.div>

        </div>

      </div>

    </section>

  );

}