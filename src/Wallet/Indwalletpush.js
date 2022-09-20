import React from 'react';
import WithSubnavigation from '../Navbar.tsx';
import Indwallet from './Indwallet.js';
import SmallWithSocial from '../Footer.tsx';



function Indwalletpush() {
  return (
    <>
        <WithSubnavigation />
          <Indwallet />
          <SmallWithSocial />
          </>
  );
}

export default Indwalletpush;
