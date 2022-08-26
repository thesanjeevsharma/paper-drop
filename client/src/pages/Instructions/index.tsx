import React from 'react';
import { ChevronLeftIcon, EmailIcon } from '@chakra-ui/icons';
import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'src/constants/routes';
import { Layout } from 'src/containers';

const Instructions = () => {
   const navigate = useNavigate();

   return (
      <Layout>
         <Box minH="100vh" color="white" py={8} px={4} className="bg-wrapper">
            <Flex align="center" mb={8}>
               <ChevronLeftIcon
                  w={6}
                  h={6}
                  onClick={() => navigate(ROUTES.HOME)}
                  cursor="pointer"
               />
               <Text ml={4} fontWeight="semibold" fontSize="lg">
                  Instructions
               </Text>
            </Flex>

            <UnorderedList>
               <ListItem mb={1}>
                  <Text fontWeight="bold">
                     Note: Keep your location services turned on to use the app.
                  </Text>
               </ListItem>
               <ListItem mb={1}>
                  <Text>
                     This app allows you to drop messages in the real world.
                     Messages will be visible on the map.
                  </Text>
               </ListItem>
               <ListItem mb={1}>
                  <Text>
                     As a user you have a choice to drop a message{' '}
                     <b>anonymously</b> or with your name.
                  </Text>
               </ListItem>
               <ListItem mb={1}>
                  <Text>
                     Nearby Drops: On this sections of the app, drops made by
                     other users will be visible on the map within <b>2km</b> of
                     range. All nearby drops will be indicated by{' '}
                     <EmailIcon color="gray.600" /> icon.
                  </Text>
               </ListItem>
               <ListItem mb={1}>
                  <Text>
                     My Drops: On this section of the app, you can see all the
                     drops made by you. You can also delete the drops by tapping
                     on them. These drops will be indicated by{' '}
                     <EmailIcon color="green.400" /> icon.
                  </Text>
               </ListItem>
               <ListItem mb={1}>
                  <Text>
                     You can read messages dropped by other users within{' '}
                     <b>50m</b> range of your current location. These drops will
                     be indicated by <EmailIcon color="purple.600" /> icon.
                  </Text>
               </ListItem>
               <ListItem mb={1}>
                  <Text>
                     A drop is removed from the map when it has been read by{' '}
                     <b>10 people</b>(i.e. expired) or it has been deleted by
                     the author.
                  </Text>
               </ListItem>
               <ListItem mb={1}>
                  <Text>
                     At any given point a user can only have{' '}
                     <b>10 active drops</b>. To create new drops, either wait
                     for older drops to expire or delete some.
                  </Text>
               </ListItem>
               <ListItem mb={1}>
                  <Text>Lastly, Happy Hunting!</Text>
               </ListItem>
            </UnorderedList>
         </Box>
      </Layout>
   );
};

export default Instructions;
