import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, IconButton, useToast } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./sidebar.component";
import Navbar from "./navbar.component";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  let isAnimating = false;

  const location = useLocation();
  const toast = useToast();
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const sessionExpirationTime = 150 * 60 * 1000; // 5 minutos de inactividad

  // Rutas donde el Sidebar y el Navbar son visibles
  const pathsWithSidebar = ['/dashboard', '/users']; // Añade las rutas donde quieras mostrar el sidebar
  const pathsWithNavbar = ['/dashboard', '/users', '/settings']; // Añade las rutas donde quieras mostrar el navbar

  // Condiciones para mostrar Sidebar y Navbar
  const shouldShowSidebar = pathsWithSidebar.includes(location.pathname);
  const shouldShowNavbar = pathsWithNavbar.includes(location.pathname);


  const toggleSidebar = () => {
    if (isAnimating) return; // Si ya está animando, no hace nada
    isAnimating = true;

    setSidebarOpen((prev) => !prev);

    // Restablece isAnimating una vez que termina la animación
    setTimeout(() => {
      isAnimating = false;
    }, 300); // Ajusta el tiempo al de la animación real del sidebar
  };

  const resetTimer = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      localStorage.clear();
      navigate('/');
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
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    document.onclick = resetTimer;

    return () => {
      clearTimeout(timeoutRef.current);
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
            transition="opacity 0.3s"
            animate={{
              transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)"
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
