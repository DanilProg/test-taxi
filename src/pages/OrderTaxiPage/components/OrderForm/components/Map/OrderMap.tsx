import { Map, Placemark, TypeSelector } from "@pbe/react-yandex-maps";
import { geocodeCord } from "@/services/geocodeService.ts";
import { useMemo, useRef } from "react";

export const OrderMap = ({
  setAddress,
  setCoords,
  userCord,
  coords,
}: {
  setAddress: (address: string) => void;
  setCoords: (coords: number[]) => void;
  userCord: { latitude: number; longitude: number };
  coords?: number[];
}) => {
  const mapState = useMemo(
    () => ({ center: [userCord.latitude, userCord.longitude], zoom: 16 }),
    [userCord.latitude, userCord.longitude],
  );
  const ref = useRef<ymaps.Map>();

  const setCoordsAndAddress = async (coords: number[]) => {
    const data = await geocodeCord([coords[1], coords[0]]);
    const geoObject =
      data.response.GeoObjectCollection.featureMember[0].GeoObject;
    setCoords(coords);
    setAddress(geoObject.description + "," + geoObject.name);
  };

  return (
    <Map
      state={mapState}
      className="h-full w-full"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={async (event: any) => {
        if (event && typeof event === "object" && "get" in event) {
          const coords = event?.get("coords");
          await setCoordsAndAddress(coords);
        }
      }}
    >
      <TypeSelector />
      {coords && (
        <Placemark
          instanceRef={ref}
          onDragEnd={async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            const coords = ref.current.geometry._coordinates;
            await setCoordsAndAddress(coords);
          }}
          geometry={coords}
          options={{
            iconImageSize: [10, 10],
            preset: "islands#yellowDotIcon",
            draggable: true,
          }}
        />
      )}
    </Map>
  );
};
