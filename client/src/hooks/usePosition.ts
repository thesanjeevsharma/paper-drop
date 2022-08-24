import React from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'src/store';
import { setLocation } from 'src/store/slices/user';

const options = {
   enableHighAccuracy: true,
   timeout: 5000,
   maximumAge: 5000,
};

const usePosition = () => {
   const dispatch = useDispatch<AppDispatch>();

   const navId = React.useRef<number>(0);

   React.useEffect(() => {
      const onSuccess = (pos: any) => {
         console.log('📌 location changed', pos);
         const { latitude, longitude } = pos.coords;
         dispatch(setLocation({ coordinates: { latitude, longitude } }));
      };

      const onError = (err: any) => {
         console.error('Location error: ', err.message);
      };

      navId.current = navigator.geolocation.watchPosition(
         onSuccess,
         onError,
         options
      );

      return () => {
         navigator.geolocation.clearWatch(navId.current);
      };
   }, [dispatch]);
};

export default usePosition;
