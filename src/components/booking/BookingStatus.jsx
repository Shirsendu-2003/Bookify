import {
  FaClock,
  FaCheckCircle,
  FaTools,
  FaClipboardCheck,
  FaTimesCircle,
} from "react-icons/fa";

const bookingSteps = [

  {
    key:"PENDING",
    title:"Pending",
    icon:<FaClock />,
  },

  {
    key:"CONFIRMED",
    title:"Confirmed",
    icon:<FaCheckCircle />,
  },

  {
    key:"IN_PROGRESS",
    title:"In Progress",
    icon:<FaTools />,
  },

  {
    key:"COMPLETED",
    title:"Completed",
    icon:<FaClipboardCheck />,
  },

];

export default function BookingStatus({

  status="PENDING",

}) {

  if(status==="CANCELLED"){

    return(

      <div
        className="

rounded-3xl
border
border-red-200
bg-red-50
p-8

"
      >

        <div className="flex items-center gap-4">

          <div
            className="

flex
items-center
justify-center

w-16
h-16
rounded-full

bg-red-100
text-red-600
text-2xl

"
          >

            <FaTimesCircle />

          </div>

          <div>

            <h3
              className="

text-2xl
font-bold
text-red-700

"
            >

              Booking Cancelled

            </h3>

            <p
              className="

mt-2
text-red-600

"
            >

              This booking was cancelled
              and is no longer active.

            </p>

          </div>

        </div>

      </div>

    );

  }

  const currentIndex =
    bookingSteps.findIndex(
      (step)=>
        step.key===status
    );

  return (

    <div
      className="

rounded-3xl
bg-white
border
border-slate-200
p-8
shadow-sm

"
    >

      {/* HEADER */}

      <div className="mb-10">

        <h2
          className="

text-2xl
font-bold
text-slate-900

"
        >

          Booking Progress

        </h2>

        <p
          className="

mt-3
text-slate-500

"
        >

          Track your booking
          journey in real time.

        </p>

      </div>

      {/* DESKTOP STEPPER */}

      <div className="hidden md:block">

        <div className="relative">

          {/* LINE */}

          <div
            className="

absolute
top-7
left-0
w-full
h-1

bg-slate-200

"
          />

          {/* ACTIVE LINE */}

          <div
            className="

absolute
top-7
left-0
h-1

bg-blue-600
transition-all
duration-700

"
            style={{

              width:
                `${
                  (currentIndex) /
                  (
                    bookingSteps.length -1
                  )
                  *100
                }%`,

            }}
          />

          <div
            className="

grid
grid-cols-4
gap-4
relative

"
          >

            {bookingSteps.map(
              (step,index)=>{

              const active =
                index <= currentIndex;

              return(

                <div
                  key={step.key}
                  className="text-center"
                >

                  <div
                    className={`

mx-auto

flex
items-center
justify-center

w-14
h-14
rounded-full
border-4

transition-all
duration-300

${
active
? `

bg-blue-600
border-blue-600
text-white

`
: `

bg-white
border-slate-300
text-slate-400

`
}

`}
                  >

                    {step.icon}

                  </div>

                  <h4
                    className={`

mt-5
font-semibold

${
active
? "text-blue-600"
: "text-slate-500"
}

`}
                  >

                    {step.title}

                  </h4>

                </div>

              );

            })}

          </div>

        </div>

      </div>

      {/* MOBILE TIMELINE */}

      <div className="md:hidden">

        <div className="space-y-8">

          {bookingSteps.map(
            (step,index)=>{

            const active =
              index <= currentIndex;

            return(

              <div
                key={step.key}
                className="flex gap-5"
              >

                <div className="flex flex-col items-center">

                  <div
                    className={`

flex
items-center
justify-center

w-12
h-12
rounded-full

${
active
? "bg-blue-600 text-white"
: "bg-slate-200 text-slate-500"
}

`}
                  >

                    {step.icon}

                  </div>

                  {index !==
                    bookingSteps.length-1 &&
                  (

                    <div
                      className={`

w-1
h-16
mt-2

${
active
? "bg-blue-600"
: "bg-slate-200"
}

`}
                    />

                  )}

                </div>

                <div>

                  <h4
                    className={`

font-bold

${
active
? "text-blue-600"
: "text-slate-500"
}

`}
                  >

                    {step.title}

                  </h4>

                  <p
                    className="

mt-2
text-sm
text-slate-500

"
                  >

                    Booking status:
                    {" "}
                    {step.key}

                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

      {/* CURRENT STATUS */}

      <div
        className="

mt-10
rounded-2xl
bg-blue-50
border
border-blue-100
p-6

"
      >

        <h4
          className="

font-semibold
text-blue-700

"
        >

          Current Status

        </h4>

        <p
          className="

mt-3
text-blue-600

"
        >

          Your booking is currently
          marked as
          {" "}

          <span className="font-bold">

            {status}

          </span>

        </p>

      </div>

    </div>

  );

}