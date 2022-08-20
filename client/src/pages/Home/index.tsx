import React from 'react';
import { Box } from '@chakra-ui/react';
import { Layout, DropMap, DropActions } from 'src/containers';

const Home = () => {
   return (
      <Layout>
         <DropMap />
         <Box
            zIndex={100}
            position="fixed"
            bottom={0}
            width="100vw"
            maxWidth="container.sm"
         >
            <DropActions />
         </Box>
      </Layout>
   );
};

export default Home;
