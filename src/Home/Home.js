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
import CallToActionWithAnnotation from './Hero.tsx';
import SmallWithSocial from '../Footer.tsx';
import SimpleThreeColumns from './Features.tsx';
import { Helmet } from 'react-helmet';


function Home() {
  return (
    <>
    <Helmet>
        <title>Create an Ethereum Wallet</title>
        <meta name="description" content="Keep your funds safe and secure, with flexible options to access, fund your account, and withdraw." />
        
      </Helmet>
        <WithSubnavigation />
          <CallToActionWithAnnotation />
          <SimpleThreeColumns/>
          <SmallWithSocial />
          </>
  );
}

export default Home;
