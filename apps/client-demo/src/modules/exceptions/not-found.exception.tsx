import { Box, Button, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
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
          src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?t=st=1729627138~exp=1729630738~hmac=72d8f717bfcd659d27fc10e73014488ab0ff189557789157a228227e7919458c&w=826"
          alt="Page not found"
          boxSize="300px"
          rounded="full"
        />
        {/* Título */}
        <Heading as="h1" size="2xl">
          Page not found
        </Heading>
        {/* Descripción */}
        <Text fontSize="lg" color="gray.400">
          Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.
        </Text>
        {/* Botón */}
        <Button colorScheme="blue" onClick={handleGoHome}>
          Go back home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
