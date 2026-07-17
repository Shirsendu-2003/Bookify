import Card from "../common/Card";
import Button from "../common/Button";
import { useNavigate }
from "react-router-dom";

export default function BookingSuccess() {

  const navigate =
    useNavigate();

  return (

    <Card>

      <h2
      className="
      text-green-600
      text-2xl
      font-bold">

        Booking Created

      </h2>

      <p className="mt-3">

        Waiting for provider
        acceptance.

      </p>

      <Button
        className="mt-4"
        onClick={() =>
          navigate(
            "/customer/bookings"
          )
        }
      >
        View Booking
      </Button>

    </Card>

  );
}