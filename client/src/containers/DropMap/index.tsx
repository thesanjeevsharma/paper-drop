import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { Flex, Spinner } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLocation } from 'src/store/slices/user/selectors';
import { getNearbyDrops } from 'src/store/slices/drops';
import {
   selectNearbyDrops,
   selectRangeDrops,
} from 'src/store/slices/drops/selectors';
import { AppDispatch } from 'src/store';

//@ts-ignore
mapboxgl.workerClass =
   // eslint-disable-next-line import/no-webpack-loader-syntax
   require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const DropMap = () => {
   const dispatch = useDispatch<AppDispatch>();
   const currentLocation = useSelector(selectCurrentLocation);
   const nearbyDrops = useSelector(selectNearbyDrops);
   const rangeDrops = useSelector(selectRangeDrops);

   const getDrops = React.useCallback(() => {
      const onSuccess = () => {};
      const onFailure = () => console.log('Failed to fetch drops!');

      dispatch(getNearbyDrops({ onSuccess, onFailure }));
   }, [dispatch]);

   React.useEffect(() => {
      if (currentLocation) {
         getDrops();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentLocation?.latitude, currentLocation?.longitude, getDrops]);

   if (!currentLocation) {
      return (
         <Flex h="50vh" align="center" justify="center">
            <Spinner color="green.600" />
         </Flex>
      );
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
