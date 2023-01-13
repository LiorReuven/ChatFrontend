import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import ChatPage from './Pages/ChatPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('chatUser')) {
      navigate('/chat');
    }
  }, []);

  if (process.env.NODE_ENV === 'production')
    console.log = function no_console() {};

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
            <Route
              path="/*"
              element={
                !auth.isAuth || !auth.authData ? (
                  <Navigate replace to="/login" />
                ) : (
                  <Navigate replace to="/chat" />
                )
              }
            />
            {!auth.isAuth && !auth.authData && (
              <Route path="/login" element={<LoginPage />} />
            )}
            {!auth.isAuth && !auth.authData && (
              <Route path="/register" element={<RegisterPage />} />
            )}
            {auth.isAuth && auth.authData && (
              <Route path="/chat" element={<ChatPage />} />
            )}
          </Routes>
          <Footer></Footer>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
