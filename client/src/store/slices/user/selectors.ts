import { RootState } from "src/store";

export const selectIsLoggedIn = (state: RootState) => !!state.user.token;

export const selectCurrentLocation = (state: RootState) => state.user.location;
