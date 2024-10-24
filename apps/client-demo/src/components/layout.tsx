import React, { useEffect } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar.component';
import Navbar from './navbar.component';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const toast = useToast();
  const navigate = useNavigate();

  let timeout: string | number | NodeJS.Timeout | undefined;
  const sessionExpirationTime = 150 * 60 * 1000; // 5 minutos de inactividad

  // Rutas donde el Sidebar y el Navbar son visibles
  const pathsWithSidebar = ['/dashboard']; // Añade las rutas donde quieras mostrar el sidebar
  const pathsWithNavbar = ['/dashboard', '/profile', '/settings']; // Añade las rutas donde quieras mostrar el navbar

  // Condiciones para mostrar Sidebar y Navbar
  const shouldShowSidebar = pathsWithSidebar.includes(location.pathname);
  const shouldShowNavbar = pathsWithNavbar.includes(location.pathname);

  const resetTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // Limpiar la sesión después de 5 minutos de inactividad
      localStorage.clear();
      navigate('/'); // Redirigir al login

      // Mostrar un toast cuando se cierre la sesión
      toast({
        title: 'Sesión cerrada por inactividad.',
        description: 'Has sido desconectado por inactividad.',
        status: 'info',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }, sessionExpirationTime);
  };

  useEffect(() => {
    // Monitorear la actividad del usuario
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onclick = resetTimer;

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box>
      {/* Navbar visible solo en rutas especificadas */}
      {shouldShowNavbar && <Navbar />} 

      {/* Contenedor para el Sidebar y el contenido */}
      <Flex>
        {/* Sidebar visible solo en rutas especificadas */}
        {shouldShowSidebar && (
          <Box width="250px" position="fixed" top="0" left="0" height="100vh" zIndex="1">
            <Sidebar />
          </Box>
        )}

        {/* Contenido principal */}
        <Box ml={shouldShowSidebar ? '250px' : '0'} w="100%" p={shouldShowSidebar ? '4' : '0'}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
