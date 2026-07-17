import {
  FaBolt,
  FaWrench,
  FaBroom,
  FaPaintRoller,
  FaHammer,
  FaSnowflake,
  FaCar,
  FaTools,
  FaHome,
} from "react-icons/fa";

import Card from "../common/Card";

const services = [
  {
    name: "PLUMBER",
    icon: <FaWrench />,
  },
  {
    name: "ELECTRICIAN",
    icon: <FaBolt />,
  },
  {
    name: "CLEANER",
    icon: <FaBroom />,
  },
  {
    name: "PAINTER",
    icon: <FaPaintRoller />,
  },
  {
    name: "CARPENTER",
    icon: <FaHammer />,
  },
  {
    name: "AC_REPAIR",
    icon: <FaSnowflake />,
  },
  {
    name: "MECHANIC",
    icon: <FaCar />,
  },
  {
    name: "APPLIANCE_REPAIR",
    icon: <FaTools />,
  },
  {
    name: "GENERAL_SERVICE",
    icon: <FaHome />,
  },
];

export default function ServiceStep({
  bookingData,
  setBookingData,
  next,
}) {
  const selectService = (service) => {
    setBookingData({
      ...bookingData,
      serviceType: service,
    });

    next();
  };

  return (
    <Card>

      <div className="mb-8 text-center">

        <h2 className="text-3xl font-bold text-slate-800">
          Choose a Service
        </h2>

        <p className="text-slate-500 mt-2">
          Select the service you need
        </p>

      </div>

      <div
        className="
        grid
        grid-cols-2
        md:grid-cols-3
        gap-5
      "
      >

        {services.map((service) => (

          <div
            key={service.name}
            onClick={() =>
              selectService(service.name)
            }
            className="
              cursor-pointer
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-6
              text-center
              transition-all
              duration-300
              hover:border-blue-500
              hover:shadow-xl
              hover:-translate-y-1
            "
          >

            <div
              className="
              text-4xl
              text-blue-600
              mb-4
              flex
              justify-center
            "
            >
              {service.icon}
            </div>

            <h3
              className="
              font-semibold
              text-slate-800
              text-sm
            "
            >
              {service.name.replaceAll(
                "_",
                " "
              )}
            </h3>

          </div>

        ))}

      </div>

    </Card>
  );
}