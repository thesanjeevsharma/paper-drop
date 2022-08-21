import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import {
   Box,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Spinner,
   Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectRangeDrops } from 'src/store/slices/drops/selectors';
import { getDistanceFromLatLon } from 'src/utils';
import { selectCurrentLocation } from 'src/store/slices/user/selectors';
import { DropDetails } from 'src/constants/types';
import { fetchDrop } from 'src/services/api';
import { ArrowBackIcon } from '@chakra-ui/icons';

type Props = {
   isOpen: boolean;
   onClose: () => void;
};

const RangeDropsList = ({ isOpen, onClose }: Props) => {
   const rangeDrops = useSelector(selectRangeDrops);
   const currentLocation = useSelector(selectCurrentLocation);

   const [selectedDropId, setSelectedDropId] = React.useState<string | null>(
      null
   );
   const [selectedDrop, setSelectedDrop] = React.useState<DropDetails>(
      {} as DropDetails
   );
   const [isInFlight, setIsInFlight] = React.useState<boolean>(false);

   const totalDrops = rangeDrops.length;

   React.useEffect(() => {
      if (selectedDropId) {
         try {
            setIsInFlight(true);
            (async () => {
               const response = await fetchDrop(selectedDropId);
               if (response.success && response.data) {
                  console.log(response.data.drop);
                  setSelectedDrop(response.data.drop);
               }
            })();
         } catch (err) {
            setSelectedDropId(null);
            console.log(err);
         } finally {
            setIsInFlight(false);
         }
      } else {
         setSelectedDrop({} as DropDetails);
      }
   }, [selectedDropId]);

   if (selectedDropId)
      return (
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minH="50vh">
               <ModalHeader>
                  <ArrowBackIcon
                     mr={2}
                     onClick={() => setSelectedDropId(null)}
                  />{' '}
                  {totalDrops} drop{totalDrops > 1 && 's'} near you
               </ModalHeader>
               {isInFlight ? (
                  <Spinner />
               ) : (
                  <ModalBody>
                     <Text>Message drop by: {selectedDrop.author}</Text>
                     <Text>
                        Expires in:{' '}
                        {/* <ReactTimeAgo
                           date={new Date(selectedDrop.expiresAt)}
                           locale="en-US"
                        /> */}
                     </Text>
                     <Text fontWeight="semibold">
                        Read by: {selectedDrop.readByCount}
                     </Text>
                     <Text my={8} fontSize="xl">
                        {selectedDrop.message}
                     </Text>
                  </ModalBody>
               )}
            </ModalContent>
         </Modal>
      );

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent minH="50vh">
            <ModalHeader>
               {totalDrops} drop{totalDrops > 1 && 's'} near you
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               {rangeDrops.map((drop) => {
                  const distance = Math.round(
                     getDistanceFromLatLon({
                        location1: drop.location,
                        location2: currentLocation!,
                     })
                  );

                  return (
                     <Box
                        key={drop.id}
                        border="1px solid"
                        borderColor="gray.400"
                        borderRadius={4}
                        p={4}
                        mb={4}
                        role="button"
                        onClick={() => setSelectedDropId(drop.id)}
                        cursor="pointer"
                     >
                        <Text fontSize="sm">{distance}m away from you</Text>
                        <Text fontSize="md" fontWeight="semibold">
                           Dropped by Anonymous
                        </Text>
                        <Text fontSize="sm">
                           Expires in:{' '}
                           <ReactTimeAgo
                              date={new Date(drop.expiresAt)}
                              locale="en-US"
                           />
                        </Text>
                     </Box>
                  );
               })}
            </ModalBody>
         </ModalContent>
      </Modal>
   );
};

export default RangeDropsList;
