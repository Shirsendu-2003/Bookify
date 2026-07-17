import { motion } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaCheckCircle,
} from "react-icons/fa";

export default function Testimonials() {

  const testimonials = [

    {
      id:1,
      name:"Rahul Sharma",
      role:"Business Owner",
      image:"https://i.pravatar.cc/150?img=12",
      rating:5,
      text:
        "This platform transformed how we manage bookings and customer scheduling. Fast, reliable, and beautifully designed.",
    },

    {
      id:2,
      name:"Ananya Roy",
      role:"Operations Manager",
      image:"https://i.pravatar.cc/150?img=32",
      rating:5,
      text:
        "Role-based dashboards and analytics helped our team improve workflow efficiency dramatically.",
    },

    {
      id:3,
      name:"Michael Carter",
      role:"Service Provider",
      image:"https://i.pravatar.cc/150?img=51",
      rating:5,
      text:
        "Clean UI, secure payments, and real-time booking management. Everything works exactly as expected.",
    },

  ];

  return (

    <section className="bg-slate-50 py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* HEADER */}

        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }}
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
font-semibold
text-sm
mb-6

"
          >

            Testimonials

          </span>

          <h2
            className="

text-4xl
md:text-5xl
font-extrabold
text-slate-900

"
          >

            Trusted By Thousands
            Across Industries

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

            Hear what customers,
            Professional Services, and businesses
            say about our modern booking ecosystem.

          </p>

        </motion.div>

        {/* GRID */}

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item,index)=>(

            <motion.div
              key={item.id}
              initial={{
                opacity:0,
                y:50,
              }}
              whileInView={{
                opacity:1,
                y:0,
              }}
              transition={{
                duration:0.45,
                delay:index * 0.12,
              }}
              viewport={{ once:true }}
              whileHover={{
                y:-8,
              }}
            >

              <div
                className="

relative
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

"
              >

                {/* QUOTE */}

                <div
                  className="

absolute
top-6
right-6
text-blue-100
text-5xl

"
                >

                  <FaQuoteLeft />

                </div>

                {/* USER */}

                <div className="flex items-center gap-4 mb-7">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="

w-16
h-16
rounded-full
object-cover
border-2
border-blue-100

"
                  />

                  <div>

                    <div className="flex items-center gap-2">

                      <h3 className="font-bold text-slate-900">

                        {item.name}

                      </h3>

                      <FaCheckCircle
                        className="text-blue-500"
                      />

                    </div>

                    <p className="text-slate-500 text-sm">

                      {item.role}

                    </p>

                  </div>

                </div>

                {/* RATING */}

                <div className="flex gap-1 mb-6">

                  {[...Array(item.rating)].map((_,i)=>(

                    <FaStar
                      key={i}
                      className="text-yellow-400"
                    />

                  ))}

                </div>

                {/* CONTENT */}

                <p
                  className="

leading-8
text-slate-600
text-lg

"
                >

                  "{item.text}"

                </p>

              </div>

            </motion.div>

          ))}

        </div>

        {/* STATS */}

        <motion.div
          initial={{
            opacity:0,
            y:40,
          }}
          whileInView={{
            opacity:1,
            y:0,
          }}
          transition={{
            duration:0.6,
          }}
          viewport={{ once:true }}
          className="mt-24"
        >

          <div
            className="

rounded-3xl
bg-gradient-to-r
from-blue-600
to-cyan-600

text-white
p-10

"
          >

            <div
              className="

grid
md:grid-cols-4
gap-10
text-center

"
            >

              {[
                {
                  value:"50K+",
                  label:"Happy Customers",
                },

                {
                  value:"99%",
                  label:"Satisfaction Rate",
                },

                {
                  value:"10K+",
                  label:"Providers",
                },

                {
                  value:"24/7",
                  label:"Support",
                },

              ].map((stat)=>(

                <div key={stat.label}>

                  <h3
                    className="

text-4xl
font-extrabold

"
                  >

                    {stat.value}

                  </h3>

                  <p
                    className="

mt-3
text-blue-100

"
                  >

                    {stat.label}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}