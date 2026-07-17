import {
  FaClock,
  FaMoneyBillWave,
  FaEdit,
  FaTrash,
  FaTag,
} from "react-icons/fa";

import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";

export default function ServiceCard({

  service,

  editable=false,

  onEdit,

  onDelete,

  onBook,

}) {

  return (

    <Card
      className="

h-full
transition-all
duration-300

hover:-translate-y-1
hover:shadow-xl

"
    >

      {/* HEADER */}

      <div
        className="

flex
justify-between
items-start
gap-5
mb-6

"
      >

        <div>

          <h2
            className="

text-2xl
font-bold
text-slate-900

"
          >

            {service.title}

          </h2>

          <p
            className="

mt-3
text-slate-600
leading-7

"
          >

            {
              service.description
            }

          </p>

        </div>

        {service.category && (

          <Badge variant="info">

            <FaTag />

            {service.category}

          </Badge>

        )}

      </div>

      {/* DETAILS */}

      <div
        className="

grid
sm:grid-cols-2
gap-5

"
      >

        <div className="flex gap-4">

          <FaMoneyBillWave
            className="

text-green-600
mt-1

"
          />

          <div>

            <p className="text-sm text-slate-500">

              Price

            </p>

            <h4
              className="

font-bold
text-xl

"
            >

              ₹
              {
                service.price
              }

            </h4>

          </div>

        </div>

        <div className="flex gap-4">

          <FaClock
            className="

text-blue-600
mt-1

"
          />

          <div>

            <p className="text-sm text-slate-500">

              Duration

            </p>

            <h4 className="font-semibold">

              {
                service.duration
              }

            </h4>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div
        className="

mt-8
pt-6
border-t

flex
flex-wrap
gap-4

"
      >

        {/* DASHBOARD MODE */}

        {editable ? (

          <>

            <Button
              variant="secondary"
              onClick={()=>
                onEdit?.(
                  service
                )
              }
            >

              <FaEdit />

              Edit

            </Button>

            <Button
              variant="danger"
              onClick={()=>
                onDelete?.(
                  service
                )
              }
            >

              <FaTrash />

              Delete

            </Button>

          </>

        ) : (

          <Button
            onClick={()=>
              onBook?.(
                service
              )
            }
          >

            Book Service

          </Button>

        )}

      </div>

    </Card>

  );

}