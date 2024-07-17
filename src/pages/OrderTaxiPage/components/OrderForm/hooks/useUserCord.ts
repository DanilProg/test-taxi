import { useEffect, useState } from "react";

export const useUserCord = () => {
  const [userCord, setUserCord] = useState({
    latitude: 55.75,
    longitude: 37.57,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setUserCord({
            latitude,
            longitude,
          });
        },
      );
    }
  }, []);

  return { userCord, changeUserCord: setUserCord };
};
