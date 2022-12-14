import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'src/store';
import {
   createDrop,
   deleteDrop,
   fetchMyDrops,
   fetchNearbyDrops,
} from 'src/services/api';
import { filterRangeDrops } from 'src/utils';
import type { Drop } from 'src/constants/types';

type DropsState = {
   rangeDrops: Drop[];
   nearbyDrops: Drop[];
   myDrops: Drop[];
   showLoading: boolean;
};

const initialState: DropsState = {
   rangeDrops: [],
   nearbyDrops: [],
   myDrops: [],
   showLoading: false,
};

export const dropMessage = createAsyncThunk(
   'drop/dropMessage',
   async (
      { dropDetails, onSuccess, onFailure }: any,
      { getState, rejectWithValue }
   ) => {
      try {
         const state: any = getState();

         const dropDetailsWithLocation = {
            ...dropDetails,
            location: state.user.location,
         };
         const response = await createDrop(
            dropDetailsWithLocation,
            state.user.token
         );

         if (response.success) {
            onSuccess();
            return response.data;
         }

         onFailure(response.message);
         throw Error(response.message);
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const getNearbyDrops = createAsyncThunk(
   'drop/getNearbyDrops',
   async ({ onSuccess, onFailure }: any, { getState, rejectWithValue }) => {
      try {
         const state: any = getState();

         const response = await fetchNearbyDrops(
            state.user.location,
            state.user.token
         );

         if (response.success) {
            onSuccess();
            return { ...response.data, currentLocation: state.user.location };
         }

         onFailure(response.message);
         throw Error(response.message);
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const getMyDrops = createAsyncThunk(
   'drop/getMyDrops',
   async ({ onSuccess, onFailure }: any, { getState, rejectWithValue }) => {
      try {
         const state: any = getState();

         const response = await fetchMyDrops(state.user.token);

         if (response.success) {
            onSuccess();
            return response.data;
         }

         onFailure(response.message);
         throw Error(response.message);
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const removeDrop = createAsyncThunk(
   'drop/removeDrop',
   async (
      { dropId, onSuccess, onFailure }: any,
      { getState, rejectWithValue }
   ) => {
      try {
         const state: any = getState();

         const response = await deleteDrop(dropId, state.user.token);

         if (response.success) {
            onSuccess();
            return response.data;
         }

         onFailure(response.message);
         throw Error(response.message);
      } catch (error: any) {
         return rejectWithValue(error.message);
      }
   }
);

export const dropsSlice = createSlice({
   initialState,
   name: 'drops',
   reducers: {
      setMyDrops: (state, action) => {
         state.myDrops = action.payload.drops;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(dropMessage.fulfilled, (state, action) => {
         state.myDrops.unshift(action.payload.drop);
         state.showLoading = false;
      });
      builder.addCase(dropMessage.pending, (state) => {
         state.showLoading = true;
      });
      builder.addCase(dropMessage.rejected, (state) => {
         state.showLoading = false;
      });

      builder.addCase(getNearbyDrops.fulfilled, (state, action) => {
         const { nearbyDrops, rangeDrops } = filterRangeDrops(
            action.payload.drops,
            action.payload.currentLocation
         );

         state.nearbyDrops = nearbyDrops;
         state.rangeDrops = rangeDrops;
         state.showLoading = false;
      });
      builder.addCase(getNearbyDrops.pending, (state) => {
         state.showLoading = true;
      });
      builder.addCase(getNearbyDrops.rejected, (state) => {
         state.showLoading = false;
      });

      builder.addCase(getMyDrops.fulfilled, (state, action) => {
         state.myDrops = action.payload.drops;
         state.showLoading = false;
      });
      builder.addCase(getMyDrops.pending, (state) => {
         state.showLoading = true;
      });
      builder.addCase(getMyDrops.rejected, (state) => {
         state.showLoading = false;
      });

      builder.addCase(removeDrop.fulfilled, (state, action) => {
         state.myDrops = state.myDrops.filter(
            (drop) => drop._id !== action.payload!.drop._id
         );
         state.showLoading = false;
      });
      builder.addCase(removeDrop.pending, (state) => {
         state.showLoading = true;
      });
      builder.addCase(removeDrop.rejected, (state) => {
         state.showLoading = false;
      });
   },
});

export const { setMyDrops } = dropsSlice.actions;

export const selectDrops = (state: RootState) => state.user;

export default dropsSlice.reducer;
