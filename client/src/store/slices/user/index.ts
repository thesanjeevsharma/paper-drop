import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

import type { Coordinates } from 'src/constants/types';
import { userLogin } from 'src/services/api';

type UserState = {
   token: null | string;
   location: null | Coordinates;
   userDetails: any;
};

const initialState: UserState = {
   location: null,
   token: null,
   userDetails: null,
};

export const login = createAsyncThunk(
   'user/login',
   async (
      { googleResponse, onSuccess, onFailure }: any,
      { rejectWithValue }
   ) => {
      try {
         const response = await userLogin(googleResponse);

         if (response.success) {
            onSuccess();
            return response.data;
         }

         onFailure();
         throw Error(response.message);
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const userSlice = createSlice({
   initialState,
   name: 'user',
   reducers: {
      setLocation: (state, action) => {
         state.location = action.payload.coordinates;
      },
      setToken: (state, action) => {
         state.token = action.payload.token;
      },
      logout: (state) => {
         state.token = null;
         state.location = null;
         state.userDetails = null;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
         state.token = action.payload.token;
         state.userDetails = action.payload.user;
      });
      builder.addCase(login.rejected, (state) => {
         state.userDetails = null;
         state.token = null;
      });
   },
});

export const { setLocation, setToken, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
