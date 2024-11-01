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
import { motion } from 'framer-motion';

interface SidebarProps {
  onLinkClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
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

  const hasAccess = (path: string, action: string) => {
    return permissions.some(permission => (
      permission.permission.action === action && permission.permission.resource.route === path
    ));
  };

  const filteredSections = sections
    .map(section => ({
      ...section,
      links: section.links.filter(link => hasAccess(link.path, link.action)),
    }))
    .filter(section => section.links.length > 0);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box as="nav" h="100vh" w={{ base: 'full', md: '250px' }} bg="gray.800" p="5" boxShadow="lg" zIndex="1">
      <VStack spacing={2} align="stretch" py={20}>
        <Text fontSize="2xl" fontWeight="bold" mb="4" color="gray.100">
          Módulos
        </Text>

        {hasAccess('/dashboard', 'ACCESS') && (
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
              onClick={onLinkClick}
            >
              <Icon as={FaTachometerAlt} mr="4" />
              <Text>Dashboard</Text>
            </Link>
          </NavLink>
        )}

        <Accordion allowToggle>
          {filteredSections.map((section, index) => (
            <AccordionItem key={section.title} border="none">
              <AccordionButton onClick={() => toggleAccordion(index)} _expanded={{ bg: 'gray.700', color: 'white' }}>
                <Box flex="1" textAlign="left" fontWeight="bold" color="gray.100">
                  {section.title}
                </Box>
                <AccordionIcon color="gray.100" />
              </AccordionButton>
              <motion.div
                initial={false}
                animate={{ height: openIndex === index ? 'auto' : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: 'hidden' }}
              >
                <AccordionPanel pb={4} color="gray.300">
                  {section.links.map((link) => (
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
                        onClick={onLinkClick}
                      >
                        <Icon as={link.icon} mr="4" />
                        <Text>{link.label}</Text>
                      </Link>
                    </NavLink>
                  ))}
                </AccordionPanel>
              </motion.div>
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
};

export default Sidebar;
