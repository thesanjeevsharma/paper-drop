import React from "react";
import Map, { Marker } from "react-map-gl";

const DropMap = () => {
  const [currentLocation, setCurrentLocation] = React.useState<any>(null);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentLocation(pos.coords);
      });
    }
  }, []);

  if (!currentLocation) {
    return <>"Loading..."</>;
  }

  return (
    <Map
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      // mapStyle="mapbox://styles/codinggraden/ckcf90duj0ckb1hp4jgqyflsb"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      initialViewState={{
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude,
        zoom: 15,
      }}
      style={{ width: "100%", height: "100vh" }}
    >
      <Marker
        longitude={currentLocation.longitude}
        latitude={currentLocation.latitude}
        anchor="bottom"
      />
    </Map>
  );
};

export default DropMap;
