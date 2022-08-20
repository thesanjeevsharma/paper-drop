import { RANGE_DROPS_DISTANCE } from 'src/constants/config';
import { Coordinates, Drop } from 'src/constants/types';

const deg2rad = (deg: number): number => {
   return deg * (Math.PI / 180);
};

const getDistanceFromLatLon = (
   lat1: number,
   lon1: number,
   lat2: number,
   lon2: number
): number => {
   const R = 6371; // Radius of the earth in km

   const dLat = deg2rad(lat2 - lat1);
   const dLon = deg2rad(lon2 - lon1);

   const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
         Math.cos(deg2rad(lat2)) *
         Math.sin(dLon / 2) *
         Math.sin(dLon / 2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

   const distance = R * c * 1000;
   return distance;
};

export const filterRangeDrops = (
   drops: Drop[],
   currentLocation: Coordinates
) => {
   const nearbyDrops: Drop[] = [];
   const rangeDrops: Drop[] = [];

   for (const drop of drops) {
      const distance = getDistanceFromLatLon(
         drop.location.latitude,
         drop.location.longitude,
         currentLocation.latitude,
         currentLocation.longitude
      );

      console.log(distance);

      if (distance < RANGE_DROPS_DISTANCE) {
         rangeDrops.push(drop);
      } else {
         nearbyDrops.push(drop);
      }
   }

   return {
      nearbyDrops,
      rangeDrops,
   };
};

export const getCurrentLocation = (
   fn: (pos?: GeolocationCoordinates) => void
) => {
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
         fn(pos.coords);
      });
   } else {
      alert('Location access needed!');
   }
};
