import { Button } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { logout } from 'src/store/slices/user';

const LogoutButton = () => {
   const dispatch = useDispatch<AppDispatch>();

   const handleLogout = () => {
      dispatch(logout());
   };

   return (
      <Button
         bg="white"
         color="green.600"
         variant="outline"
         onClick={handleLogout}
      >
         Logout
      </Button>
   );
};

export default LogoutButton;
