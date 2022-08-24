/* eslint-disable no-unreachable */
import axios from 'axios';
import { Coordinates, DropDetails } from 'src/constants/types';
import { API_URLS } from 'src/constants/urls';

const HEADERS = { 'Content-Type': 'application/json' };

type ApiResponse<T> = {
   success: boolean;
   message: string;
   data?: T;
};

const getAuthHeaders = (token: string) => {
   return {
      ...HEADERS,
      Authorization: `Bearer ${token}`,
   };
};

export const userLogin = async (userDetails: any): Promise<any> => {
   const response: any = await axios.post(
      API_URLS.CREATE_ACCOUNT,
      userDetails,
      {
         headers: HEADERS,
      }
   );

   return response.data;
};

export const createDrop = async (dropDetails: any, token: string) => {
   console.log(dropDetails);
   const response: any = await axios.post(API_URLS.DROP_MESSAGE, dropDetails, {
      headers: getAuthHeaders(token),
   });

   return response.data;
};

export const fetchNearbyDrops = async (
   currentLocation: Coordinates,
   token: string
) => {
   const { longitude, latitude } = currentLocation;

   const response: any = await axios.get(
      API_URLS.FETCH_NEARBY_DROPS + `?lon=${longitude}&lat=${latitude}`,
      {
         headers: getAuthHeaders(token),
      }
   );

   return response.data;
};

export const fetchMyDrops = async (token: string) => {
   const response: any = await axios.get(API_URLS.FETCH_MY_DROPS, {
      headers: getAuthHeaders(token),
   });

   return response.data;
};

type FetchDropData = {
   drop: DropDetails;
};

export const fetchDrop = async (
   dropId: string,
   token: string
): Promise<ApiResponse<FetchDropData>> => {
   const response: any = await axios.get(API_URLS.FETCH_DROP + `/${dropId}`, {
      headers: getAuthHeaders(token),
   });

   return response.data;
};
