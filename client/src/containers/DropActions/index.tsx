import React from 'react';
import { Button, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DropMessageForm from '../DropMessageForm';
import { selectRangeDrops } from 'src/store/slices/drops/selectors';
import RangeDropsList from '../RangeDropsList';
import { selectCurrentView } from 'src/store/slices/user/selectors';

const DropActions = () => {
   const rangeDrops = useSelector(selectRangeDrops);
   const currentView = useSelector(selectCurrentView);

   const [isDropFormOpen, setIsDropFormOpen] = React.useState<boolean>(false);
   const [isRangeDropsModalOpen, setIsRangeDropsModalOpen] =
      React.useState<boolean>(false);

   const totalDrops = rangeDrops.length;

   return (
      <>
         <Button
            bg="green.600"
            color="white"
            width="full"
            onClick={() => setIsDropFormOpen(true)}
            mb={2}
         >
            Drop a message here
         </Button>

         {!!totalDrops && currentView === 'nearby' && (
            <Button
               variant="outline"
               color="green.600"
               width="full"
               onClick={() => setIsRangeDropsModalOpen(true)}
            >
               {totalDrops} Drop{totalDrops > 1 && 's'} near you
            </Button>
         )}

         {currentView === 'my' && (
            <Text textAlign="center" fontStyle="italic" color="gray.500">
               Tap drops to delete them!
            </Text>
         )}

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
