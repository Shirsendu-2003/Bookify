import {
  FaUsers,
  FaTools,
  FaHandshake,
  FaAward,
} from "react-icons/fa";

import Navbar from
"../../components/layout/Navbar";

import Footer from
"../../components/layout/Footer";
import ScrollButton from "../../components/common/ScrollButton";

export default function About(){

  const stats = [

    {

      id:1,

      icon:<FaUsers/>,

      value:"25K+",

      label:
        "Happy Customers",

    },

    {

      id:2,

      icon:<FaTools/>,

      value:"3K+",

      label:
        "Verified Providers",

    },

    {

      id:3,

      icon:<FaHandshake/>,

      value:"50K+",

      label:
        "Completed Jobs",

    },

    {

      id:4,

      icon:<FaAward/>,

      value:"99%",

      label:
        "Client Satisfaction",

    },

  ];

  return(

    <>

      <Navbar />

      <main
        className="

min-h-screen
bg-slate-50

"

      >

        {/* HERO */}

        <section
          className="

bg-gradient-to-r
from-blue-700
to-indigo-700

text-white

py-28

"

        >

          <div
            className="

max-w-7xl
mx-auto
px-6

text-center

"

          >

            <h1
              className="

text-5xl
font-extrabold
mb-6

"

            >

              About ServiceHub

            </h1>

            <p
              className="

max-w-3xl
mx-auto

text-lg
text-blue-100

leading-8

"

            >

              We connect customers
              with trusted plumbers,
              electricians,
              technicians,
              cleaners and verified
              home service experts.

            </p>

          </div>

        </section>

        {/* COMPANY */}

        <section
          className="

max-w-7xl
mx-auto
px-6
py-24

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

            <div>

              <h2
                className="

text-4xl
font-bold
text-slate-900
mb-8

"

              >

                Our Story

              </h2>

              <p
                className="

text-slate-600
leading-8
mb-6

"

              >

                ServiceHub was
                created to simplify
                how people discover
                reliable local
                service professionals.

              </p>

              <p
                className="

text-slate-600
leading-8

"

              >

                Through technology,
                transparent reviews,
                secure bookings and
                verified providers,
                we deliver trust and
                convenience.

              </p>

            </div>

            <div
              className="

bg-white
rounded-3xl
shadow-xl
p-10

"

            >

              <h3
                className="

text-2xl
font-bold
mb-8

"

              >

                Mission & Vision

              </h3>

              <div className="space-y-8">

                <div>

                  <h4
                    className="

font-bold
text-blue-700
mb-3

"

                  >

                    Mission

                  </h4>

                  <p
                    className="

text-slate-600
leading-7

"

                  >

                    Deliver trusted,
                    secure and
                    seamless service
                    booking
                    experiences.

                  </p>

                </div>

                <div>

                  <h4
                    className="

font-bold
text-indigo-700
mb-3

"

                  >

                    Vision

                  </h4>

                  <p
                    className="

text-slate-600
leading-7

"

                  >

                    Become India's
                    leading digital
                    home services
                    ecosystem.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* STATS */}

        <section
          className="

bg-white
py-24

"

        >

          <div
            className="

max-w-7xl
mx-auto
px-6

"

          >

            <div
              className="

grid
md:grid-cols-2
xl:grid-cols-4
gap-8

"

            >

              {stats.map(
                (item)=>(

                <div
                  key={item.id}
                  className="

bg-slate-50
rounded-3xl
p-10

text-center

shadow-sm

"

                >

                  <div
                    className="

text-blue-700
text-4xl
mb-5

flex
justify-center

"

                  >

                    {item.icon}

                  </div>

                  <h3
                    className="

text-4xl
font-bold
text-slate-900

"

                  >

                    {item.value}

                  </h3>

                  <p
                    className="

mt-4
text-slate-600

"

                  >

                    {item.label}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

      </main>

      <Footer />
      <ScrollButton />

    </>

  );

}