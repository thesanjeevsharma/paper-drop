import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'src/store';
import { userLogin, createAccount } from 'src/services/api';

import type { Coordinates } from 'src/constants/types';

type UserState = {
   token: null | string;
   location: null | Coordinates;
   userDetails: any;
   currentView: 'nearby' | 'my';
   isLoading: boolean;
};

const initialState: UserState = {
   location: null,
   token: null,
   userDetails: null,
   currentView: 'nearby',
   isLoading: false,
};

export const login = createAsyncThunk(
   'user/login',
   async ({ data, onSuccess, onFailure }: any, { rejectWithValue }) => {
      try {
         const response = await userLogin(data);

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

export const signup = createAsyncThunk(
   'user/signup',
   async ({ data, onSuccess, onFailure }: any, { rejectWithValue }) => {
      try {
         const response = await createAccount(data);

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
      setCurrentView: (state, action) => {
         state.currentView = action.payload.view;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
         state.isLoading = false;
         state.token = action.payload.token;
         state.userDetails = action.payload.user;
      });
      builder.addCase(login.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(login.rejected, (state) => {
         state.isLoading = false;
         state.userDetails = null;
         state.token = null;
      });
      builder.addCase(signup.fulfilled, (state, action) => {
         state.isLoading = false;
         state.token = action.payload.token;
         state.userDetails = action.payload.user;
      });
      builder.addCase(signup.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(signup.rejected, (state) => {
         state.isLoading = false;
      });
   },
});

export const { setLocation, setToken, logout, setCurrentView } =
   userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
