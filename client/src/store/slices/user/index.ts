import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";

import type { Coordinates } from "src/constants/types";

type UserState = {
  token: null | string;
  location: null | Coordinates;
};

const initialState: UserState = {
  location: null,
  token: null,
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

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload.coordinates;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setLocation, setToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
