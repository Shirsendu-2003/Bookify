// src/utils/updateCurrentLocation.js

import axiosInstance from "../services/api";

export const updateCurrentLocation = async () => {
  if (!navigator.geolocation) return;

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await axiosInstance.put("/providers/location", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          resolve(true);
        } catch (err) {
          console.error("Location update failed", err);
          resolve(false);
        }
      },
      (err) => {
        console.error(err);
        resolve(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};