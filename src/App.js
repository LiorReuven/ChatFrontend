import React, {useState, useEffect, useRef} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import ChatPage from './Pages/ChatPage';
import LoginPage from './Pages/LoginPage';
import {io} from 'socket.io-client';
import RegisterPage from './Pages/RegisterPage';


function App() {

  const navigate = useNavigate()


useEffect(() => {
  
  if(localStorage.getItem('chatUser')) {
    navigate('/chat')
  }

}, [])



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
            <Route path="/*" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/chat" element={<ChatPage/>} />
          </Routes>
          <Footer></Footer>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
