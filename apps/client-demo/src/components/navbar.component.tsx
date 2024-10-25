import React from 'react';
import { Box, IconButton, Image, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const Navbar: React.FC = () => {
  const navigate = useNavigate();  // Hook para la navegación

  // Función para cerrar sesión
  const handleLogout = () => {
    // Limpiar localStorage (si estás guardando el token o algo relacionado)
    localStorage.clear();  // Puedes usar removeItem('token') si solo quieres eliminar un ítem específico

    // Limpiar el estado (si usas algún contexto de autenticación, puedes llamar a una función que lo limpie)

    // Redireccionar al login
    navigate('/');
  };

  return (
    <Box
    as="nav"
    bg="gray.900"
    borderColor="gray.100"
    px={5}
    py={2}
    h={70}
    position="fixed"
    top="0"
    left="0"
    right="0"
    zIndex="2"
  >
    <Flex justify="space-between" align="center">
      {/* Logo */}
      <Box>
        <Image
          src="../../src/images/owl-logo.image.png"
          alt="logo"
          h="10"
          w="10"
          marginLeft={10}
          filter={'invert(1)'}
        />
      </Box>
      {/* Ícono de Notificaciones y Perfil */}
      <Flex align="center" gap={1}>
        <IconButton
          aria-label="Notifications"
          icon={<FaBell />}
          size="lg"
          variant="ghost"
          color="gray.100"
          mr={4}
          _hover={{ bg: 'gray.600' }}
        />
        {/* Dropdown de perfil */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Profile"
            icon={<FaUser />}
            size="lg"
            variant="ghost"
            color="gray.100"
            _hover={{ bg: 'gray.600' }}
            _expanded={{ bg: 'gray.600' }}
          />
          <MenuList>
            <MenuItem
              icon={<FaUser />}
              _hover={{ bg: 'gray.200', color: 'gray.800' }}
            >
              Mi Cuenta
            </MenuItem>
            <MenuItem
              icon={<FaSignOutAlt />}
              _hover={{ bg: 'gray.200', color: 'gray.800' }}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  </Box>

  );
};

export default Navbar;
