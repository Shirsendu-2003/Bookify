import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaPlayCircle } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* BACKGROUND */}

      <div className="absolute inset-0">
        <div
          className="

absolute
top-16
left-12
w-80
h-80
rounded-full
bg-blue-500/20
blur-[150px]

"
        />

        <div
          className="

absolute
bottom-10
right-10
w-96
h-96
rounded-full
bg-cyan-400/20
blur-[170px]

"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{ once: true }}
        >
          <div
            className="

relative
overflow-hidden

rounded-[36px]
border
border-slate-800

bg-gradient-to-r
from-blue-700/40
via-slate-900
to-cyan-700/40

backdrop-blur-xl
p-10
lg:p-16

"
          >
            {/* DECORATION */}

            <div
              className="

absolute
top-0
right-0
w-96
h-96
bg-cyan-400/10
rounded-full
blur-[180px]

"
            />

            <div
              className="

grid
lg:grid-cols-2
gap-14
items-center

"
            >
              {/* LEFT */}

              <div>
                <span
                  className="

inline-flex
items-center
gap-2

rounded-full
border
border-blue-400/20
bg-blue-500/10

px-4
py-2

text-sm
font-semibold
text-blue-200
mb-8

"
                >
                  <FaCheckCircle />
                  Ready To Scale
                </span>

                <h2
                  className="

text-4xl
md:text-5xl
xl:text-6xl

font-extrabold
leading-tight
text-white

"
                >
                  Ready To Transform Your
                  <span className="text-cyan-400"> Booking Workflow?</span>
                </h2>

                <p
                  className="

mt-8
text-lg
leading-8
text-slate-300
max-w-2xl

"
                >
                  Launch faster, manage bookings smarter, and deliver
                  exceptional customer experiences through one modern SaaS
                  platform.
                </p>

                {/* BUTTONS */}

                <div
                  className="

mt-10
flex
flex-col
sm:flex-row
gap-5

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
text-white

transition
duration-300

hover:bg-blue-700
hover:scale-[1.02]

"
                  >
                    Start Free Today
                    <FaArrowRight />
                  </Link>

                  <Link
                    to="/demo"
                    className="

inline-flex
items-center
justify-center
gap-3

rounded-2xl
border
border-slate-700

bg-white/5
px-8
py-4

font-semibold
text-slate-200

transition
duration-300

hover:bg-white/10

"
                  >
                    <FaPlayCircle />
                    Watch Demo
                  </Link>
                </div>
              </div>

              {/* RIGHT */}

              <div>
                <div
                  className="

rounded-3xl
border
border-slate-700

bg-white/5
backdrop-blur-lg

p-8

"
                >
                  <h3
                    className="

text-2xl
font-bold
text-white
mb-8

"
                  >
                    Platform Benefits
                  </h3>

                  <div className="space-y-6">
                    {[
                      "Real-time booking management",
                      "Customer + Professional Service dashboards",
                      "Analytics & reporting",
                      "Secure authentication system",
                      "Payment integration ready",
                      "Enterprise-grade scalability",
                    ].map((item) => (
                      <div key={item} className="flex gap-4">
                        <div
                          className="

mt-1
text-cyan-400

"
                        >
                          <FaCheckCircle />
                        </div>

                        <p
                          className="

text-slate-300
leading-7

"
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* MINI CARD */}

                  <div
                    className="

mt-10

rounded-2xl
bg-gradient-to-r
from-blue-600
to-cyan-600

p-6
text-white

"
                  >
                    <h4
                      className="

text-3xl
font-extrabold

"
                    >
                      99.9%
                    </h4>

                    <p className="mt-3 text-blue-100">
                      Platform uptime trusted by growing businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
