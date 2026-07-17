import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearchLocation,
  FaUserCheck,
  FaMapMarkerAlt,
  FaTimesCircle,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const messages = [
  "Finding nearby service professionals...",
  "Checking real-time availability...",
  "Sending booking request...",
  "Waiting for a service professional to accept...",
];

export default function SearchingProvider() {
  const navigate = useNavigate();

  const [messageIndex, setMessageIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Demo: Redirect after 30 seconds
  useEffect(() => {
    if (seconds >= 30) {
      navigate("/customer/bookings");
    }
  }, [seconds, navigate]);

  return (
    <DashboardLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-5">
        <Card className="w-full max-w-xl rounded-3xl shadow-2xl p-8 text-center">

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-orange-300 animate-ping" />

              <div className="relative w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center">
                <FaSearchLocation className="text-white text-4xl" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold">
            Searching...
          </h2>

          <p className="text-gray-500 mt-3">
            {messages[messageIndex]}
          </p>

          <div className="mt-6">
            <Loader text="" />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">

            <div className="bg-orange-50 rounded-xl p-4">
              <FaMapMarkerAlt className="mx-auto text-orange-500 text-2xl mb-2" />
              <p className="text-sm font-semibold">
                Nearby
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <FaUserCheck className="mx-auto text-green-600 text-2xl mb-2" />
              <p className="text-sm font-semibold">
                Verified
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-2xl font-bold">
                {seconds}s
              </h3>

              <p className="text-sm">
                Elapsed
              </p>
            </div>

          </div>

          <div className="mt-8 bg-slate-100 rounded-xl p-4">
            <p className="font-semibold">
              Estimated wait time
            </p>

            <p className="text-orange-600 font-bold mt-1">
              30 - 90 seconds
            </p>
          </div>

          <Button
            variant="danger"
            className="w-full mt-8"
            onClick={() => navigate("/customer/bookings")}
          >
            <FaTimesCircle className="mr-2" />
            Cancel Booking
          </Button>

        </Card>
      </div>
    </DashboardLayout>
  );
}