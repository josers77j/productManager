import {
  Box,
  VStack,
  Link,
  Text,
  Icon,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Spinner,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaUserShield, FaCogs, FaSignInAlt, FaList, FaBox, FaTachometerAlt } from 'react-icons/fa';
import { useAuth } from '../modules/auth/auth-provider';
import { useState } from 'react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Spinner color="white" size="xl" />;
  }

  const permissions = user.role.permissions;

  const sections = [
    {
      title: 'Administración',
      links: [
        { label: 'Usuarios', icon: FaUser, path: '/users', action: 'READ', resource: 'User Management' },
        { label: 'Roles', icon: FaUserShield, path: '/roles', action: 'READ', resource: 'Role Management' },
        { label: 'Permisos', icon: FaCogs, path: '/permissions', action: 'READ', resource: 'Permissions Management' },
        { label: 'Asignación de permisos', icon: FaSignInAlt, path: '/assign-permissions', action: 'ASSIGN', resource: 'Assign Permissions' },
      ],
    },
    {
      title: 'Gestión de Contenido',
      links: [
        { label: 'Categorías', icon: FaList, path: '/categories', action: 'READ', resource: 'Categories' },
        { label: 'Inventario', icon: FaBox, path: '/inventory', action: 'READ', resource: 'Inventory' },
        { label: 'Entradas de producto', icon: FaBox, path: '/product-entries', action: 'CREATE', resource: 'Product Entries' },
        { label: 'Salidas de producto', icon: FaBox, path: '/product-exits', action: 'DELETE', resource: 'Product Exits' },
      ],
    },
  ];

  const hasAccess = (resource: string, action: string) => {
    return permissions.some(permission => {
      return (
        permission.permission.action === action
      );
    });
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box as="nav" h="100vh" w={{ base: 'full', md: '250px' }} bg="gray.800" p="5" boxShadow="lg" zIndex="1">
      <VStack spacing={2} align="stretch" py={20}>
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="gray.100">
          Módulos
        </Text>

        {/* Dashboard sin acordeón */}
        {hasAccess('Dashboard', 'READ') && (
          <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
            <Link
              display="flex"
              alignItems="center"
              py="2"
              px="4"
              borderRadius="md"
              color="white"
              bg={window.location.pathname === '/dashboard' ? 'gray.600' : 'transparent'}
              _hover={{ bg: 'gray.100', color: 'gray.800' }}
            >
              <Icon as={FaTachometerAlt} mr="4" />
              <Text>Dashboard</Text>
            </Link>
          </NavLink>
        )}

        <Accordion allowToggle>
          {sections.map((section, index) => (
            <AccordionItem key={section.title} border="none">
              <AccordionButton
                onClick={() => setOpenIndex(openIndex === index ? null : index)} // Alternar acordeón
                _expanded={{ bg: 'gray.700', color: 'white' }}
              >
                <Box flex="1" textAlign="left" fontWeight="bold" color="gray.100">
                  {section.title}
                </Box>
                <AccordionIcon color="gray.100" />
              </AccordionButton>
              <AccordionPanel pb={4}>
                {section.links.map(link => {
                  if (!hasAccess(link.resource, link.action)) return null;

                  return (
                    <NavLink to={link.path} key={link.label} style={{ textDecoration: 'none' }}>
                      <Link
                        display="flex"
                        alignItems="center"
                        py="2"
                        px="4"
                        borderRadius="md"
                        color="white"
                        bg={window.location.pathname === link.path ? 'gray.600' : 'transparent'}
                        _hover={{ bg: 'gray.100', color: 'gray.800' }}
                      >
                        <Icon as={link.icon} mr="4" />
                        <Text>{link.label}</Text>
                      </Link>
                    </NavLink>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default Sidebar;
