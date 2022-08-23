import React from 'react';
import Map, { Marker } from 'react-map-gl';

import mapboxgl from 'mapbox-gl';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentLocation } from 'src/store/slices/user/selectors';
import { setLocation } from 'src/store/slices/user';
import { getNearbyDrops } from 'src/store/slices/drops';
import {
   selectNearbyDrops,
   selectRangeDrops,
} from 'src/store/slices/drops/selectors';

import { AppDispatch } from 'src/store';
import { getCurrentLocation } from 'src/utils';

//@ts-ignore
mapboxgl.workerClass =
   // eslint-disable-next-line import/no-webpack-loader-syntax
   require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const DropMap = () => {
   const dispatch = useDispatch<AppDispatch>();
   const currentLocation = useSelector(selectCurrentLocation);
   const nearbyDrops = useSelector(selectNearbyDrops);
   const rangeDrops = useSelector(selectRangeDrops);

   const intervalId = React.useRef<any>(null);

   const setCurrentLocation = React.useCallback(() => {
      getCurrentLocation((pos) => {
         // TODO: gets called 2 times

         if (pos) {
            dispatch(
               setLocation({
                  coordinates: {
                     latitude: pos.latitude,
                     longitude: pos.longitude,
                  },
               })
            );
         }
      });
   }, [dispatch]);

   const getDrops = React.useCallback(() => {
      const onSuccess = () => {};
      const onFailure = () => console.log('Failed to fetch drops!');

      dispatch(getNearbyDrops({ currentLocation, onSuccess, onFailure }));
   }, [currentLocation, dispatch]);

   React.useEffect(() => {
      if (!nearbyDrops.length && currentLocation) {
         console.log('fetching from server...');
         getDrops();
      }
   }, [currentLocation, getDrops, nearbyDrops.length]);

   React.useEffect(() => {
      setCurrentLocation();

      // location syncing
      if (intervalId.current) clearInterval(intervalId.current);
      intervalId.current = setInterval(() => {
         setCurrentLocation();
      }, 3000);

      return () => {
         if (intervalId.current) {
            clearInterval(intervalId.current);
         }
      };
   }, [setCurrentLocation]);

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
         style={{ width: '100%', height: '100vh' }}
      >
         <Marker
            longitude={currentLocation.longitude}
            latitude={currentLocation.latitude}
            color="#2F855A"
            scale={0.9}
            anchor="bottom"
         />
         {rangeDrops.map((drop) => (
            <Marker
               key={drop._id}
               scale={0.8}
               color="#805AD5"
               longitude={drop.location.longitude}
               latitude={drop.location.latitude}
               anchor="bottom"
            />
         ))}
         {nearbyDrops.map((drop) => (
            <Marker
               key={drop._id}
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
