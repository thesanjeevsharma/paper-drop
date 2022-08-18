import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

import { Layout } from "src/containers";

import "./Login.css";
import { setToken } from "src/store/slices/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/routes";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(setToken({ token: Math.random() }));
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

        <Button bg="white" color="green.700" onClick={handleLogin}>
          Login with Google
        </Button>
      </Flex>
    </Layout>
  );
};

export default Login;
