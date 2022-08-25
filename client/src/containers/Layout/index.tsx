import React from 'react';
import { Box, Container, Progress } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { selectShowLoading } from 'src/store/slices/drops/selectors';
import { selectIsUserLoading } from 'src/store/slices/user/selectors';

type Props = {
   children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
   const showLoading = useSelector(selectShowLoading);
   const isUserLoading = useSelector(selectIsUserLoading);

   const isLoading = isUserLoading || showLoading;

   return (
      <Container maxW="container.sm" minH="100vh" p={0}>
         {isLoading && (
            <Box
               bg="green.600"
               zIndex={2}
               position="absolute"
               w="100vw"
               maxW="container.sm"
            >
               <Progress size="sm" colorScheme="green" isIndeterminate />
            </Box>
         )}

         {children}
      </Container>
   );
};

export default Layout;
