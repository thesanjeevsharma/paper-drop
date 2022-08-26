import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Input } from '@chakra-ui/react';
import { toast } from 'react-toastify';

import { login } from 'src/store/slices/user';
import { AppDispatch } from 'src/store';
import { selectIsUserLoading } from 'src/store/slices/user/selectors';

const LoginForm = () => {
   const dispatch = useDispatch<AppDispatch>();
   const isLoading = useSelector(selectIsUserLoading);

   const [email, setEmail] = React.useState<string>('');
   const [password, setPassword] = React.useState<string>('');

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault();

      const onSuccess = () => {};
      const onFailure = (message: string) => toast.error(message);

      const data = { email, password };
      dispatch(login({ data, onSuccess, onFailure }));
   };

   return (
      <Box maxW="420px" px={4}>
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
               required
            />

            <Button
               mx="auto"
               display="block"
               type="submit"
               bg="white"
               color="green.600"
               minW="180px"
               isDisabled={isLoading}
            >
               Login
            </Button>
         </form>
      </Box>
   );
};

export default LoginForm;
