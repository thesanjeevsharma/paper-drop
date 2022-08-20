import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@chakra-ui/react';
import GoogleLogin from '@leecheuk/react-google-login';
import { login } from 'src/store/slices/user';
import { AppDispatch } from 'src/store';

type Props = {
   onSuccess: () => void;
};

const LoginButton = ({ onSuccess }: Props) => {
   const dispatch = useDispatch<AppDispatch>();

   const responseGoogle = (response: any) => {
      if (response) {
         dispatch(login({ googleResponse: response, onSuccess }));
      }
   };

   return (
      <GoogleLogin
         clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
         render={({ onClick }) => (
            <Button bg="white" color="green.700" onClick={onClick}>
               Login with Google
            </Button>
         )}
         buttonText="Login"
         onSuccess={responseGoogle}
         onFailure={responseGoogle}
         cookiePolicy={'single_host_origin'}
      />
   );
};

export default LoginButton;
