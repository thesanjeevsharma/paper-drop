import { Box } from '@chakra-ui/react';
import React from 'react';
import { Layout, DropMap, DropActions } from '../../containers';

const Home = () => {
   return (
      <Layout>
         <DropMap />
         <Box zIndex={100} position="fixed" bottom={0} width="container.sm">
            <DropActions />
         </Box>
      </Layout>
   );
};

export default Home;
