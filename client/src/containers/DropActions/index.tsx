import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import DropMessageForm from '../DropMessageForm';

const DropActions = () => {
   const dispatch = useDispatch<AppDispatch>();

   const [isDropFormOpen, setIsDropFormOpen] = React.useState<boolean>(false);

   return (
      <>
         <Box bg="white" px={6} py={8}>
            <Button
               bg="green.500"
               color="white"
               width="full"
               onClick={() => setIsDropFormOpen(true)}
            >
               Drop a message here
            </Button>
         </Box>

         <DropMessageForm
            isOpen={isDropFormOpen}
            onClose={() => setIsDropFormOpen(false)}
         />
      </>
   );
};

export default DropActions;
