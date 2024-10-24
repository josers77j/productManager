import React from 'react';
import { Box, IconButton, Image, Flex, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaBars, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
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
      bg="gray.700"
      borderBottom="1px"
      borderColor="gray.100"
      px={20}
      py={1}
      h={90}
    >
      <Flex justify="space-between" align="center">
        {/* Ícono de menú */}
        <IconButton
          aria-label="Open Menu"
          icon={<FaBars />}
          size="lg"
          variant="unstyled"
          display={{ base: 'block', lg: 'none' }}
          color="cyan.900"
          _hover={{ bg: 'cyan.500' }}
        />

        {/* Logo */}
        <Box>
          <Image
            src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
            alt="logo"
            h="20"
            w="28"
          />
        </Box>

        {/* Ícono de Notificaciones y Perfil */}
        <Flex align="center" gap={4}>
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
