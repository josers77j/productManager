// src/components/Layout.tsx
import React from 'react';
import { Box } from '@chakra-ui/react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box>
      {/* Aquí podrías agregar un encabezado, un pie de página, etc. */}
      {children}
    </Box>
  );
};

export default Layout;
