import React from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

import { Layout } from 'src/containers'

import './Login.css'

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/playground', { replace: true })
    }

    return (
        <Layout>
            <Flex className="login-wrapper" direction="column" align="center" justify="center" h="100vh" w="full" color="white">
                <Box mb={16} textAlign="center">
                    <Text fontSize="4xl" fontWeight="bold">PaperDrop</Text>
                    <Text fontSize="l">Drop secret messages across the world!</Text>
                </Box>

                <Button bg="white" color="green.700" onClick={handleLogin}>Login with Google</Button>
            </Flex>
        </Layout>
    )
}

export default Login
