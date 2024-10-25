import { Box, VStack, Link, Text, Icon } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
  FaHome, FaGift
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <Box
      as="nav"
      h="100vh"
      w={{ base: 'full', md: '250px' }}
      bg="gray.800"
      p="5"
      boxShadow="lg"
      zIndex="1"
    >
      <VStack spacing={2} align="stretch" py={20}>
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="gray.100">
          Modulos
        </Text>

        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Link
            display="flex"
            alignItems="center"
            py="3"
            px="4"
            borderRadius="md"
            bgGradient="linear(to-r, sky.600, cyan.400)"
            color="white"
            _hover={{ bgGradient: 'linear(to-r, cyan.900, sky.900)' }}
          >
            <Icon as={FaHome} mr="4" />
            <Text>Inicio</Text>
          </Link>
        </NavLink>

        <NavLink to="/recompensas" style={{ textDecoration: 'none' }}>
          <Link
            display="flex"
            alignItems="center"
            py="3"
            px="4"
            borderRadius="md"
            color="gray.400"
            _hover={{ bg: 'gray.100', color: 'gray.800' }}
          >
            <Icon as={FaGift} mr="4" />
            <Text>Recompensas</Text>
          </Link>
        </NavLink>

        {/* Añade más enlaces aquí */}

      </VStack>
    </Box>
  );
};

export default Sidebar;
