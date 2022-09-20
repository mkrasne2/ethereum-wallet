import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { MdAttachMoney, MdLock, MdPeople } from 'react-icons/md';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} >
        <Feature
          icon={<Icon as={MdPeople} w={10} h={10} />}
          title={'Allow Multiple Owners'}
          text={
            'You can add additional authorized users to your wallet that can send and withdraw funds.'
          }
        />
        <Feature
          icon={<Icon as={MdLock} w={10} h={10} />}
          title={'Safe and Secure'}
          text={
            'Only you have access to your funds using the address you initially set up the wallet with. Only you can add or remove authorized users'
          }
        />
        <Feature
          icon={<Icon as={MdAttachMoney} w={10} h={10} />}
          title={'Free to Use'}
          text={
            'You can create multiple wallets free of charge - all you pay for are the gas fees to initialize the wallet.'
          }
        />
      </SimpleGrid>
    </Box>
  );
}