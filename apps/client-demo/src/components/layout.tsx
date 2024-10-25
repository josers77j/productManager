import React, { useState, useEffect } from "react";
import { Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./sidebar.component";
import Navbar from "./navbar.component";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const location = useLocation();
  const toast = useToast();
  const navigate = useNavigate();

  let timeout: string | number | NodeJS.Timeout | undefined;
  const sessionExpirationTime = 150 * 60 * 1000; // 5 minutos de inactividad

  // Rutas donde el Sidebar y el Navbar son visibles
  const pathsWithSidebar = ['/dashboard', '/users']; // Añade las rutas donde quieras mostrar el sidebar
  const pathsWithNavbar = ['/dashboard', '/users', '/settings']; // Añade las rutas donde quieras mostrar el navbar

  // Condiciones para mostrar Sidebar y Navbar
  const shouldShowSidebar = pathsWithSidebar.includes(location.pathname);
  const shouldShowNavbar = pathsWithNavbar.includes(location.pathname);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

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

      <Flex>
        {/* Botón para abrir/cerrar el sidebar */}
        {shouldShowSidebar && (
          <IconButton
            bg={"gray.900"}
            _hover={{ bg: "gray.600" }}
            aria-label="Toggle Sidebar"
            textColor={"gray.100"}
            position="fixed"
            top="0.8rem"
            left="0.5rem"
            zIndex="2"
            onClick={toggleSidebar}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isSidebarOpen ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </motion.div>
          </IconButton>
        )}

        {/* Sidebar con animación */}
        {shouldShowSidebar && (
          <Box
            as={motion.div}
            w={{ base: "full", md: "250px" }} // En pantallas pequeñas, el sidebar ocupa el ancho completo
            zIndex="1"
            position="fixed"
            height="100vh"
            transition="transform 0.3s ease, opacity 0.3s ease"
            initial={{ transform: "translateX(-100%)", opacity: 0 }}
            animate={{
              transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
              opacity: isSidebarOpen ? 1 : 0,
            }}
          >
            <Sidebar />
          </Box>
        )}

        {/* Contenido principal ajustado */}
        <Box
          flex="1"
          py={shouldShowNavbar ? "70px" : "0"}
          transition="margin-left 0.3s ease"
          // Si la pantalla es pequeña (base), no aplicar margen izquierdo
          marginLeft={{ base: "0", md: isSidebarOpen && shouldShowSidebar ? "250px" : "0" }}
          w="100%"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
