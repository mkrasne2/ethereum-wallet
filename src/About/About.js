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
import Aboutcomponent from './Abouthero.tsx';
import SmallWithSocial from '../Footer.tsx';
import { Helmet } from 'react-helmet';


function About() {
  return (
    <>
    <Helmet>
        <title>Learn about the Ethereum Wallet project </title>
        <meta name="description" content="Learn about the methods and technologies that power this portfolio project. " />
        
      </Helmet>
        <WithSubnavigation />
          <Aboutcomponent />
          
          <SmallWithSocial />
          </>
  );
}

export default About;
