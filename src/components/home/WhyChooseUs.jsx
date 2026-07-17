import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaClock,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaHeadset,
} from "react-icons/fa";

export default function WhyChooseUs() {

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Enterprise Security",
      description:
        "JWT authentication, protected routes, secure payments, and robust platform safety.",
    },

    {
      icon: <FaClock />,
      title: "Real-Time Booking",
      description:
        "Instant scheduling, live status tracking, and streamlined appointment workflows.",
    },

    {
      icon: <FaChartLine />,
      title: "Smart Analytics",
      description:
        "Track revenue, bookings, customer engagement, and operational growth.",
    },

    {
      icon: <FaUsers />,
      title: "Role-Based System",
      description:
        "Dedicated dashboards for customers, Professional Services, and administrators.",
    },

    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description:
        "Reliable support channels to ensure smooth platform operations.",
    },

    {
      icon: <FaCheckCircle />,
      title: "Trusted Platform",
      description:
        "Built for scalability, reliability, and modern service management.",
    },
  ];

  return (

    <section className="bg-slate-950 text-white py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <motion.div
            initial={{ opacity:0, x:-40 }}
            whileInView={{ opacity:1, x:0 }}
            transition={{ duration:0.7 }}
            viewport={{ once:true }}
          >

            <span
              className="

inline-block
rounded-full
bg-blue-500/10
border
border-blue-500/20
px-4
py-2
text-sm
font-semibold
text-blue-300
mb-7

"
            >
              Why Choose Us
            </span>

            <h2
              className="

text-4xl
md:text-5xl
font-extrabold
leading-tight

"
            >

              Designed For
              <span className="text-cyan-400">
                {" "}Speed, Scale &
                Reliability
              </span>

            </h2>

            <p
              className="

mt-8
text-lg
leading-8
text-slate-300

"
            >

              Manage services, bookings,
              Professional Services, and analytics
              through a secure,
              scalable, and modern SaaS ecosystem.

            </p>

            {/* Metrics */}

            <div className="grid sm:grid-cols-3 gap-6 mt-12">

              {[
                {
                  value:"99.9%",
                  label:"Uptime",
                },
                {
                  value:"50K+",
                  label:"Bookings",
                },
                {
                  value:"12K+",
                  label:"Users",
                },
              ].map((metric)=>(

                <div
                  key={metric.label}
                  className="rounded-2xl bg-white/5 p-6 border border-slate-800"
                >

                  <h3 className="text-3xl font-bold text-cyan-400">
                    {metric.value}
                  </h3>

                  <p className="mt-3 text-slate-400">
                    {metric.label}
                  </p>

                </div>

              ))}

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity:0, x:40 }}
            whileInView={{ opacity:1, x:0 }}
            transition={{ duration:0.7 }}
            viewport={{ once:true }}
            className="grid sm:grid-cols-2 gap-6"
          >

            {features.map((item,index)=>(

              <motion.div
                key={item.title}
                whileHover={{
                  y:-6,
                }}
                transition={{
                  duration:0.25,
                }}
                className="

rounded-3xl
border
border-slate-800
bg-white/5
backdrop-blur-lg
p-8

"
              >

                <div
                  className="

inline-flex
items-center
justify-center

w-16
h-16
rounded-2xl
bg-gradient-to-r
from-blue-500
to-cyan-500

text-2xl
mb-6

"
                >

                  {item.icon}

                </div>

                <h3
                  className="

text-xl
font-bold
mb-4

"
                >

                  {item.title}

                </h3>

                <p
                  className="

leading-7
text-slate-400

"
                >

                  {item.description}

                </p>

              </motion.div>

            ))}

          </motion.div>

        </div>

      </div>

    </section>

  );

}