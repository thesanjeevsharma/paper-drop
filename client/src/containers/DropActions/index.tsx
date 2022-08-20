import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DropMessageForm from '../DropMessageForm';
import { selectRangeDrops } from 'src/store/slices/drops/selectors';
import RangeDropsList from '../RangeDropsList';

const DropActions = () => {
   const rangeDrops = useSelector(selectRangeDrops);

   const [isDropFormOpen, setIsDropFormOpen] = React.useState<boolean>(false);
   const [isRangeDropsModalOpen, setIsRangeDropsModalOpen] =
      React.useState<boolean>(false);

   const totalDrops = rangeDrops.length;

   return (
      <>
         <Box bg="white" px={6} py={8}>
            <Button
               bg="green.600"
               color="white"
               width="full"
               onClick={() => setIsDropFormOpen(true)}
               mb={2}
            >
               Drop a message here
            </Button>

            {!!totalDrops && (
               <Button
                  variant="outline"
                  color="green.600"
                  width="full"
                  onClick={() => setIsRangeDropsModalOpen(true)}
               >
                  {totalDrops} drop{totalDrops > 1 && 's'} near you
               </Button>
            )}
         </Box>

         <DropMessageForm
            isOpen={isDropFormOpen}
            onClose={() => setIsDropFormOpen(false)}
         />

         <RangeDropsList
            isOpen={isRangeDropsModalOpen}
            onClose={() => setIsRangeDropsModalOpen(false)}
         />
      </>
   );
};

export default DropActions;
