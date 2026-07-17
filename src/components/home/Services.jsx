import { motion } from "framer-motion";
import {
  FaBolt,
  FaWrench,
  FaSnowflake,
  FaPaintRoller,
  FaBroom,
  FaTools,
} from "react-icons/fa";

export default function Services() {

  const services = [
    {
      title: "Electrical Repair",
      icon: <FaBolt />,
      desc:
        "Certified electricians for installation, maintenance, and emergency repair services.",
      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Plumbing Services",
      icon: <FaWrench />,
      desc:
        "Professional plumbing solutions including leaks, fittings, and pipe repairs.",
      color: "from-blue-500 to-cyan-500",
    },

    {
      title: "AC & Appliance",
      icon: <FaSnowflake />,
      desc:
        "AC repair, servicing, cooling maintenance, and appliance troubleshooting.",
      color: "from-cyan-500 to-indigo-500",
    },

    {
      title: "Painting",
      icon: <FaPaintRoller />,
      desc:
        "Interior and exterior painting services with premium finish quality.",
      color: "from-pink-500 to-purple-500",
    },

    {
      title: "Cleaning Services",
      icon: <FaBroom />,
      desc:
        "Home, office, and deep cleaning solutions delivered by trained professionals.",
      color: "from-green-500 to-emerald-500",
    },

    {
      title: "General Maintenance",
      icon: <FaTools />,
      desc:
        "Comprehensive home and commercial maintenance services in one place.",
      color: "from-indigo-500 to-blue-600",
    },
  ];

  return (

    <section
      className="

relative
bg-slate-50
py-24
overflow-hidden

"
    >

      {/* Background */}

      <div
        className="

absolute
top-0
left-0
h-full
w-full
opacity-30

"
      >

        <div
          className="

absolute
top-24
right-10
w-72
h-72
rounded-full
bg-cyan-300
blur-[130px]

"
        />

      </div>

      <div
        className="

relative
z-10
max-w-7xl
mx-auto
px-6
lg:px-10

"
      >

        {/* Header */}

        <motion.div
          initial={{
            opacity:0,
            y:30,
          }}
          whileInView={{
            opacity:1,
            y:0,
          }}
          transition={{
            duration:0.6,
          }}
          viewport={{ once:true }}
          className="text-center mb-20"
        >

          <span
            className="

inline-block
rounded-full
bg-blue-100
text-blue-700
px-4
py-2
text-sm
font-semibold
mb-6

"
          >

            Our Services

          </span>

          <h2
            className="

text-4xl
md:text-5xl
font-extrabold
text-slate-900

"
          >

            Powerful Services
            Built For Modern Users

          </h2>

          <p
            className="

mt-6
max-w-3xl
mx-auto
text-lg
leading-8
text-slate-600

"
          >

            Discover premium service experiences
            through trusted professionals,
            streamlined bookings,
            and real-time management.

          </p>

        </motion.div>

        {/* Grid */}

        <div
          className="

grid
sm:grid-cols-2
xl:grid-cols-3
gap-8

"
        >

          {services.map((service,index)=>(

            <motion.div
              key={service.title}
              initial={{
                opacity:0,
                y:40,
              }}
              whileInView={{
                opacity:1,
                y:0,
              }}
              transition={{
                duration:0.45,
                delay:index * 0.1,
              }}
              viewport={{ once:true }}
              whileHover={{
                y:-8,
              }}
              className="group"
            >

              <div
                className="

h-full
rounded-3xl
bg-white
border
border-slate-200
shadow-sm
p-8
transition-all
duration-300

hover:shadow-2xl
hover:border-blue-200

"
              >

                {/* Icon */}

                <div
                  className={`

inline-flex
items-center
justify-center

w-16
h-16
rounded-2xl
bg-gradient-to-r
${service.color}

text-white
text-2xl
mb-7

shadow-lg

`}
                >

                  {service.icon}

                </div>

                {/* Title */}

                <h3
                  className="

text-2xl
font-bold
text-slate-900

"
                >

                  {service.title}

                </h3>

                {/* Description */}

                <p
                  className="

mt-5
text-slate-600
leading-7

"
                >

                  {service.desc}

                </p>

                {/* CTA */}

                <button
                  className="

mt-8
inline-flex
items-center
gap-3

font-semibold
text-blue-600

transition
group-hover:gap-4

"
                >

                  Explore Service

                  <span>→</span>

                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}