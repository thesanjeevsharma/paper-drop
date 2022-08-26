import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Layout, LoginForm, SignUpForm } from 'src/containers';
import { ROUTES } from 'src/constants/routes';

import './Login.css';

const Login = () => {
   const [showLogin, setShowLogin] = React.useState<boolean>(true);

   return (
      <Layout>
         <Flex
            className="bg-wrapper"
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
               mb={12}
               onClick={() => setShowLogin(!showLogin)}
            >
               {showLogin
                  ? "Don't have an account? Create one!"
                  : 'Already have an account? Login!'}
            </Text>

            <Link to={ROUTES.INSTRUCTIONS}>
               First time? Click here to read instructions.
            </Link>
            <Text fontStyle="italic">
               Make sure your Location services are turned on!
            </Text>
         </Flex>
      </Layout>
   );
};

export default Login;
