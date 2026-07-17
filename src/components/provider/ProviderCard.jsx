import {
  FaStar,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaBriefcase,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";

export default function ProviderCard({

  provider,
  onBook,
  onView,

}) {


  
  return (

    <Card
      className="
overflow-hidden
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"
    >

      <div className="flex gap-5">

        <div className="relative">

          <img
            src={
              provider.avatar ||
              "https://i.pravatar.cc/300"
            }

            alt={provider.name}

            className="
w-24
h-24
rounded-2xl
object-cover
"
          />

          <div
            className="
absolute
-bottom-2
-right-2
bg-blue-600
text-white
rounded-full
p-1
"
          >

            <FaCheckCircle />

          </div>

        </div>

        <div className="flex-1">

          <div
            className="
flex
flex-wrap
items-center
justify-between
gap-4
"
          >

            <div>

              <h3
                className="
text-xl
font-bold
text-slate-900
"
              >

                {provider.name}

              </h3>

              <p
                className="
mt-1
text-slate-500
"
              >

                {
                  provider.providerType
                }

              </p>

            </div>

            <Badge variant="success">

              {
                provider.verificationStatus
                || "AVAILABLE"
              }

            </Badge>

          </div>

         <div
  className="
flex
items-center
gap-3
mt-4
"
>

  <div className="flex">

    {[1,2,3,4,5].map(
      (star)=>(

        <FaStar
          key={star}

          className={`

${
star <=
Math.round(
provider.averageRating || 0
)

? "text-yellow-400"

: "text-slate-300"
}

`}
        />

      )
    )}

  </div>

  <span
    className="
font-semibold
text-slate-700
"
  >

    {

      (
        provider
        .averageRating
        || 0

      ).toFixed(1)

    }

  </span>

</div>

        </div>

      </div>

      {/* DETAILS */}

      <div
        className="
grid
md:grid-cols-2
gap-5
mt-8
"
      >

        {/* EXPERIENCE */}

        <div className="flex gap-4">

          <FaClock
            className="
text-blue-600
mt-1
"
          />

          <div>

            <p
              className="
text-sm
text-slate-500
"
            >

              Experience

            </p>

            <h4
              className="
font-semibold
"
            >

              {
                provider.experience
              }

              {" "}Years

            </h4>

          </div>

        </div>

        {/* STATUS */}

        <div className="flex gap-4">

          <FaBriefcase
            className="
text-green-600
mt-1
"
          />

          <div>

            <p
              className="
text-sm
text-slate-500
"
            >

              Status

            </p>

            <h4
              className="
font-semibold
"
            >

              {
                provider.verificationStatus
              }

            </h4>

          </div>

        </div>

        {/* LOCATION */}

        <div className="flex gap-4">

          <FaMapMarkerAlt
            className="
text-red-500
mt-1
"
          />

          <div>

            <p
              className="
text-sm
text-slate-500
"
            >

              Location

            </p>

            <h4
              className="
font-semibold
"
            >

              {
                provider.location
              }

            </h4>

          </div>

        </div>

        {/* HOURLY RATE */}

        <div className="flex gap-4">

          <FaBriefcase
            className="
text-purple-600
mt-1
"
          />

          <div>

            <p
              className="
text-sm
text-slate-500
"
            >

              Hourly Rate

            </p>

            <h4
              className="
font-semibold
"
            >

              ₹

              {
                provider.hourlyRate
                || 0
              }

              /hr

            </h4>

          </div>

        </div>

        {/* SKILLS */}

        <div
          className="
md:col-span-2
"
        >

          <p
            className="
text-sm
text-slate-500
mb-2
"
          >

            Skills

          </p>

          <div
            className="
flex
flex-wrap
gap-2
"
          >

            {

              provider.skills

              ?

              provider.skills
                .split(",")

                .map(

                  (
                    skill,
                    index
                  )=>(

                    <Badge
                      key={index}
                      variant="info"
                    >

                      {
                        skill.trim()
                      }

                    </Badge>

                  )

                )

              :

              <span
                className="
text-slate-400
"
              >

                No skills listed

              </span>

            }

          </div>

        </div>

      </div>

      {/* AVAILABILITY */}

<div className="md:col-span-2">

  <p
    className="
    text-sm
    text-slate-500
    mb-2
    "
  >
    Availability
  </p>

  {provider.availabilities &&
   provider.availabilities.length > 0 ? (

    <div className="flex flex-wrap gap-2">

      {provider.availabilities.map(
        (slot, index) => (

          <Badge
            key={index}
            variant="success"
          >
            {slot.dayOfWeek}

            {" "}

            {slot.startTime?.substring(0,5)}

            -

            {slot.endTime?.substring(0,5)}
          </Badge>

        )
      )}

    </div>

  ) : (

    <span className="text-slate-400">
      No availability configured
    </span>

  )}

</div>

      {/* BIO */}

      <p
        className="
mt-8
leading-7
text-slate-600
"
      >

        {
          provider.bio
        }

      </p>

      {/* ACTIONS */}

      <div
        className="
flex
flex-col
sm:flex-row
gap-4
mt-8
pt-6
border-t
"
      >

        <Button
          onClick={()=>{

            

            onBook?.(
              provider
            );

          }}
        >

          Book Now

        </Button>

        <Button
          variant="secondary"

          onClick={()=>

            onView?.(
              provider
            )

          }
        >

          View Profile

        </Button>

      </div>

    </Card>

  );

}