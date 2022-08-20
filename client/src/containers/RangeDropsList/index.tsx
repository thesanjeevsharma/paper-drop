import React from 'react';
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/react';

type Props = {
   isOpen: boolean;
   onClose: () => void;
};

const RangeDropsList = ({ isOpen, onClose }: Props) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
         </ModalContent>
      </Modal>
   );
};

export default RangeDropsList;
