import React from 'react';
import {
   Button,
   Checkbox,
   Drawer,
   DrawerBody,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   Text,
   Textarea,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Map, { Marker } from 'react-map-gl';

import { AppDispatch } from 'src/store';
import { dropMessage } from 'src/store/slices/drops';
import { selectCurrentLocation } from 'src/store/slices/user/selectors';

type Props = {
   isOpen: boolean;
   onClose: () => void;
};

const DropMessageForm = ({ isOpen, onClose }: Props) => {
   const dispatch = useDispatch<AppDispatch>();
   const currentLocation = useSelector(selectCurrentLocation);

   const [message, setMessage] = React.useState<string>('');
   const [isAnonymous, setIsAnonymous] = React.useState<boolean>(false);
   const [isInFlight, setIsInFlight] = React.useState<boolean>(false);

   const resetForm = () => {
      setIsAnonymous(false);
      setMessage('');
   };

   const handleDrop = () => {
      setIsInFlight(true);

      const onSuccess = () => {
         setIsInFlight(false);
         resetForm();
         onClose();
      };

      const onFailure = () => {
         setIsInFlight(false);
         console.log('Failed to drop message!');
      };

      const drop = {
         isAnonymous,
         message,
      };

      dispatch(dropMessage({ dropDetails: drop, onSuccess, onFailure }));
   };

   return (
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
         <DrawerOverlay />
         <DrawerContent>
            <DrawerHeader>Drop a message here</DrawerHeader>

            <DrawerBody>
               <Map
                  mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  // mapStyle="mapbox://styles/codinggraden/ckcf90duj0ckb1hp4jgqyflsb"
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  initialViewState={{
                     longitude: currentLocation!.longitude,
                     latitude: currentLocation!.latitude,
                     zoom: 18,
                  }}
                  style={{ width: '100%', height: '40vh' }}
               >
                  <Marker
                     color="#2F855A"
                     longitude={currentLocation!.longitude}
                     latitude={currentLocation!.latitude}
                     anchor="bottom"
                  />
               </Map>

               <Checkbox
                  isChecked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                  colorScheme="green"
                  defaultChecked
                  my={4}
               >
                  Anonymous Drop
               </Checkbox>

               <Text mb={2}>What's your message?</Text>
               <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="We're hosting a party at 8PM here!"
                  size="sm"
               />
            </DrawerBody>

            <DrawerFooter>
               <Button
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                  isDisabled={isInFlight}
               >
                  Cancel
               </Button>
               <Button
                  bg="green.600"
                  color="white"
                  onClick={handleDrop}
                  isLoading={isInFlight}
                  isDisabled={!message.trim()}
                  width={48}
               >
                  Drop
               </Button>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
};

export default DropMessageForm;
