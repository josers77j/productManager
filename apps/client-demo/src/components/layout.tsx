// src/components/Layout.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from './sidebar.component';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box display="flex">
    {/* Sidebar */}
    <Sidebar />

    {/* Contenido principal */}
    <Box ml="250px" w="100%" p="4">
      {children}
    </Box>
  </Box>
  );
};

export default Layout;
