import Card from "../common/Card";

export default function BookingTracker({
  status
}) {

  const steps = [

    "PENDING",

    "ACCEPTED",

    "IN_PROGRESS",

    "COMPLETED"

  ];

  return (

    <Card>

      <h3 className="font-bold">

        Booking Status

      </h3>

      {steps.map((step) => (

        <div
          key={step}
          className="py-2"
        >

          {status === step
            ? "🟢"
            : "⚪"}

          {" "}
          {step}

        </div>

      ))}

    </Card>

  );
}