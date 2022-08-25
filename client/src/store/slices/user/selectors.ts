import { RootState } from 'src/store';

export const selectIsLoggedIn = (state: RootState) => !!state.user.token;

export const selectCurrentLocation = (state: RootState) => state.user.location;

export const selectAuthToken = (state: RootState) => state.user.token;

export const selectCurrentView = (state: RootState) => state.user.currentView;

export const selectIsUserLoading = (state: RootState) => state.user.isLoading;
