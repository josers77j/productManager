import { Box, VStack, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box
      as="nav"
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w="250px"
      bg="gray.800"
      color="white"
      p="5"
      boxShadow="lg"
    >
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" mb="8">
          My App
        </Text>

        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Link _hover={{ textDecoration: 'none', bg: 'gray.700' }} py="2" px="3" borderRadius="md">
            Home
          </Link>
        </NavLink>

        <NavLink to="/about" style={{ textDecoration: 'none' }}>
          <Link _hover={{ textDecoration: 'none', bg: 'gray.700' }} py="2" px="3" borderRadius="md">
            About
          </Link>
        </NavLink>

        <NavLink to="/contact" style={{ textDecoration: 'none' }}>
          <Link _hover={{ textDecoration: 'none', bg: 'gray.700' }} py="2" px="3" borderRadius="md">
            Contact
          </Link>
        </NavLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
