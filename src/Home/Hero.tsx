
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
  Link
} from '@chakra-ui/react';

export default function CallToActionWithAnnotation() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.200", dark: "black" };
  const color = { light: "black", dark: "gray.100" };
  return (
    <>
      
      <Box flex="1" mb={0} bg={bgColor[colorMode]} color={color[colorMode]}>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Create an <br />
            <Text as={'span'} color={'gray.400'}>
              Ethereum 
            </Text>
            <br /> wallet
          </Heading>
          <Text color={'gray.500'}>
            Create a wallet owned exclusively by you. You can add other authorized
            addresses as operators, deposit and withdraw Eth, and know that your funds are always safe and secure.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
              <Link
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
            </Link>
            <Link
              href={'#/about'}
              _hover={{
                textDecoration: 'none'}}
              >
            <Button variant={'link'} colorScheme={'pink'} size={'sm'}>
              Learn more
            </Button>
            </Link>
            <Box>
              
            </Box>
          </Stack>
        </Stack>
      </Container>
      </Box>
    </>
  );
}

