
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
  Spacer,
  Flex,
  Link
} from '@chakra-ui/react';

export default function Aboutcomponent() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "black" };
  const color = { light: "black", dark: "gray.100" };
  return (
    <>
      
      <Box flex="1" mb={1} bg={bgColor[colorMode]} color={color[colorMode]}>
      <Container  paddingBottom={50} paddingLeft={10} paddingRight={10} maxW={'4xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            About this <br />
            <Text as={'span'} color={'gray.400'}>
              Ethereum Wallet 
            </Text>
            <br /> project
          </Heading>
          <Text color={'gray.500'}>
            A few words about this project
          </Text>
          
          
         
        </Stack>
        <Stack spacing={3}  as={Box}
          textAlign={'left'}>
  
  <Text fontSize='lg'>This example project utilizes the following methods and technologies to make the application usable by anyone: </Text>
  <ul>
  <li><Text fontSize='md' textAlign={'left'}><strong>Clonefactory: </strong> Every time someone initializes a new wallet, the base
  contract creates a clone using the Clonefactory method - this saves in gas costs by delegating all calls to the master contract
  address, while still keeping the wallet secure.</Text></li>
  <li><Text fontSize='md' textAlign={'left'}><strong>React & Chakra UI: </strong> The frontend is built using React and Chakra UI
  to allow for faster and easier composability and reuse of existing components and styles.</Text></li>
  <li><Text fontSize='md' textAlign={'left'}><strong>Associated Users: </strong> The smart contract that powers this application
  gives autonomy to the creator to add associated addresses that are able to withdraw funds (they are added to the "onlyOwner" modifier.)</Text></li>
  <li><Text fontSize='md' textAlign={'left'}><strong>Network: </strong> The smart contracts that power this project live on the Polygon
  Mumbai testnet. You will be prompted to connect to Polygon Mumbai in order to proceed.</Text></li>
  <li><Text fontSize='md' textAlign={'left'}><strong>Smart Contracts: </strong> 
  <ul >
    <li><Link href={`https://mumbai.polygonscan.com/address/0xb22fa41354ae56b9c27deb0331892e47206379df#code`} target={'_blank'} _hover={{textDecoration: 'none', color: 'pink'}}><Text fontSize={15}>Base Wallet Contract</Text></Link> </li>
    <li><Link href={`https://mumbai.polygonscan.com/address/0x4d203417940fd532585300a61895999a65a9f7cc#code`} target={'_blank'} _hover={{textDecoration: 'none', color: 'pink'}}><Text fontSize={15}>Walletfactory Contract</Text></Link></li>
  </ul>
  </Text></li>
  </ul>
  
</Stack>
      </Container>
      </Box>
    </>
  );
}

