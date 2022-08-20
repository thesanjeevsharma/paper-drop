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
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { dropMessage } from 'src/store/slices/drops';

type Props = {
   isOpen: boolean;
   onClose: () => void;
};

const DropMessageForm = ({ isOpen, onClose }: Props) => {
   const dispatch = useDispatch<AppDispatch>();

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
               <Checkbox
                  isChecked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)}
                  colorScheme="green"
                  defaultChecked
                  mb={4}
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
