export type Coordinates = {
   latitude: number;
   longitude: number;
};

export type Drop = {
   id: string;
   location: Coordinates;
   expiresAt: string;
};

export type DropDetails = Drop & {
   message: string;
   author: string;
   readByCount: number;
};
