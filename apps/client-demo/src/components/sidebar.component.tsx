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
import { FaHome, FaUser, FaUserShield, FaCogs, FaSignInAlt, FaList, FaBox } from 'react-icons/fa';
import { useAuth } from '../modules/auth/auth-provider';

const Sidebar: React.FC = () => {
  const { hasPermission, user } = useAuth();

  // Verifica si el usuario está cargado
  if (!user) {
    return <Spinner color="white" size="xl" />;
  }

  const sections = [
    {
      title: 'Admin',
      permission: { resource: 'admin', action: 'view' },
      links: [
        { label: 'Usuarios', icon: FaUser, path: '/users' },
        { label: 'Roles', icon: FaUserShield, path: '/roles' },
        { label: 'Permisos', icon: FaCogs, path: '/permissions' },
        { label: 'Asignación de permisos', icon: FaSignInAlt, path: '/assign-permissions' },
      ],
    },
    {
      title: 'Dashboard',
      permission: { resource: 'dashboard', action: 'ACCESS' },
      links: [{ label: 'Inicio', icon: FaHome, path: '/dashboard' }],
    },
    {
      title: 'Productos',
      permission: { resource: 'products', action: 'view' },
      links: [
        { label: 'Categorías', icon: FaList, path: '/categories' },
        { label: 'Inventario', icon: FaBox, path: '/inventory' },
        { label: 'Entradas de producto', icon: FaBox, path: '/product-entries' },
        { label: 'Salidas de producto', icon: FaBox, path: '/product-exits' },
      ],
    },
  ];

  return (
    <Box as="nav" h="100vh" w={{ base: 'full', md: '250px' }} bg="gray.800" p="5" boxShadow="lg" zIndex="1">
      <VStack spacing={2} align="stretch" py={20}>
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="gray.100">
          Modulos
        </Text>

        <Accordion allowMultiple>
          {sections.map((section) => {
            const hasAccess = hasPermission(section.permission.resource, section.permission.action);
            console.log(`Access for ${section.title}:`, hasAccess);

            if (!hasAccess) return null;

            return (
              <AccordionItem key={section.title} border="none">
                <AccordionButton _expanded={{ bg: 'gray.700', color: 'white' }}>
                  <Box flex="1" textAlign="left" fontWeight="bold" color="gray.100">
                    {section.title}
                  </Box>
                  <AccordionIcon color="gray.100" />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  {section.links.map((link) => (
                    <NavLink key={link.label} to={link.path} style={{ textDecoration: 'none' }}>
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
                  ))}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default Sidebar;
