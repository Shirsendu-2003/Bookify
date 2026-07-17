import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import ProviderProfile
from "../../components/provider/ProviderProfile";

import ServiceCard
from "../../components/provider/ServiceCard";

import ReviewCard
from "../../components/provider/ReviewCard";

import AvailabilityCalendar
from "../../components/provider/AvailabilityCalendar";

import Loader from
"../../components/common/Loader";

import EmptyState from
"../../components/common/EmptyState";

import Button from
"../../components/common/Button";

import {

  useProvider,

  useProviderServices,

  useReviews,

  useAvailability,

} from "../../hooks/useProviders";

export default function ProviderDetails(){

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {

    data:provider,

    isLoading,

    error,

  } = useProvider(id);

  const {

    data:services=[],

  } = useProviderServices(
    id
  );

  const {

    data:reviews=[],

  } = useReviews(id);

  const {

    data:availability=[],

  } = useAvailability(id);

  if(isLoading){

    return(

      <DashboardLayout>

        <div
          className="

min-h-[70vh]

flex
items-center
justify-center

"

        >

          <Loader />

        </div>

      </DashboardLayout>

    );

  }

  if(error || !provider){

    return(

      <DashboardLayout>

        <EmptyState

          title="
Professional Service Not Found"

          description="
Unable to load Professional Service."

        />

      </DashboardLayout>

    );

  }

  return(

    <DashboardLayout>

      {/* PROFILE */}

      <ProviderProfile

        provider={provider}

      />

      {/* INFO BAR */}

      <div
        className="

grid
md:grid-cols-3

gap-6
my-10

"

      >

        <div
          className="
bg-white
rounded-2xl
shadow-sm
p-6
"
        >

          <FaStar
            className="
text-yellow-500
text-2xl
mb-3
"
          />

          <h4
            className="
font-bold
"
          >

            Rating

          </h4>

          <p>

            {
              provider.rating
              || "4.8"
            } / 5

          </p>

        </div>

        <div
          className="
bg-white
rounded-2xl
shadow-sm
p-6
"
        >

          <FaMapMarkerAlt
            className="
text-blue-600
text-2xl
mb-3
"
          />

          <h4
            className="
font-bold
"
          >

            Location

          </h4>

          <p>

            {
              provider.location
            }

          </p>

        </div>

        <div
          className="
bg-white
rounded-2xl
shadow-sm
p-6
"
        >

          <FaBriefcase
            className="
text-emerald-600
text-2xl
mb-3
"
          />

          <h4
            className="
font-bold
"
          >

            Experience

          </h4>

          <p>

            {
              provider.experience
            }

          </p>

        </div>

      </div>

      {/* SERVICES */}

      <section
        className="
mb-12
"
      >

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

text-3xl
font-bold

"

          >

            Services

          </h2>

        </div>

        <div
          className="

grid
lg:grid-cols-2

gap-8

"

        >

          {services.map(

            (service)=>(

            <ServiceCard

              key={
                service.id
              }

              service={
                service
              }

              onBook={()=>

                navigate(

`/customer/bookings/create?provider=${id}&service=${service.id}`

                )

              }

            />

          ))}

        </div>

      </section>

      {/* AVAILABILITY */}

      <section
        className="
mb-12
"
      >

        <AvailabilityCalendar

          availabilityData={
            availability
          }

        />

      </section>

      {/* REVIEWS */}

      <section>

        <h2
          className="

text-3xl
font-bold

mb-8

"

        >

          Reviews

        </h2>

        {

          reviews.length===0

          ? (

            <EmptyState

              title="
No Reviews Yet"

              description="
Be the first reviewer."

            />

          )

          : (

            <div
              className="
space-y-8
"
            >

              {reviews.map(

                (review)=>(

                <ReviewCard

                  key={
                    review.id
                  }

                  review={
                    review
                  }

                />

              ))}

            </div>

          )

        }

      </section>

      {/* CTA */}

      <div
        className="

mt-14

flex
justify-center

"

      >

        <Button

          size="lg"

          onClick={()=>

            navigate(

              `/customer/bookings/create?provider=${id}`

            )

          }

        >

          Book This Professional Service

        </Button>

      </div>

    </DashboardLayout>

  );

}