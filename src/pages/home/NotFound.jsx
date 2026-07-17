import {
  Link,
} from "react-router-dom";

import {
  FaHome,
  FaSearch,
} from "react-icons/fa";

import Navbar from
"../../components/layout/Navbar";

import Footer from
"../../components/layout/Footer";

import Button from
"../../components/common/Button";

export default function NotFound(){

  return(

    <>

      <Navbar />

      <main
        className="

min-h-screen

bg-gradient-to-br
from-slate-50
via-blue-50
to-indigo-100

flex
items-center
justify-center

px-6
py-20

"

      >

        <div
          className="

max-w-4xl
mx-auto

text-center

"

        >

          {/* 404 */}

          <div
            className="

relative
mb-10

"

          >

            <h1
              className="

text-[120px]
md:text-[180px]

font-extrabold

bg-gradient-to-r
from-blue-700
to-indigo-700

bg-clip-text
text-transparent

leading-none

animate-pulse

"

            >

              404

            </h1>

          </div>

          {/* CONTENT */}

          <h2
            className="

text-4xl
md:text-5xl

font-bold
text-slate-900

mb-6

"

          >

            Page Not Found

          </h2>

          <p
            className="

text-lg
text-slate-600

leading-8

max-w-2xl
mx-auto

mb-12

"

          >

            The page you are
            looking for may have
            been removed, renamed,
            or is temporarily
            unavailable.

          </p>

          {/* ACTIONS */}

          <div
            className="

flex
flex-col
sm:flex-row

justify-center
gap-5

"

          >

            <Link to="/">

              <Button
                size="lg"
              >

                <FaHome />

                Back To Home

              </Button>

            </Link>

            <Link
              to="/contact"
            >

              <Button
                variant="
secondary"
                size="lg"
              >

                <FaSearch />

                Get Support

              </Button>

            </Link>

          </div>

          {/* CARD */}

          <div
            className="

mt-20

bg-white
shadow-xl

rounded-3xl

p-10

border
border-slate-200

"

          >

            <h3
              className="

text-2xl
font-bold

text-slate-900

mb-5

"

            >

              Need Help?

            </h3>

            <p
              className="

text-slate-600
leading-8

"

            >

              Our support team is
              available to help you
              find the service,
              booking, or dashboard
              page you're looking
              for.

            </p>

          </div>

        </div>

      </main>

      <Footer />

    </>

  );

}