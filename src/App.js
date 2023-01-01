import React, {useState, useEffect, useRef} from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Flex, useColorModeValue } from '@chakra-ui/react';

import ChatPage from './Pages/ChatPage';
import LoginPage from './Pages/LoginPage';
import {io} from 'socket.io-client';
import RegisterPage from './Pages/RegisterPage';


function App() {
const [isLogged, setIsLogged] = useState(false)
const socket = useRef()



useEffect(() => {
  
  if(isLogged) {
    socket.current = io('http://localhost:3001')

  }


}, [isLogged])



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
            <Route path="/*" element={<LoginPage setIsLogged={setIsLogged}  socket={socket} />} />
            <Route path="/register" element={<RegisterPage socket={socket} />} />
            <Route path="/chat" element={<ChatPage socket={socket} />} />
          </Routes>
          <Footer></Footer>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
