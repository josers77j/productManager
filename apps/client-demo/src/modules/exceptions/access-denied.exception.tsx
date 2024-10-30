import { Box, Button, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="gray.900"
      color="white"
    >
      <VStack spacing={6} textAlign="center">
        {/* Imagen */}
        <Image
          src="https://www.bluehost.com/blog/wp-content/smush-webp/2023/06/what-is-a-401-error-1024x576.png.webp"
          alt="Access denied"
          boxSize="300px"
          rounded="full"
        />
        {/* Título */}
        <Heading as="h1" size="2xl">
          Acceso Denegado :c
        </Heading>
        {/* Descripción */}
        <Text fontSize="lg" color="gray.400">
          Lo sentimos, no tienes permisos para acceder a esta página. Si crees que esto es un error, contacta con el administrador.
        </Text>
        {/* Botón */}
        <Button colorScheme="red" onClick={handleGoHome}>
          Volver al inicio
        </Button>
      </VStack>
    </Box>
  );
};

export default AccessDenied;
