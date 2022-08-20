import axios from 'axios';
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
