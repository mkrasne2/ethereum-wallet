# About the Ethereum Wallet

A few details about this Web3 project

## Clonefactory

Every time someone initializes a new wallet, the base contract creates a clone using the Clonefactory method - this saves in gas costs by delegating all calls to the master contract address, while still keeping the wallet secure.

## React & Chakra UI

The frontend is built using React and Chakra UI to allow for faster and easier composability and reuse of existing components and styles.

## Associated Users

The smart contract that powers this application gives autonomy to the creator to add associated addresses that are able to withdraw funds (they are added to the "onlyOwner" modifier.)

## Requirements to Use

You will need a MetaMask wallet, an internet connection, testnet MATIC, and you must add Polygon Mumbai to as a network to your MetaMask wallet.

## Try it out

Go ahead and try it for yourself: https://mkrasne2.github.io/ethereum-wallet/#/