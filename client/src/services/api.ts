import axios from 'axios';
import { Coordinates, Drop } from 'src/constants/types';
import { API_URLS } from 'src/constants/urls';

const HEADERS = { 'Content-Type': 'application/json' };

export const userLogin = async (userDetails: any): Promise<any> => {
   return {
      success: true,
      message: 'User signed up!',
      data: {
         token: '123',
         user: userDetails,
      },
   };

   const res: any = await axios.post(API_URLS.CREATE_ACCOUNT, userDetails, {
      headers: HEADERS,
   });

   const response = res.json();

   return response;
};

export const createDrop = async (dropDetails: any) => {
   return {
      success: true,
      message: 'Message dropped!',
      data: {
         drop: dropDetails,
      },
   };

   const res: any = await axios.post(API_URLS.DROP_MESSAGE, dropDetails, {
      headers: HEADERS,
   });

   const response = res.json();

   return response;
};

export const fetchNearbyDrops = async (currentLocation: Coordinates) => {
   const sampleDrops: Drop[] = Array(10)
      .fill(null)
      .map((_) => ({
         id: Math.random().toString(),
         expiresAt: '',
         location: {
            latitude:
               currentLocation.latitude -
               parseFloat((Math.random() * 0.005).toPrecision(3)),
            longitude:
               currentLocation.longitude -
               parseFloat((Math.random() * 0.005).toPrecision(3)),
         },
      }));

   return {
      success: true,
      message: 'Drops fetched!',
      data: {
         drops: sampleDrops,
         currentLocation,
      },
   };

   const res: any = await axios.post(
      API_URLS.FETCH_NEARBY_DROPS,
      currentLocation,
      {
         headers: HEADERS,
      }
   );

   const response = res.json();

   return response;
};
