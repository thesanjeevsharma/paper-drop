import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Input } from '@chakra-ui/react';

import { login } from 'src/store/slices/user';
import { AppDispatch } from 'src/store';

const LoginForm = () => {
   const dispatch = useDispatch<AppDispatch>();

   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();

      const onSuccess = () => {};
      const onFailure = () => console.log('Failed to login!');

      const data = { email, password };
      dispatch(login({ data, onSuccess, onFailure }));
   };

   return (
      <Box maxW="420px">
         <form onSubmit={handleSubmit}>
            <Input
               placeholder="Email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               mb={2}
               bg="white"
               color="gray.700"
               required
            />
            <Input
               placeholder="Password"
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               mb={4}
               bg="white"
               color="gray.700"
               minLength={8}
               required
            />

            <Button
               mx="auto"
               display="block"
               type="submit"
               bg="white"
               color="green.600"
               minW="180px"
            >
               Login
            </Button>
         </form>
      </Box>
   );
};

export default LoginForm;
