import React from 'react';
import WithSubnavigation from '../Navbar.tsx';
import Usewallet from './Usewallet.js';
import SmallWithSocial from '../Footer.tsx';



function Wallet() {
  return (
    <>
        <WithSubnavigation />
          <Usewallet />
          <SmallWithSocial />
          </>
  );
}

export default Wallet;
