
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  useColorMode,
  createIcon,
  Link,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Tfoot,
  TableCaption,
  Td
} from '@chakra-ui/react';
import React, { useEffect, useState, CSSProperties } from "react";
import {ethers} from "ethers";
import { networks } from '../utils/networks';
import PulseLoader from "react-spinners/PulseLoader";
import abi from '../factoryAbi.json';
import walletAbi from '../walletAbi.json';
import './wallet.css';
import { Helmet } from 'react-helmet';


const initialState = '';

export default function Usewallet() {

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "black" };
  const color = { light: "black", dark: "gray.100" };
  const [currentAccount, setCurrentAccount] = useState(initialState);
	const [network, setNetwork] = useState(initialState);
  const [wallets, setWallets] = useState(initialState);
  const [switchNet, setSwitchNet] = useState(initialState);
  const [address, setNewAddress] = useState(initialState);
  const [walletCheck, setWalletCheck] = useState(initialState);
  const [data, setData] = useState(initialState);
  let [loading, setLoading] = useState(true);
  let [loadcolor, setColor] = useState("#ffffff");



  const connectWallet = async () => {
    
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }
	
	const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }

    // Check if we're authorized to access the user's wallet
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    // Users can have multiple authorized accounts, we grab the first one if its there!
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setCurrentAccount(account);
    } else {
      console.log('No authorized account found');
      setCurrentAccount('0');
    }

		const chainId = await ethereum.request({ method: 'eth_chainId' });
    setNetwork(networks[chainId]);
    console.log(networks[chainId]);
    ethereum.on('chainChanged', handleChainChanged);
    // Reload the page when they change networks
    function handleChainChanged(_chainId) {
      window.location.reload();
    }
  };

  // This runs our function when the page loads.
  useEffect(() => {
        
    checkIfWalletIsConnected();
    
}, [])

	const switchNetwork = async () => {
		if (window.ethereum) {
			try {
				// Try to switch to the Mumbai testnet
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
				});
			} catch (error) {
				// This error code means that the chain we want has not been added to MetaMask
				// In this case we ask the user to add it to their MetaMask
				if (error.code === 4902) {
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [
								{	
									chainId: '8001',
									chainName: 'Polygon Mumbai Testnet',
									rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
									nativeCurrency: {
											name: "Mumbai Matic",
											symbol: "MATIC",
											decimals: 18
									},
									blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
								},
							],
						});
					} catch (error) {
						console.log(error);
					}
				}
				console.log(error);
			}
		} else {
			// If window.ethereum is not found then MetaMask is not installed
			alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
		} 
	}

  useEffect(() => {
		if (network !== 'Polygon Mumbai Testnet' && network.length > 1) {
      setSwitchNet(1);
		} if (network === 'Polygon Mumbai Testnet'){
      setSwitchNet(2);
    }
	}, [currentAccount, network]);

  const fetchWallets = async () => {
		try {
			const { ethereum } = window;
			if (ethereum) {
				// You know all this
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract('0x4d203417940fD532585300A61895999A65A9F7CC', abi, signer);
				console.log(contract);
        const wallets = await contract.viewWallets();
        console.log(wallets);
        const pushWallets = [];
        for(let i = 0; i < wallets.length; i++){
            const walletContract = new ethers.Contract(wallets[i], walletAbi, signer);
            const owner = await walletContract.owner().then(a => a.toLowerCase());
            const balance = await walletContract.getBalance().then(a => a._hex).then(b => parseInt(b, 16))/1000000000000000000;
            console.log(balance);
            if(owner === currentAccount){
              const object = {
                address: wallets[i],
                time: balance.toString().slice(0, 6)+ " MATIC"
              }
              pushWallets.push(object);
        }
       
        
			} 
      if(pushWallets.length === 0){
        setWalletCheck(1);
      } else if(pushWallets.length > 1){
        setWalletCheck(2);
      }
      setWallets(pushWallets);
        console.log(pushWallets);
    }
      
      else{
        
					alert("Transaction failed! Please try again");
      }
    
		} catch(error){
			console.log(error);
		}
		
	}

  useEffect(() => {
		if (network === 'Polygon Mumbai Testnet') {
		fetchWallets();
		}
	}, [currentAccount, network]);

  const goBack = async () => {
		
    setNewAddress(initialState);
		
	}

  

    const renderConnectedTitle = () => (
      <>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Select which <br />
            <Text as={'span'} color={'gray.400'}>
              wallet
            </Text>
            <br /> you want to use
            </Heading>
      </>
      );

      const renderOptions = () =>{
      
        return (
          <>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Switch to <br />
          <Text as={'span'} color={'gray.400'}>
            Polygon Mumbai
          </Text>
          <br /> network
          </Heading>
    
        </>
        );
      

    }

      const renderNotConnectedTitle = () => (
        <>
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                Connect with Metamask to Use Wallets
              </Heading>
        </>
        );

        

      const connectWalletButton = () => (
        <>
              <Button
              colorScheme={'pink'}
              bg={'pink.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'pink.100',
              }}
              onClick={connectWallet}
              >
              Connect Wallet
            </Button>
        </>
        );

        const changeNetworkButton = () => (
          <>
                <Button
                colorScheme={'pink'}
                bg={'pink.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'pink.100',
                }}
                onClick={switchNetwork}
                >
                Click here to switch
              </Button>
          </>
          );

        const renderTableContainer = () => (
          <>
                { walletCheck === 2 ? <TableContainer>
  <Table variant='simple'>
    <TableCaption>Wallets owned by: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</TableCaption>
    <Thead>
      <Tr>
        <Th>Address</Th>
        <Th >Balance</Th>
      </Tr>
    </Thead>
    <Tbody >
    {wallets && 
                        wallets.map((item) => (
                            <Tr >
                                 <Td><Link href={`#/wallet/${item.address}`} _hover={{textDecoration: 'none', color: 'pink'}}>{item.address} </Link></Td>
                                <Td isNumeric>{item.time}</Td>
                            </Tr>
                        ))
                    
                     }
      
    </Tbody>
    <Tfoot>
      
    </Tfoot>
  </Table>
</TableContainer> : walletCheck === 1 ? <Stack align={'center'}> <Text as={'span'} color={'gray.400'}>
            You have not yet created any wallets
          </Text> <Link
              href={'#/create'}
              _hover={{
                textDecoration: 'none'}}
              >
            <Button
              colorScheme={'pink'}
              bg={'pink.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'pink.100',
              }}>
              Get Started 
            </Button>
            </Link> </Stack> : <Stack align={'center'}>
          <PulseLoader color={loadcolor} loading={loading} size={40} /> 
          </Stack> }
          </>
          );

          

            

  return (
    <>
    <Helmet>
        <title>Choose an Ethereum Wallet to Use</title>
        <meta name="description" content="View your wallets and account balances, and click into your wallets to view and access funds." />
        
      </Helmet>
      
      <Box flex="1" mb={0} bg={bgColor[colorMode]} color={color[colorMode]} >
      <Container maxW={'5xl'} minH={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          
          <div className="right">
          { currentAccount.length > 1 ? <p> Connected with: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p> : 
             currentAccount.length === 1 ? <p> Not connected </p> : null}
           </div>
           {currentAccount.length === 1 && renderNotConnectedTitle()}
           {currentAccount.length > 1 && switchNet === 1 && renderOptions()}
          {currentAccount.length > 1 && switchNet === 2 && renderConnectedTitle()}
         
          
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            {currentAccount.length === 1 && connectWalletButton()}
            {currentAccount.length > 1 && switchNet === 1 && changeNetworkButton()}
          </Stack>
          {currentAccount && renderTableContainer()}
        </Stack>
      </Container>
      </Box>
    </>
  );
}

