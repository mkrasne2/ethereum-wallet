import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home/Home.js';
import Create from './Create/Create.js';
import Wallet from './Wallet/Wallet.js';
import Indwalletpush from './Wallet/Indwalletpush.js';
import About from './About/About.js';

function Homepage() {
  return (
    <div>
    <Home />
    </div>
  )
  }

  function Createpage() {
    return (
      <div>
      <Create />
      </div>
    )
    }

    function Walletpage() {
      return (
        <div>
        <Wallet />
        </div>
      )
      }

      function Indwalletpage() {
        return (
          <div>
          <Indwalletpush />
          </div>
        )
        }

        function Aboutpage() {
          return (
            <div>
            <About />
            </div>
          )
          }

export default function App() {
  return (
    <div >
    <Routes>
      <Route  path='/' element={<Homepage />} />
    </Routes>
    <Routes>
      <Route  path='/create' element={<Createpage />} />
    </Routes>
    <Routes>
      <Route  path='/wallet' element={<Walletpage />} />
    </Routes>
    <Routes>
      <Route  path='/wallet/:id' element={<Indwalletpage />} />
    </Routes>
    <Routes>
      <Route  path='/about' element={<Aboutpage />} />
    </Routes>
  </div>
  );
}
