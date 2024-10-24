import { Box, VStack, Link, Text, Icon } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaGift, FaStore, FaWallet, FaExchangeAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <Box
      as="nav"
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w="250px"
      bg="gray.900"
      p="5"
      boxShadow="lg"
      zIndex="1"
    >
      <VStack spacing={4} align="stretch">
        {/* Título */}
        <Text fontSize="2xl" fontWeight="bold" mb="8" color="gray.100">
          My App
        </Text>

        {/* Inicio */}
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

        {/* Recompensas */}
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

        {/* Sucursales */}
        <NavLink to="/sucursales" style={{ textDecoration: 'none' }}>
          <Link
            display="flex"
            alignItems="center"
            py="3"
            px="4"
            borderRadius="md"
            color="gray.400"
            _hover={{ bg: 'gray.100', color: 'gray.800' }}
          >
            <Icon as={FaStore} mr="4" />
            <Text>Sucursales</Text>
          </Link>
        </NavLink>

        {/* Billetera */}
        <NavLink to="/billetera" style={{ textDecoration: 'none' }}>
          <Link
            display="flex"
            alignItems="center"
            py="3"
            px="4"
            borderRadius="md"
            color="gray.400"
            _hover={{ bg: 'gray.100', color: 'gray.800' }}
          >
            <Icon as={FaWallet} mr="4" />
            <Text>Billetera</Text>
          </Link>
        </NavLink>

        {/* Transacciones */}
        <NavLink to="/transacciones" style={{ textDecoration: 'none' }}>
          <Link
            display="flex"
            alignItems="center"
            py="3"
            px="4"
            borderRadius="md"
            color="gray.400"
            _hover={{ bg: 'gray.100', color: 'gray.800' }}
          >
            <Icon as={FaExchangeAlt} mr="4" />
            <Text>Transacciones</Text>
          </Link>
        </NavLink>

        {/* Mi cuenta */}
        <NavLink to="/mi-cuenta" style={{ textDecoration: 'none' }}>
          <Link
            display="flex"
            alignItems="center"
            py="3"
            px="4"
            borderRadius="md"
            color="gray.400"
            _hover={{ bg: 'gray.100', color: 'gray.800' }}
          >
            <Icon as={FaUser} mr="4" />
            <Text>Mi cuenta</Text>
          </Link>
        </NavLink>

        {/* Cerrar sesión */}
        <NavLink to="/logout" style={{ textDecoration: 'none' }}>
          <Link
            display="flex"
            alignItems="center"
            py="3"
            px="4"
            borderRadius="md"
            color="gray.400"
            _hover={{ bg: 'gray.100', color: 'gray.800' }}
          >
            <Icon as={FaSignOutAlt} mr="4" />
            <Text>Cerrar sesión</Text>
          </Link>
        </NavLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
