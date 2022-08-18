import React from "react";
import Map, { Marker } from "react-map-gl";

import mapboxgl from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLocation } from "src/store/slices/user/selectors";
import { setLocation } from "src/store/slices/user";
import { setNearbyDrops } from "src/store/slices/drops";
import { selectNearbyDrops } from "src/store/slices/drops/selectors";

import type { Drop } from "src/constants/types";

//@ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const DropMap = () => {
  const dispatch = useDispatch();
  const currentLocation = useSelector(selectCurrentLocation);
  const nearbyDrops = useSelector(selectNearbyDrops);

  const getCurrentLocation = React.useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        dispatch(
          setLocation({
            coordinates: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          })
        );
      });
    } else {
      alert("Location access needed!");
    }
  }, [dispatch]);

  const getDrops = React.useCallback(() => {
    if (!currentLocation) return dispatch(setNearbyDrops({ drops: [] }));

    const sampleDrops: Drop[] = Array(10)
      .fill(null)
      .map((_) => ({
        id: Math.random().toString(),
        expiresAt: "",
        location: {
          latitude:
            currentLocation.latitude -
            parseFloat((Math.random() * 0.005).toPrecision(3)),
          longitude:
            currentLocation.longitude -
            parseFloat((Math.random() * 0.005).toPrecision(3)),
        },
      }));

    dispatch(setNearbyDrops({ drops: sampleDrops }));
  }, [currentLocation, dispatch]);

  React.useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  React.useEffect(() => {
    getDrops();
  }, [currentLocation, getDrops]);

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
        color="#2F855A"
        scale={0.9}
        anchor="bottom"
      />
      {nearbyDrops.map((drop) => (
        <Marker
          key={drop.id}
          scale={0.8}
          longitude={drop.location.longitude}
          latitude={drop.location.latitude}
          anchor="bottom"
        />
      ))}
    </Map>
  );
};

export default DropMap;
