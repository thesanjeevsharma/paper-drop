import React from "react";
import { Container } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Container maxW="container.sm" minH="100vh" p={0}>
      {children}
    </Container>
  );
};

export default Layout;
