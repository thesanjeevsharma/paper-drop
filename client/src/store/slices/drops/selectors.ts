import { RootState } from "src/store";

export const selectNearbyDrops = (state: RootState) => state.drops.nearbyDrops;
