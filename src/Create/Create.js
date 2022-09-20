import React from 'react';
import {
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import WithSubnavigation from '../Navbar.tsx';
import Createwallet from './Createhero.js';
import SmallWithSocial from '../Footer.tsx';
import { Helmet } from 'react-helmet';


function Create() {
  return (
    <>
    <Helmet>
        <title>Connect to Polygon Mumbai and Create an Ethereum Wallet. </title>
        <meta name="description" content="You can create an Ethereum wallet here for free - simply connect to Polygon Mumbai and follow the instructions. " />
        
      </Helmet>
        <WithSubnavigation />
          <Createwallet />
          <SmallWithSocial />
          </>
  );
}

export default Create;
