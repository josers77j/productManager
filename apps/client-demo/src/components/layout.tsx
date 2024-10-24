import React from 'react';
import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar.component';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const pathsWithSidebar = ['/dashboard']; // Añade las rutas donde quieras mostrar el sidebar

  const shouldShowSidebar = pathsWithSidebar.includes(location.pathname);

  return (
    <Box display="flex">
      {shouldShowSidebar && <Sidebar />} {/* Sidebar visible solo en rutas especificadas */}

      {/* Contenido principal */}
      <Box ml={shouldShowSidebar ? '250px' : '0'} w="100%" p={shouldShowSidebar ? '4' : '0'}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
