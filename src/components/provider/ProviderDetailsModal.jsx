import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaBriefcase,
  FaTimes,
} from "react-icons/fa";

export default function ProviderDetailsModal({

  provider,
  isOpen,
  onClose,

}) {

  if (!isOpen || !provider)
    return null;

  return (

    <div
      className="
      fixed inset-0
      bg-black/50
      flex items-center
      justify-center
      z-50
      p-4
      "
    >

      <div
        className="
        bg-white
        rounded-2xl
        max-w-3xl
        w-full
        p-8
        relative
        overflow-y-auto
        max-h-[90vh]
        "
      >

        <button
          onClick={onClose}
          className="
          absolute
          top-4
          right-4
          text-slate-500
          text-xl
          "
        >

          <FaTimes />

        </button>

        <div className="flex gap-6">

          <img
            src={
              provider.avatar ||
              "https://i.pravatar.cc/300"
            }
            alt={provider.name}
            className="
            w-32 h-32
            rounded-2xl
            object-cover
            "
          />

          <div>

            <h2
              className="
              text-3xl
              font-bold
              "
            >

              {provider.name}

            </h2>

            <p
              className="
              text-slate-500
              mt-2
              "
            >

              {provider.providerType}

            </p>

            <div
              className="
              flex items-center
              gap-2 mt-3
              "
            >

              <FaStar
                className="
                text-yellow-400
                "
              />

              <span>

                {(provider.averageRating || 0)
                  .toFixed(1)}

              </span>

            </div>

          </div>

        </div>

        <div
          className="
          grid md:grid-cols-2
          gap-6 mt-8
          "
        >

          <div>

            <FaClock
              className="
              inline mr-2
              text-blue-600
              "
            />

            Experience

            <h4 className="font-bold">

              {provider.experience}

            </h4>

          </div>

          <div>

            <FaBriefcase
              className="
              inline mr-2
              text-green-600
              "
            />

            Hourly Rate

            <h4 className="font-bold">

              ₹{provider.hourlyRate}/hr

            </h4>

          </div>

          <div>

            <FaMapMarkerAlt
              className="
              inline mr-2
              text-red-500
              "
            />

            Location

            <h4 className="font-bold">

              {provider.location}

            </h4>

          </div>

          <div>

            Status

            <h4 className="font-bold">

              {
                provider.verificationStatus
              }

            </h4>

          </div>

        </div>

        <div className="mt-8">

          <h3
            className="
            font-bold
            text-lg
            mb-3
            "
          >

            Skills

          </h3>

          <div
            className="
            flex flex-wrap
            gap-2
            "
          >

            {provider.skills

              ? provider.skills

                  .split(",")

                  .map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="
                        px-3 py-1
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        "
                      >

                        {skill.trim()}

                      </span>

                    )
                  )

              : "No skills listed"}

          </div>

        </div>

        <div className="mt-8">

          <h3
            className="
            font-bold
            text-lg
            mb-3
            "
          >

            About Professional Service

          </h3>

          <p
            className="
            text-slate-600
            leading-7
            "
          >

            {provider.bio}

          </p>

        </div>

      </div>

    </div>

  );

}