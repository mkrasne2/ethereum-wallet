
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Link,
  Input,
  TableContainer,
  Table,
  Thead,
  Tbody,
  HStack,
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
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const initialState = '';

export default function Indwallet() {

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "black" };
  const color = { light: "black", dark: "gray.100" };
  const [currentAccount, setCurrentAccount] = useState(initialState);
	const [network, setNetwork] = useState(initialState);
  const [wallets, setWallets] = useState(initialState);
  const [switchNet, setSwitchNet] = useState(initialState);
  const [address, setNewAddress] = useState(initialState);
  const [changing, setChanging] = useState(initialState);
  const [options, setOptions] = useState(initialState);
  const [fund, setFund] = useState(initialState);
  const [withdraw, setWithdraw] = useState(initialState);
  const [funding, setFunding] = useState(initialState);
  const [withdrawing, setWithdrawing] = useState(initialState);
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  let [loading, setLoading] = useState(true);
  let [loadcolor, setColor] = useState("#ffffff");
  const { id } = useParams();
  



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
				const contract = new ethers.Contract(id, walletAbi, signer);
        const associatedAddresses = await contract.viewAssociatedAddresses().then(a => a.filter(b => b !== '0x0000000000000000000000000000000000000000'));
        const length = await associatedAddresses.length;
        console.log(associatedAddresses);
				console.log(contract);
        const pushWallets = [];
        const balance = await contract.getBalance().then(a => a._hex).then(b => parseInt(b, 16))/1000000000000000000;
            console.log(balance);
              const object = {
                address: id,
                time: balance.toString().slice(0, 6)+ " MATIC",
                associated: associatedAddresses.slice(1, length)
              }
              pushWallets.push(object);
        
       
        
			
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
		setChanging(initialState);
    setNewAddress(initialState);
    setFund(initialState);
		setFunding(initialState);
    setOptions(initialState);
    setWithdraw(initialState);
    setWithdrawing(initialState);
	}

  const fundWallet = async () => {
		try {
			const { ethereum } = window;
			if (ethereum && fund > 0) {
				
        const txx = {
        to: id,
        value: ethers.utils.parseEther(fund), 
      };
      setFunding(1);
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
			
       await signer.sendTransaction(txx).then((txObj) => {
        console.log('txHash', txObj)});
        const contract = new ethers.Contract(id, walletAbi, signer);
        contract.on("received", (string, amount, from) => {
          setFunding(2)
          fetchWallets();
        })

        
			} else{
        
					alert("Transaction failed! Please try again");
          goBack();
      }
    
		} catch(error){
			console.log(error);
      goBack();
		}
		
	}
    
    
  const changeAddress = async () => {
		try {
			const { ethereum } = window;
			if (ethereum && address) {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
        const contract = new ethers.Contract(id, walletAbi, signer);
        const associatedAddresses = await contract.viewAssociatedAddresses();
        let remove = 0;
        console.log(associatedAddresses.length);
        for(let i = 0; i < associatedAddresses.length; i++){
          if(associatedAddresses[i].toLowerCase() === address.toLowerCase()){
            remove = 1;
          } 
        }
        console.log(remove);
        await contract.on("associatedAddressChange", (string, address) => {
          setChanging(4);
        fetchWallets();
        })
        if(remove !== 1){
          setChanging(2);
        let tx = await contract.addAssociatedAddress(address);
        const receipt = await tx.wait();
        
        }
        if(remove === 1){
          setChanging(3);
          let tx = await contract.removeAssociatedAddress(address);
          const receipt = await tx.wait();
          
          }
        

        
			} else{
        
					alert("Transaction failed! Please try again");
          goBack();
      }
    
		} catch(error){
			console.log(error);
      goBack();
		}
		
	}
  
  const withdrawFunds = async () => {
    console.log(withdraw);
		try {
			const { ethereum } = window;
			if (ethereum) {
        console.log('hello');
        setWithdrawing(1);
				const provider = new ethers.providers.Web3Provider(ethereum);
				const signer = provider.getSigner();
        const contract = new ethers.Contract(id, walletAbi, signer);
        contract.on("withdrawn", (message, amount, recipient) => {
          fetchWallets();
          setWithdrawing(2);
        })
        if(!address){
          let tx = await contract.personalWithdraw(ethers.utils.parseEther(withdraw) );
          const receipt = await tx.wait();
         
        } if(address){
          let tx = await contract.externalWithdraw(ethers.utils.parseEther(withdraw), address);
          const receipt = await tx.wait();
          
        }
        
          

        
			} else{
        
					alert("Transaction failed! Please try again");
          goBack();
      }
    
		} catch(error){
			console.log(error);
      goBack();
		}
		
	}
  

    const renderConnectedTitle = () => (
      <>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Choose from the <br />
            <Text as={'span'} color={'gray.400'}>
              options
            </Text>
            <br /> below
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
                Connect with Metamask to Use Your Wallet
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

        const optionsButtons = () => (
          
          <Stack align={'center'} spacing={'100px'}>
            <Box  >
      <Button
                colorScheme={'pink'}
                margin={'15px'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                minW={150}
                _hover={{
                  bg: 'pink.100',
                }}
                onClick={() => setOptions('fund')}
                >
                Fund Wallet
              </Button>
              <Button
                colorScheme={'pink'}
                margin={'15px'}
                bg={'pink.400'}
                minW={150}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'pink.100',
                }}
                onClick={() => setOptions('users')}
                >
                Change Users
              </Button>
              <Button
                colorScheme={'pink'}
                margin={'15px'}
                bg={'blue.400'}
                rounded={'full'}
                minW={150}
                px={6}
                _hover={{
                  bg: 'pink.100',
                }}
                onClick={() => setOptions('withdraw')}
                >
                Withdraw Funds
              </Button>
              
              </Box>
    </Stack>    
          
          );


    const fundComponent = () => {
      if(funding === 1){
        return (
          <Stack align={'center'}>
          <PulseLoader color={loadcolor} loading={loading} size={40} /> 
          </Stack>
        )
      } else if(funding === 2){ return (<Stack align={'center'}>
      <Heading
        fontWeight={200}
        fontSize={{ base: '5l', sm: '1xl', md: '2xl'}}
        lineHeight={'110%'}>
        You have successfully funded your wallet
     
      </Heading>
<Button
          colorScheme={'pink'}
          bg={'green.300'}
          rounded={'full'}
          px={6}
          _hover={{
            bg: 'pink.100',
          }}
          onClick={goBack}
          >
          Go Back
        </Button>
</Stack> )
} 
      
      else { return (<Stack align={'center'}>
            <Heading
              fontWeight={200}
              fontSize={{ base: '5l', sm: '1xl', md: '2xl'}}
              lineHeight={'110%'}>
              Input the amount (in MATIC) to fund and hit "submit"
           
            </Heading>
            <NumberInput value={fund} onInput={e => setFund(e.target.value)} defaultValue={15} precision={2} step={0.2} bg={'pink.100'} maxW={'400px'} > 
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
<Button
                colorScheme={'pink'}
                bg={'pink.300'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'pink.100',
                }}
                onClick={fundWallet}
                >
                Submit
              </Button>
              <Button
          colorScheme={'pink'}
          bg={'green.300'}
          rounded={'full'}
          px={6}
          _hover={{
            bg: 'pink.100',
          }}
          onClick={goBack}
          >
          Go Back
        </Button>
      </Stack> )
      }

              }

              const withdrawComponent = () => {
                if(withdrawing === 1){
                  return (
                    <Stack align={'center'}>
                    <PulseLoader color={loadcolor} loading={loading} size={40} /> 
                    </Stack>
                  )
                } else if(withdrawing === 2){ return (<Stack align={'center'}>
                <Heading
                  fontWeight={200}
                  fontSize={{ base: '5l', sm: '1xl', md: '2xl'}}
                  lineHeight={'110%'}>
                  You have successfully withdrawn funds
               
                </Heading>
          <Button
                    colorScheme={'pink'}
                    bg={'green.300'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                      bg: 'pink.100',
                    }}
                    onClick={goBack}
                    >
                    Go Back
                  </Button>
          </Stack> )
          } 
                
                else { return (<Stack align={'center'}>
                      <Heading
                        fontWeight={200}
                        fontSize={{ base: '5l', sm: '1xl', md: '2xl'}}
                        lineHeight={'110%'}>
                        Input the amount (in MATIC) to withdraw and hit "submit"
                     
                      </Heading>
                      <Flex>
                      <NumberInput value={withdraw} onInput={e => setWithdraw(e.target.value)} defaultValue={1} bg={'pink.100'} minW={'300px'} > 
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Input placeholder='Address (blank defaults to owner)' value={address} onInput={e => setNewAddress(e.target.value)}  bg={'pink.100'} minW={'300px'}/>
          </Flex>
          <Button
                          colorScheme={'pink'}
                          bg={'pink.300'}
                          rounded={'full'}
                          px={6}
                          _hover={{
                            bg: 'pink.100',
                          }}
                          onClick={withdrawFunds}
                          >
                          Submit
                        </Button>
                        <Button
                    colorScheme={'pink'}
                    bg={'green.300'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                      bg: 'pink.100',
                    }}
                    onClick={goBack}
                    >
                    Go Back
                  </Button>
                </Stack> )
                }
          
                        }

              const usersComponent = () => {
                if(changing === 2){
                  return (
                    <Stack align={'center'}>
                       <Heading
                  fontWeight={200}
                  fontSize={{ base: '5l', sm: '1xl', md: '2xl'}}
                  lineHeight={'110%'}>
                  Adding address...
               
                </Heading>
                    <PulseLoader color={loadcolor} loading={loading} size={40} /> 
                    </Stack>
                  )
                }
                if(changing === 3){
                  return (
                    <Stack align={'center'}>
                       <Heading
                  fontWeight={200}
                  fontSize={{ base: '5l', sm: '1xl', md: '2xl'}}
                  lineHeight={'110%'}>
                  Removing address...
               
                </Heading>
                    <PulseLoader color={loadcolor} loading={loading} size={40} /> 
                    </Stack>
                  )
                } else if(changing === 4){ return (<Stack align={'center'}>
                <Heading
                  fontWeight={200}
                  fontSize={{ base: '5l', sm: '1xl', md: '2xl'}}
                  lineHeight={'110%'}>
                  You have successfully altered your authorized users
               
                </Heading>
          <Button
                    colorScheme={'pink'}
                    bg={'green.300'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                      bg: 'pink.100',
                    }}
                    onClick={goBack}
                    >
                    Go Back
                  </Button>
          </Stack> )
          } 
                
                else { return (<Stack align={'center'}>
                      <Heading
                        fontWeight={200}
                        fontSize={{ base: '5l', sm: '1xl', md: '2xl'}}
                        lineHeight={'110%'}>
                        Input the associated address you want added or delete from this wallet
                     
                      </Heading>
                      <Input placeholder='Address' value={address} onInput={e => setNewAddress(e.target.value)}  bg={'pink.100'} maxW={'400px'}/>
          <Button
                          colorScheme={'pink'}
                          bg={'pink.300'}
                          rounded={'full'}
                          px={6}
                          _hover={{
                            bg: 'pink.100',
                          }}
                          onClick={changeAddress}
                          >
                          Submit
                        </Button>
                        <Button
                    colorScheme={'pink'}
                    bg={'green.300'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                      bg: 'pink.100',
                    }}
                    onClick={goBack}
                    >
                    Go Back
                  </Button>
                </Stack> )
                }
          
                        }

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
                <TableContainer>
  <Table variant='simple'>
  <TableCaption>View wallet on <Link href={`https://mumbai.polygonscan.com/address/${id}`} color={'blue.500'} target={'_blank'} _hover={{textDecoration: 'none', color: 'pink'}}>Polygonscan</Link></TableCaption>
    <Thead>
      <Tr>
        <Th>Address</Th>
        <Th >Balance</Th>
        <Th >Authorized Users</Th>
      </Tr>
    </Thead>
    <Tbody>
    {wallets && 
                        
                            <Tr >
                                <Td>{wallets[0].address}</Td>
                                <Td isNumeric>{wallets[0].time}</Td>
                                
                                {wallets[0].associated.map((item) => (
                            <Tr >
                                <Td fontSize={'12px'}>{item}</Td>
                            </Tr>
                        ))}
                            </Tr>
                       
                    }
      
    </Tbody>
    <Tfoot>
      
    </Tfoot>
  </Table>
</TableContainer>
          </>
          );

          

            

  return (
    <>
      <Helmet>
        <title>Account: {id}</title>
        <meta name="description" content="Withdraw or add funds to your account. You can also add and remove authorized users." />
        
      </Helmet>
      <Box flex="1" mb={0} bg={bgColor[colorMode]} color={color[colorMode]} >
      <Container maxW={'5xl'} minH={'3xl'}>
      
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Button
                maxW={'200px'}
                margin={'auto'}
                colorScheme={'pink'}
                bg={'teal.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'pink.100',
                }}
               onClick={() => navigate("/wallet")}
                >
                Go Back
              </Button>
            
          
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
          {currentAccount.length > 1 && wallets && renderTableContainer()}
          {currentAccount.length > 1 && wallets && !options && optionsButtons()}
          {currentAccount.length > 1 && wallets && options === 'fund' && fundComponent()}
          {currentAccount.length > 1 && wallets && options === 'users' && usersComponent()}
          {currentAccount.length > 1 && wallets && options === 'withdraw' && withdrawComponent()}
        </Stack>
      </Container>
      </Box>
    </>
  );
}

