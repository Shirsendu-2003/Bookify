import {
  FaStar,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";
import ReviewCard from "./ReviewCard";

const availabilityVariant = {
  AVAILABLE: "success",

  BUSY: "warning",

  OFFLINE: "danger",
};

export default function ProviderProfile({
  provider,

  reviews = [],

  onBook,
}) {
  return (
    <div className="space-y-8">
      {/* HERO */}

      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[320px_1fr] gap-10">
          {/* LEFT */}

          <div>
            <div className="relative">
              <img
                src={provider.avatar || "https://i.pravatar.cc/400"}
                alt={provider.name}
                className="

w-full
rounded-3xl
object-cover
h-[340px]

"
              />

              <div
                className="

absolute
bottom-5
right-5

bg-blue-600
text-white

rounded-full
p-3

"
              >
                <FaCheckCircle />
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <div
              className="

flex
flex-col
xl:flex-row
xl:justify-between
gap-8

"
            >
              <div>
                <div className="flex gap-4 items-center">
                  <h1
                    className="

text-4xl
font-extrabold
text-slate-900

"
                  >
                    {provider.name}
                  </h1>

                  <Badge variant="success">
                    {provider.verificationStatus || "AVAILABLE"}
                  </Badge>
                </div>

                <p
                  className="

mt-3
text-lg
text-slate-500

"
                >
                  {provider.providerType}
                </p>

                {/* RATING */}

                <div
                  className="
flex
items-center
gap-4
mt-6
"
                >
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`

${
  star <= Math.round(provider.averageRating || 0)
    ? "text-yellow-400"
    : "text-slate-300"
}

`}
                      />
                    ))}
                  </div>

                  <span className="font-bold">
                    {(provider.averageRating || 0).toFixed(1)}
                  </span>
                </div>
              </div>

              {/* ACTION */}

              
            </div>

            {/* ABOUT */}

            <div className="mt-10">
              <h3
                className="

text-xl
font-bold
mb-4

"
              >
                About
              </h3>

              <p
                className="

leading-8
text-slate-600

"
              >
                {provider.bio}
              </p>
            </div>

            {/* CONTACT */}

            <div
              className="

grid
md:grid-cols-2
gap-6
mt-10

"
            >
              <div className="flex gap-4">
                <FaEnvelope
                  className="

text-blue-600
mt-1

"
                />

                <div>
                  <p className="text-sm text-slate-500">Email</p>

                  <h4 className="font-semibold">{provider.user?.email}</h4>
                </div>
              </div>

              <div className="flex gap-4">
                <FaPhone
                  className="

text-green-600
mt-1

"
                />

                <div>
                  <p className="text-sm text-slate-500">Phone</p>

                  <h4 className="font-semibold">{provider.user?.phone}</h4>
                </div>
              </div>

              <div className="flex gap-4">
                <FaMapMarkerAlt
                  className="

text-red-500
mt-1

"
                />

                <div>
                  <p className="text-sm text-slate-500">Address</p>

                  <h4 className="font-semibold">{provider.location}</h4>
                </div>
              </div>

              <div className="flex gap-4">
                <FaClock
                  className="

text-indigo-600
mt-1

"
                />

                <div>
                  <p className="text-sm text-slate-500">Experience</p>

                  <h4 className="font-semibold">{provider.experience} Years</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="flex gap-4">
            <FaBriefcase
              className="

text-3xl
text-blue-600

"
            />

            <div>
              <h3 className="text-3xl font-bold">{provider.completedBookings}</h3>

              <p className="text-slate-500">Completed Jobs</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3
            className="

text-3xl
font-bold

"
          >
            ₹{provider.hourlyRate}
          </h3>

          <p className="text-slate-500">Hourly Rate</p>
        </Card>

        <Card>
          <h3
            className="

text-3xl
font-bold

"
          >
            {provider.averageRating || 0}
          </h3>

          <p className="text-slate-500">Average Rating</p>
        </Card>
      </div>

      {/* SERVICES */}

      <Card>
        <h2
          className="

text-2xl
font-bold
mb-6

"
        >
          Services
        </h2>

        <div className="flex flex-wrap gap-4">
          {provider.services?.length > 0 ? (
            provider.services.map((service) => (
              <span
                key={service.id}
                className="
rounded-full
bg-blue-50
text-blue-700
px-5
py-3
font-medium
"
              >
                {service.title}
              </span>
            ))
          ) : (
            <p className="text-slate-500">No services available.</p>
          )}
        </div>
      </Card>

      {/* REVIEWS */}

      <div>
        <div
          className="

flex
justify-between
items-center
mb-8

"
        >
          <h2
            className="

text-2xl
font-bold

"
          >
            Customer Reviews
          </h2>

          <span className="text-slate-500">{reviews.length} Reviews</span>
        </div>

        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <Card>
              <p className="text-slate-500">No reviews available.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
