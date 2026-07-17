import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaHeart,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
      bg-gray-50
      border-t
      border-gray-200
      mt-auto
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        lg:px-8
        py-14
        "
      >
        {/* Top Section */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-10
          "
        >
          {/* Brand */}

          <div>
            <h2 className="text-2xl font-bold text-blue-600">
              Bookify
            </h2>

            <p
              className="
              mt-4
              text-gray-600
              leading-7
              "
            >
              A modern booking platform connecting customers,
              service professionals, and administrators through
              one secure ecosystem.
            </p>
          </div>

          {/* Company */}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Contact
              </Link>

              <Link
                to="/privacy"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Services */}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Services
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/customer/providers"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Professional Services
              </Link>

              <Link
                to="/register"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Become a Customer
              </Link>

              <Link
                to="/customer/instant-booking"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Instant Booking
              </Link>
            </div>
          </div>

          {/* Social */}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Connect With Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="
                w-11
                h-11
                rounded-full
                border
                border-gray-300
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-blue-600
                hover:text-white
                hover:border-blue-600
                transition-all
                duration-300
                "
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="
                w-11
                h-11
                rounded-full
                border
                border-gray-300
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-blue-600
                hover:text-white
                hover:border-blue-600
                transition-all
                duration-300
                "
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="
                w-11
                h-11
                rounded-full
                border
                border-gray-300
                flex
                items-center
                justify-center
                text-gray-600
                hover:bg-blue-600
                hover:text-white
                hover:border-blue-600
                transition-all
                duration-300
                "
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
          mt-12
          pt-6
          border-t
          border-gray-200
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-4
          "
        >
          <p className="text-sm text-gray-500">
            © {year} Bookify. All rights reserved.
          </p>

          <p
            className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-500
            "
          >
            Built with
            <FaHeart className="text-red-500" />
            React & Spring Boot
          </p>
        </div>
      </div>
    </footer>
  );
}