import React from 'react';
import { Flex, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { AiOutlineGithub } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
  return (
    <>
    <Flex
    mt={'2rem'}
      mb={'2rem'}
      justifySelf={'flex-end'}
      w={'100%'}
      mx={'auto'}
      alignItems='center'
      direction={'column'}
    >
      <Flex>
      <Stack direction={'row'} spacing={'1.5rem'}>
        <Link as={'a'} href="https://github.com/LiorReuven" target="_blank" isExternal>
          <Icon
            transition={'all 0.2s'}
            _hover={{ transform: 'scale(1.3)' }}
            boxSize={'7'}
            as={AiOutlineGithub}
          ></Icon>
        </Link>
        <Link as={'a'} target="_blank" href="mailto:lr6080100@gmail.com" isExternal>
          <Icon
            transition={'all 0.2s'}
            _hover={{ transform: 'scale(1.3)' }}
            boxSize={'7'}
            color={'#cd4637'}
            as={SiGmail}
          ></Icon>
        </Link>
        <Link as={'a'} target="_blank" href={'https://www.linkedin.com/in/lior-reuven-77b151249/'}   isExternal>
          <Icon
            transition={'all 0.2s'}
            _hover={{ transform: 'scale(1.3)' }}
            stroke={'blue'}
            fill={'#2776b4'}
            boxSize={'7'}
            as={FaLinkedinIn}
          ></Icon>
        </Link>
      </Stack>
      </Flex>
      <Text mt={'2px'} fontSize={'xs'}>© 2022 Lior Reuven </Text>
    </Flex>
    </>
  );
};

export default Footer;
