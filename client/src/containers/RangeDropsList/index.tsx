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
   Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectRangeDrops } from 'src/store/slices/drops/selectors';
import { getDistanceFromLatLon } from 'src/utils';
import { selectCurrentLocation } from 'src/store/slices/user/selectors';

type Props = {
   isOpen: boolean;
   onClose: () => void;
};

const RangeDropsList = ({ isOpen, onClose }: Props) => {
   const rangeDrops = useSelector(selectRangeDrops);
   const currentLocation = useSelector(selectCurrentLocation);

   const totalDrops = rangeDrops.length;

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
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
