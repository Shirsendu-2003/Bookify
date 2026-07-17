import {
  FaStar,
  FaComment,
  FaChartLine,
} from "react-icons/fa";

import DashboardLayout
from "../../components/layout/DashboardLayout";

import ReviewCard
from "../../components/provider/ReviewCard";

import AnalyticsCard
from "../../components/dashboard/AnalyticsCard";

import Loader
from "../../components/common/Loader";

import EmptyState
from "../../components/common/EmptyState";

import {
  useProviderProfile,
  useReviews,
} from "../../hooks/useProviders";

export default function Reviews(){

  const {

    data:profile,

    isLoading:profileLoading,

  } = useProviderProfile();

  const providerId =
    profile?.id;

  const {

    data,

    isLoading,

    error,

  } = useReviews(
      providerId
  );

  const reviews =

    data?.data?.content ||

    data?.content ||

    data?.data ||

    [];

  if(
    profileLoading ||
    isLoading
  ){

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

          <Loader/>

        </div>

      </DashboardLayout>

    );

  }

  if(error){

    return(

      <DashboardLayout>

        <EmptyState

          title="
Unable To Load Reviews"

          description="
Please try again."

        />

      </DashboardLayout>

    );

  }

  const averageRating =

    reviews.length

    ?

    (

      reviews.reduce(

        (sum,review)=>

          sum +

          Number(
            review.rating
          ),

        0

      )

      /

      reviews.length

    ).toFixed(1)

    :

    "0.0";

  return(

    <DashboardLayout>

      {/* HEADER */}

      <div className="mb-10">

        <h1
          className="
text-4xl
font-bold
"
        >

          Customer Reviews

        </h1>

        <p
          className="
mt-3
text-slate-500
"
        >

          Monitor ratings
          and customer feedback.

        </p>

      </div>

      {/* KPI */}

      <div
        className="
grid
md:grid-cols-3
gap-8
mb-10
"
      >

        <AnalyticsCard

          title="
Average Rating"

          value={
            averageRating
          }

          growth={8}

          color="amber"

          icon={
            <FaStar/>
          }

        />

        <AnalyticsCard

          title="
Total Reviews"

          value={
            reviews.length
          }

          growth={12}

          color="blue"

          icon={
            <FaComment/>
          }

        />

        <AnalyticsCard

          title="
Satisfaction"

          value="96%"

          growth={5}

          color="emerald"

          icon={
            <FaChartLine/>
          }

        />

      </div>

      {/* REVIEWS */}

      {

        reviews.length===0

        ?(

          <EmptyState

            title="
No Reviews Yet"

            description="
Customer feedback will appear here."

          />

        )

        :(

          <div
            className="
space-y-8
"
          >

            {

              reviews.map(

                (review)=>(

                  <ReviewCard

                    key={
                      review.id
                    }

                    review={
                      review
                    }

                  />

                )

              )

            }

          </div>

        )

      }

    </DashboardLayout>

  );

}