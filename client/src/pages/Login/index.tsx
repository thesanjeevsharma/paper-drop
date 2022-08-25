import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import { Layout, LoginForm, SignUpForm } from 'src/containers';

import './Login.css';

const Login = () => {
   const [showLogin, setShowLogin] = React.useState<boolean>(true);

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

            {showLogin ? <LoginForm /> : <SignUpForm />}
            <Text
               fontWeight="medium"
               role="button"
               textDecoration="underline"
               color="white"
               mt={4}
               onClick={() => setShowLogin(!showLogin)}
            >
               {showLogin
                  ? "Don't have an account? Create one!"
                  : 'Already have an account? Login!'}
            </Text>
         </Flex>
      </Layout>
   );
};

export default Login;
