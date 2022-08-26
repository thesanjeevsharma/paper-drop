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
import { toast } from 'react-toastify';

import { selectRangeDrops } from 'src/store/slices/drops/selectors';
import { getDistanceFromLatLon } from 'src/utils';
import {
   selectAuthToken,
   selectCurrentLocation,
} from 'src/store/slices/user/selectors';
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
   const token = useSelector(selectAuthToken);

   const [selectedDropId, setSelectedDropId] = React.useState<string | null>(
      null
   );
   const [selectedDrop, setSelectedDrop] = React.useState<DropDetails>(
      {} as DropDetails
   );
   const [isInFlight, setIsInFlight] = React.useState<boolean>(false);

   const totalDrops = rangeDrops.length;

   React.useEffect(() => {
      if (selectedDropId && token) {
         try {
            setIsInFlight(true);
            (async () => {
               const response = await fetchDrop(selectedDropId, token);
               if (response.success && response.data) {
                  console.log(response.data.drop);
                  setSelectedDrop(response.data.drop);
               }
            })();
         } catch (err) {
            setSelectedDropId(null);
            toast.error('Something went wrong!');
         } finally {
            setIsInFlight(false);
         }
      } else {
         setSelectedDrop({} as DropDetails);
      }
   }, [selectedDropId, token]);

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
                  {totalDrops} Drop{totalDrops > 1 && 's'} near you
               </ModalHeader>
               {isInFlight ? (
                  <Box my={4} mx="auto">
                     <Spinner color="green.600" />
                  </Box>
               ) : (
                  <ModalBody>
                     <Text>Author: {selectedDrop.author}</Text>
                     {!!selectedDrop.createdAt && (
                        <Text>
                           Dropped:{' '}
                           <ReactTimeAgo
                              date={new Date(selectedDrop.createdAt)}
                              locale="en-US"
                           />
                        </Text>
                     )}
                     <Text fontWeight="semibold">
                        Read by: {selectedDrop.readBy}
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
                        key={drop._id}
                        border="1px solid"
                        borderColor="gray.400"
                        borderRadius={4}
                        p={4}
                        mb={4}
                        role="button"
                        onClick={() => {
                           setSelectedDropId(drop._id);
                        }}
                        cursor="pointer"
                     >
                        <Text fontSize="sm">{distance}m away from you</Text>
                        <Text fontSize="md" fontWeight="semibold">
                           Dropped by {drop.author}
                        </Text>
                        <Text fontSize="sm">
                           Dropped{' '}
                           <ReactTimeAgo
                              date={new Date(drop.createdAt)}
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
