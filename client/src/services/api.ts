/* eslint-disable no-unreachable */
import axios from 'axios';
import { Coordinates, Drop, DropDetails } from 'src/constants/types';
import { API_URLS } from 'src/constants/urls';

const HEADERS = { 'Content-Type': 'application/json' };

type ApiResponse<T> = {
   success: boolean;
   message: string;
   data?: T;
};

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
   const d = new Date();

   const sampleDrops: Drop[] = Array(20)
      .fill(null)
      .map((_) => ({
         id: Math.random().toString(),
         expiresAt: d.toISOString(),
         location: {
            latitude:
               currentLocation.latitude -
               parseFloat((Math.random() * 0.005).toPrecision(3)),
            longitude:
               currentLocation.longitude +
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

type FetchDropData = {
   drop: DropDetails;
};

export const fetchDrop = async (
   dropId: string
): Promise<ApiResponse<FetchDropData>> => {
   const d = new Date();
   d.setMonth(d.getMonth() + 1);

   return Promise.resolve({
      success: true,
      message: 'Drop fetched!',
      data: {
         drop: {
            id: dropId,
            location: {
               latitude: 1,
               longitude: 1,
            },
            expiresAt: d.toISOString(),
            author: 'Anonymous',
            message: 'We are hosting a party here at 8PM!',
            readByCount: 8,
         },
      },
   });

   const res: any = await axios.get(API_URLS.FETCH_DROP + `/${dropId}`, {
      headers: HEADERS,
   });

   const response = res.json();

   return response;
};
