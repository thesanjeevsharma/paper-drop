import { RANGE_DROPS_DISTANCE } from 'src/constants/config';
import { Coordinates, Drop } from 'src/constants/types';

const deg2rad = (deg: number): number => {
   return deg * (Math.PI / 180);
};

export const getDistanceFromLatLon = ({
   location1,
   location2,
}: {
   location1: Coordinates;
   location2: Coordinates;
}): number => {
   const R = 6371; // Radius of the earth in km

   const { latitude: lat1, longitude: lon1 } = location1;
   const { latitude: lat2, longitude: lon2 } = location2;

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
      const distance = getDistanceFromLatLon({
         location1: drop.location,
         location2: currentLocation,
      });

      if (distance < RANGE_DROPS_DISTANCE) {
         rangeDrops.push(drop);
      } else {
         nearbyDrops.push(drop);
      }
   }

   console.log('returninh...');

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
