import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { Flex, Spinner } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import { useDispatch, useSelector } from 'react-redux';

import {
   selectCurrentLocation,
   selectCurrentView,
} from 'src/store/slices/user/selectors';
import { getMyDrops, getNearbyDrops } from 'src/store/slices/drops';
import {
   selectMyDrops,
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
   const myDrops = useSelector(selectMyDrops);
   const currentView = useSelector(selectCurrentView);

   const getDrops = React.useCallback(() => {
      const onSuccess = () => {};
      const onFailure = () => console.log('Failed to fetch drops!');

      dispatch(getNearbyDrops({ onSuccess, onFailure }));
   }, [dispatch]);

   const getUserDrops = React.useCallback(() => {
      const onSuccess = () => {};
      const onFailure = () => console.log('Failed to fetch your drops!');

      dispatch(getMyDrops({ onSuccess, onFailure }));
   }, [dispatch]);

   React.useEffect(() => {
      if (currentLocation && currentView === 'nearby') {
         getDrops();
      }
      if (currentView === 'my') {
         getUserDrops();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [
      currentLocation?.latitude,
      currentLocation?.longitude,
      getDrops,
      currentView,
      getUserDrops,
   ]);

   React.useEffect(() => {
      getUserDrops();
   }, [getUserDrops]);

   const deleteDrop = (dropId: string) => {
      const isConfirmed = window.prompt(
         'Are you sure you want to delete this drop?'
      );

      if (isConfirmed) {
         // delete drop
      }
   };

   const renderDrops = () => {
      if (currentView === 'my') {
         return (
            <>
               {myDrops.map((drop) => (
                  <Marker
                     key={drop._id}
                     scale={0.8}
                     color="#68D391"
                     longitude={drop.location.longitude}
                     latitude={drop.location.latitude}
                     anchor="bottom"
                     onClick={() => deleteDrop(drop._id)}
                  />
               ))}
            </>
         );
      }

      return (
         <>
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
         </>
      );
   };

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
         {renderDrops()}
      </Map>
   );
};

export default DropMap;
