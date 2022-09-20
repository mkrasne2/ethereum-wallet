//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import './Clonefactory.sol';
import './Wallet.sol';

contract Walletfactory is CloneFactory{
  Wallet[] public walletAddresses;
  address public implementationAddress;

  event Walletcreated(address _creator, address _newWalletAddress);


  constructor(address _implementationAddress) {
    implementationAddress = _implementationAddress;
  }


  function createWallet() external {
        Wallet newWallet = Wallet(payable(createClone(implementationAddress)));
        newWallet.initialize(msg.sender);

        walletAddresses.push(newWallet);
        emit Walletcreated(msg.sender, address(newWallet));
  }

  function viewWallets() external view returns (Wallet[] memory _addresses){
    _addresses = walletAddresses;
  }
}
