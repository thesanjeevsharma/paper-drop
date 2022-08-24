import React from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'src/store';
import { setCurrentView } from 'src/store/slices/user';
import { selectCurrentView } from 'src/store/slices/user/selectors';

const Tabs = () => {
   const dispatch = useDispatch<AppDispatch>();
   const currentView = useSelector(selectCurrentView);

   return (
      <Flex align="center" justify="center">
         <Button
            flex={1}
            color={currentView === 'nearby' ? 'white' : 'green.600'}
            bg={currentView === 'nearby' ? 'green.600' : 'white'}
            border="1px solid"
            borderColor="green.600"
            onClick={() => dispatch(setCurrentView({ view: 'nearby' }))}
         >
            Nearby Drops
         </Button>
         <Button
            ml={2}
            flex={1}
            color={currentView === 'my' ? 'white' : 'green.600'}
            bg={currentView === 'my' ? 'green.600' : 'white'}
            border="1px solid"
            borderColor="green.600"
            onClick={() => dispatch(setCurrentView({ view: 'my' }))}
         >
            My Drops
         </Button>
      </Flex>
   );
};

export default Tabs;
