import React, { useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth-provider';

interface LoginFormInputs {
  username: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.username, data.password);
    } catch (err: any) {
      toast({
        title: 'Error al iniciar sesión',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bg="gray.900">
      <Box width="full" maxWidth="xl" p={6} bg="white" borderRadius="lg" boxShadow="lg">
        <Heading as="h2" size="lg" mb={6}>
          Iniciar sesión en la plataforma
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Usuario</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="usuario123"
                {...register('username', { required: 'El nombre de usuario es obligatorio' })}
              />
              {errors.username && (
                <Text color="red.500" fontSize="sm">
                  {errors.username.message}
                </Text>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="••••••••"
                {...register('password', { required: 'La contraseña es obligatoria' })}
              />
              {errors.password && (
                <Text color="red.500" fontSize="sm">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full" isLoading={isSubmitting} loadingText="Cargando">
              Iniciar sesión
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AuthPage;
