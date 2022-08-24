import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Layout, DropMap, DropActions, LogoutButton } from 'src/containers';
import { useSelector } from 'react-redux';
import { selectCurrentLocation } from 'src/store/slices/user/selectors';

const Home = () => {
   const currentLocation = useSelector(selectCurrentLocation);

   return (
      <Layout>
         <Flex
            align="center"
            justify="space-between"
            p={2}
            boxShadow="0px 5px 5px 1px #cacaca"
            position="fixed"
            top={0}
            zIndex={1}
            width="100vw"
            maxWidth="container.sm"
            bg="white"
         >
            <Text fontSize="md" color="green.600" fontWeight="semibold">
               PaperDrop
            </Text>
            <LogoutButton />
         </Flex>
         <DropMap />
         {!!currentLocation && (
            <Box
               zIndex={100}
               position="fixed"
               bottom={0}
               width="100vw"
               maxWidth="container.sm"
               boxShadow="0px -5px 5px 1px #cacaca"
            >
               <DropActions />
            </Box>
         )}
      </Layout>
   );
};

export default Home;
