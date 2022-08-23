export type Coordinates = {
   latitude: number;
   longitude: number;
};

export type Drop = {
   _id: string;
   location: Coordinates;
   createdAt: string;
   author: string;
   readBy: number;
};

export type DropDetails = Drop & {
   message: string;
};
