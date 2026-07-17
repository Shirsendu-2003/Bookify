import {
  FaStar,
  FaCheckCircle,
  FaQuoteLeft,
  FaUserCircle,
} from "react-icons/fa";

import Card from "../common/Card";
import Badge from "../common/Badge";

export default function ReviewCard({

  review,

}) {

  return (

    <Card
      className="

transition-all
duration-300

hover:shadow-lg

"
    >

      {/* HEADER */}

      <div
        className="

flex
flex-col
md:flex-row
md:items-start
md:justify-between
gap-5

"
      >

        {/* USER */}

        <div className="flex gap-4">

          {/* AVATAR */}

          {review.avatar ? (

            <img
              src={review.avatar}
              alt={
                review.customerName
              }
              className="

w-16
h-16
rounded-full
object-cover

"
            />

          ) : (

            <div
              className="

flex
items-center
justify-center

w-16
h-16
rounded-full

bg-blue-100
text-blue-600
text-3xl

"
            >

              <FaUserCircle />

            </div>

          )}

          {/* INFO */}

          <div>

            <div className="flex gap-3 items-center">

              <h3
                className="

text-lg
font-bold
text-slate-900

"
              >

                {
                  review.customerName
                }

              </h3>

              <Badge
                variant="success"
              >

                <FaCheckCircle />

                Verified

              </Badge>

            </div>

            <p
              className="

mt-2
text-sm
text-slate-500

"
            >

              {
                review.date
              }

            </p>

          </div>

        </div>

        {/* RATING */}

        <div className="flex gap-1">

          {[1,2,3,4,5].map(
            (star)=>(

            <FaStar
              key={star}
              className={`

text-lg

${
star <=
review.rating
? "text-yellow-400"
: "text-slate-300"
}

`}
            />

          ))}

        </div>

      </div>

      {/* CONTENT */}

      <div className="mt-8">

        <div
          className="

text-blue-100
text-4xl
mb-4

"
        >

          <FaQuoteLeft />

        </div>

        <p
          className="

leading-8
text-slate-600
text-lg

"
        >

          {review.comment}

        </p>

      </div>

    </Card>

  );

}