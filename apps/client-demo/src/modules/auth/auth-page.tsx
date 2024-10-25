import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth-provider';

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ username?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();


  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard'); // Redirige al dashboard si el usuario ya está autenticado
    }
}, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { username?: string; password?: string } = {};
    if (!username) errors.username = 'El nombre de usuario es obligatorio';
    if (!password) errors.password = 'La contraseña es obligatoria';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard'); // Redirigir tras inicio de sesión exitoso
    } catch (err: any) {
        console.error(err);
      toast({
        title: 'Error al iniciar sesión',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bg="gray.900">
      <Box width="full" maxWidth="xl" p={6} bg="white" borderRadius="lg" boxShadow="lg">
        <Heading as="h2" size="lg" mb={6}>
          Iniciar sesión en la plataforma
        </Heading>
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!validationErrors.username}>
              <FormLabel htmlFor="username">Usuario</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="usuario123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                borderColor={validationErrors.username ? 'red.500' : 'gray.300'}
              />
              {validationErrors.username && (
                <Text color="red.500" fontSize="sm">
                  {validationErrors.username}
                </Text>
              )}
            </FormControl>

            <FormControl isInvalid={!!validationErrors.password}>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor={validationErrors.password ? 'red.500' : 'gray.300'}
              />
              {validationErrors.password && (
                <Text color="red.500" fontSize="sm">
                  {validationErrors.password}
                </Text>
              )}
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full" isLoading={loading} loadingText="Cargando">
              Iniciar sesión
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AuthPage;
