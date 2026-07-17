import { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
} from "@react-google-maps/api";

import Card from "../common/Card";
import Button from "../common/Button";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

export default function LocationStep({
  bookingData,
  setBookingData,
  next,
  back,
}) {
  const [address, setAddress] =
    useState("");

  const [location, setLocation] =
    useState(null);

  const [gpsError, setGpsError] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [addressDetails,
    setAddressDetails] =
    useState({
      city: "",
      state: "",
      country: "",
      zipCode: "",
    });

  const getAddressFromCoordinates =
    async (lat, lng) => {

      try {

        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );

        const data =
          await response.json();

        if (data.display_name) {

          setAddress(
            data.display_name
          );

          setAddressDetails({

            city:
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "",

            state:
              data.address?.state ||
              "",

            country:
              data.address?.country ||
              "",

            zipCode:
              data.address?.postcode ||
              "",

          });

        }

      } catch (error) {

        console.error(
          "Address Fetch Error:",
          error
        );

      }

    };

  useEffect(() => {

    if (!navigator.geolocation) {

      setGpsError(
        "Geolocation is not supported by this browser."
      );

      setLoading(false);

      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        setLocation({
          lat,
          lng,
        });

        await getAddressFromCoordinates(
          lat,
          lng
        );

        setLoading(false);

      },

      (error) => {

        console.error(error);

        setGpsError(
          "Location permission denied. Please allow location access."
        );

        setLoading(false);

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }

    );

  }, []);

  const handleMapClick =
    async (event) => {

      const lat =
        event.latLng.lat();

      const lng =
        event.latLng.lng();

      setLocation({
        lat,
        lng,
      });

      await getAddressFromCoordinates(
        lat,
        lng
      );

    };

  const handleMarkerDragEnd =
    async (event) => {

      const lat =
        event.latLng.lat();

      const lng =
        event.latLng.lng();

      setLocation({
        lat,
        lng,
      });

      await getAddressFromCoordinates(
        lat,
        lng
      );

    };

  const saveLocation = () => {

    if (!location) return;

    setBookingData({

      ...bookingData,

      address,

      city:
        addressDetails.city,

      state:
        addressDetails.state,

      country:
        addressDetails.country,

      zipCode:
        addressDetails.zipCode,

      latitude:
        location.lat,

      longitude:
        location.lng,

    });

    next();

  };

  return (

    <Card>

      <h2
        className="
        text-2xl
        font-bold
        mb-5
      "
      >
        Select Location
      </h2>

      {loading && (

        <p className="text-slate-500">
          Detecting your location...
        </p>

      )}

      {gpsError && (

        <p
          className="
          text-red-500
          mb-4
          "
        >
          {gpsError}
        </p>

      )}

      {location && (

        <LoadScript
          googleMapsApiKey={
            import.meta.env
              .VITE_GOOGLE_MAPS_API_KEY
          }
        >

          <GoogleMap
            mapContainerStyle={
              mapContainerStyle
            }
            center={location}
            zoom={17}
            onClick={
              handleMapClick
            }
            options={{
              streetViewControl:
                false,
              mapTypeControl:
                false,
              fullscreenControl:
                true,
              zoomControl: true,
            }}
          >

            <Marker
              position={location}
              draggable={true}
              onDragEnd={
                handleMarkerDragEnd
              }
            />

          </GoogleMap>

        </LoadScript>

      )}

      <div className="mt-5">

        <label
          className="
          block
          text-sm
          font-medium
          mb-2
          "
        >
          Service Address
        </label>

        <textarea
          rows="3"
          className="
            w-full
            border
            border-slate-300
            rounded-xl
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          value={address}
          onChange={(e) =>
            setAddress(
              e.target.value
            )
          }
          placeholder="Select address from map"
        />

      </div>

      {location && (

        <div
          className="
          mt-5
          p-4
          bg-slate-50
          rounded-xl
          "
        >

          <h3
            className="
            text-green-600
            font-semibold
            mb-2
            "
          >
            Location Selected ✓
          </h3>

          <p>
            <strong>
              City:
            </strong>{" "}
            {
              addressDetails.city
            }
          </p>

          <p>
            <strong>
              State:
            </strong>{" "}
            {
              addressDetails.state
            }
          </p>

          <p>
            <strong>
              Country:
            </strong>{" "}
            {
              addressDetails.country
            }
          </p>

          <p>
            <strong>
              Zip Code:
            </strong>{" "}
            {
              addressDetails.zipCode
            }
          </p>

          <p>
            <strong>
              Latitude:
            </strong>{" "}
            {location.lat}
          </p>

          <p>
            <strong>
              Longitude:
            </strong>{" "}
            {location.lng}
          </p>

        </div>

      )}

      <div
        className="
        flex
        justify-between
        mt-6
        "
      >

        <Button
          variant="secondary"
          onClick={back}
        >
          Back
        </Button>

        <Button
          onClick={saveLocation}
          disabled={!location}
        >
          Continue
        </Button>

      </div>

    </Card>

  );
}