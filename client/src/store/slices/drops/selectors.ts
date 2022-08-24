import { RootState } from 'src/store';

export const selectNearbyDrops = (state: RootState) => state.drops.nearbyDrops;

export const selectRangeDrops = (state: RootState) => state.drops.rangeDrops;

export const selectMyDrops = (state: RootState) => state.drops.myDrops;

export const selectShowLoading = (state: RootState) => state.drops.showLoading;
