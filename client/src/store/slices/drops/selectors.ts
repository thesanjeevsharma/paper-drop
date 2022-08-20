import { RootState } from 'src/store';

export const selectNearbyDrops = (state: RootState) => state.drops.nearbyDrops;

export const selectRangeDrops = (state: RootState) => state.drops.rangeDrops;
