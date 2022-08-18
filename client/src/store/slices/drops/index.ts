import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

import type { Drop } from "src/constants/types";

type DropsState = {
  nearbyDrops: Drop[];
  myDrops: Drop[];
};

const initialState: DropsState = {
  nearbyDrops: [],
  myDrops: [],
};

// export const loadUser = createAsyncThunk(
//   "user/loadUser",
//   async (token: string, { rejectWithValue }) => {
//     try {
//       const response = await userDetailsApi(token);
//       if (response.success) {
//         return response.data;
//       }
//       throw Error(response.message);
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const dropsSlice = createSlice({
  initialState,
  name: "drops",
  reducers: {
    setNearbyDrops: (state, action) => {
      state.nearbyDrops = action.payload.drops;
    },
    setMyDrops: (state, action) => {
      state.myDrops = action.payload.drops;
    },
  },
});

export const { setMyDrops, setNearbyDrops } = dropsSlice.actions;

export const selectDrops = (state: RootState) => state.user;

export default dropsSlice.reducer;
