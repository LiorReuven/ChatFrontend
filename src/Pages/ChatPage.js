import React, { useEffect, useState, useRef } from 'react';
import {
  Flex,
  Input,
  Button,
  Avatar,
  AvatarBadge,
  MenuButton,
  IconButton,
  Menu,
  Text,
} from '@chakra-ui/react';
import { AttachmentIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import User from '../components/User';
import API, { addMessageUrl } from '../helpers/API';
import { getUsersUrl } from '../helpers/API';
import ChatBlock from '../components/ChatBlock';
import io from 'socket.io-client'



const ChatPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [thisUser, setThisUser] = useState(undefined);
  const [recipient, setRecipient] = useState(undefined);
  const socket = useRef()
  const [loading, setLoading] = useState(true)


  


  useEffect(() => {


    const setThisUserHandler = async () => {
      const storage = await JSON.parse(localStorage.getItem('chatUser'))
      setThisUser(storage.user)
    };


    if (!localStorage.getItem('chatUser')) {
      navigate('/login');
    } else {
      setThisUserHandler();
    }


  }, []);

  useEffect(() => {

   

    const fetchAllUsers = async (data) => {
      try {
        const response = await API.post(getUsersUrl, {
          data:data,
          _id:thisUser._id
        });
           console.log(response.data.users)
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    if (thisUser) {
       socket.current = io(process.env.REACT_APP_BASE_URL)
       socket.current.emit('add_user', thisUser._id)
       socket.current.on('get_online_users', (data) => {
        fetchAllUsers(data)
      }) 
      setLoading(false)
    }

  
  }, [thisUser])

 





  

  return (
    <>
    { !loading ?
    <Flex
      h={'70vh'}
      overflow={'hidden'}
      borderBottomRadius={'20px'}
      borderTopRadius={'20px'}
    >
      <Flex backgroundColor={'teal'} minW={'30%'} direction={'column'}>
        <Flex
          alignItems={'center'}
          backgroundColor={'purple'}
          h={'15%'}
          justifyContent={'space-between'}
        ></Flex>
        {users.map((user) => {
          return (
            <User
              key={user._id}
              onClick={() => {
                setRecipient(user);
              }}
              user={user}
            />
          );
        })}
      </Flex>
      <Flex minW={'70%'} direction={'column'}>
        <Flex
          alignItems={'center'}
          backgroundColor={'#417fcc'}
          h={'15%'}
          justifyContent={'space-between'}
        >
          <Flex>
            <Avatar ml={'2rem'} size={'md'}>
              <AvatarBadge boxSize={'1.25em'} bg={'green.500'} />
            </Avatar>
            <Text>{recipient?.username}</Text>
          </Flex>
          <Flex mr={'2rem'}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="options"
                icon={<HamburgerIcon />}
                variant={'outline'}
              />
            </Menu>
          </Flex>
        </Flex>
         <ChatBlock socket={socket} recipient={recipient} thisUser={thisUser}/>
      </Flex>
    </Flex>
     : <Text>loading</Text> 
    }
    </>
  );
};

export default ChatPage;
