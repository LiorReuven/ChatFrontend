import React, { useEffect, useState } from 'react';
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

const ChatPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [thisUser, setThisUser] = useState(undefined);
  const [recipient, setRecipient] = useState(undefined);


  const [message, setMessage] = useState('');

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


  }, [navigate]);

  useEffect(() => {

    const fetchAllUsers = async () => {
      try {
        const response = await API.post(getUsersUrl, {
          _id: thisUser._id,
        });
        setUsers(response.data.users);
        console.log(response.data.users)
      } catch (error) {
        console.log(error);
      }
    };

    if (thisUser) {
      fetchAllUsers();
    }

  
  }, [thisUser])



  const sendMessageOnSubmit = async (e) => {
    e.preventDefault();

    if (message === '' || !recipient){
      setMessage('');
      return;
    } 

    await API.post(addMessageUrl,{
      from: thisUser?._id,
      to: recipient?._id,
      message: message
    } )

    setMessage('');
  };

  return (
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
         <ChatBlock recipient={recipient} thisUser={thisUser}/>
        <Flex
          as={'form'}
          onSubmit={sendMessageOnSubmit}
          justifyContent={'space-evenly'}
          alignItems={'center'}
          backgroundColor={'gray.500'}
          h={'15%'}
        >
          <Input
            w={'70%'}
            mx={'3rem'}
            h={'100%'}
            variant={'unstyled'}
            placeholder="Type message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <AttachmentIcon />
          <Button type="submit" backgroundColor={'#417fcc'} mx={'1rem'}>
            Send
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
