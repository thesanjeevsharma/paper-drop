import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';

import { Layout, LoginButton } from 'src/containers';
import { ROUTES } from 'src/constants/routes';

import './Login.css';

const Login = () => {
   const navigate = useNavigate();

   const handleLoginSuccess = () => {
      navigate(ROUTES.HOME.path, { replace: true });
   };

   return (
      <Layout>
         <Flex
            className="login-wrapper"
            direction="column"
            align="center"
            justify="center"
            h="100vh"
            w="full"
            color="white"
         >
            <Box mb={16} textAlign="center">
               <Text fontSize="4xl" fontWeight="bold">
                  PaperDrop
               </Text>
               <Text fontSize="l">Drop secret messages across the world!</Text>
            </Box>

            <LoginButton onSuccess={handleLoginSuccess} />
         </Flex>
      </Layout>
   );
};

export default Login;
