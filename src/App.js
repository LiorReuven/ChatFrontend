import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <>
      <Flex backgroundColor={useColorModeValue('gray.50', 'gray.800')}>
        <Flex
          mx={'auto'}
          w={['80%', '80%', '80%', '80%', '60%', '60%']}
          minH={'100vh'}
          direction={'column'}
          justifyContent={'space-between'}
        >
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/homepage" element={<HomePage />} />
          </Routes>
          <Footer></Footer>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
