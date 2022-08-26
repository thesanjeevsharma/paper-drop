import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

import {
   Layout,
   DropMap,
   DropActions,
   LogoutButton,
   Tabs,
} from 'src/containers';
import { selectCurrentLocation } from 'src/store/slices/user/selectors';
import { ROUTES } from 'src/constants/routes';

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
            <Flex align="center">
               <Link to={ROUTES.INSTRUCTIONS}>
                  <InfoIcon color="green.600" cursor="pointer" mr={4} />
               </Link>
               <LogoutButton />
            </Flex>
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
               bg="white"
               p={4}
            >
               <Tabs />
               <Box h={4} />
               <DropActions />
            </Box>
         )}
      </Layout>
   );
};

export default Home;
