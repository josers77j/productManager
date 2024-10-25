import React from 'react';
import { 
  Box, 
  IconButton, 
  Image, 
  Flex, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Drawer, 
  DrawerBody, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton, 
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../modules/auth/auth-provider';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure(); // Control del Drawer

    const handleLogout = () => {
        logout();
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
                    {/* Botón de Notificaciones con Drawer */}
                    <IconButton
                        aria-label="Notifications"
                        icon={<FaBell />}
                        size="lg"
                        variant="ghost"
                        color="gray.100"
                        mr={4}
                        _hover={{ bg: 'gray.600' }}
                        onClick={onOpen} // Abre el Drawer al hacer clic
                    />
                    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{ base: 'xs', md: 'md' }}>
                        <DrawerOverlay />
                        <DrawerContent rounded="md">
                            <DrawerCloseButton />
                            <DrawerHeader>Notificaciones</DrawerHeader>
                            <DrawerBody>
                                <p>Aquí puedes mostrar tus notificaciones</p>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant="outline" mr={3} onClick={onClose}>
                                    Cerrar
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    
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
