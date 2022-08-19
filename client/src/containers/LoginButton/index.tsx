import React from 'react';
import { Button } from '@chakra-ui/react';
import GoogleLogin from 'react-google-login';

const LoginButton = () => {
   const responseGoogle = (response: any) => {
      console.log(response);
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
