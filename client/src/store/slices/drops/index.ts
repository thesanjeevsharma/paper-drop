import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

import type { Drop } from 'src/constants/types';
import { createDrop } from 'src/services/api';

type DropsState = {
   nearbyDrops: Drop[];
   myDrops: Drop[];
};

const initialState: DropsState = {
   nearbyDrops: [],
   myDrops: [],
};

export const dropMessage = createAsyncThunk(
   'drop/dropMessage',
   async ({ dropDetails, onSuccess, onFailure }: any, { rejectWithValue }) => {
      try {
         const response = await createDrop(dropDetails);
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

export const dropsSlice = createSlice({
   initialState,
   name: 'drops',
   reducers: {
      setNearbyDrops: (state, action) => {
         state.nearbyDrops = action.payload.drops;
      },
      setMyDrops: (state, action) => {
         state.myDrops = action.payload.drops;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(dropMessage.fulfilled, (state, action) => {
         state.myDrops.unshift(action.payload.drop);
      });
   },
});

export const { setMyDrops, setNearbyDrops } = dropsSlice.actions;

export const selectDrops = (state: RootState) => state.user;

export default dropsSlice.reducer;
