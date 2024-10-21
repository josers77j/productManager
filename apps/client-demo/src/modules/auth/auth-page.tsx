import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { AuthService } from './auth-service';

const AuthPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{ username?: string; password?: string }>({});

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validar si los campos están vacíos
        const errors: { username?: string; password?: string } = {};
        if (!username) {
            errors.username = 'El nombre de usuario es obligatorio';
        }
        if (!password) {
            errors.password = 'La contraseña es obligatoria';
        }

        // Si hay errores, actualiza el estado y no ejecuta el login
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});
        setLoading(true);

        try {
            const data = await AuthService.login({ username, password });
            console.log('Inicio de sesión exitoso:', data);
            // Aquí puedes redirigir al usuario o guardar el token
        } catch (err: any) {
            setError(err.message);
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

                {/* Mostrar mensaje de error general */}
                {error && (
                    <Box bg="red.500" color="white" p={3} mb={4} borderRadius="md">
                        <Text>{error}</Text>
                    </Box>
                )}

                <form onSubmit={handleLogin}>
                    <Stack spacing={4}>
                        <FormControl isInvalid={!!validationErrors.username}>
                            <FormLabel htmlFor="username">Usuario</FormLabel>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="usuario123"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                borderColor={validationErrors.username ? 'red.500' : 'gray.300'} // Color del borde si hay error
                            />
                            {validationErrors.username && (
                                <Text color="red.500" fontSize="sm">
                                    {validationErrors.username}
                                </Text>
                            )}
                        </FormControl>

                        <FormControl isInvalid={!!validationErrors.password}>
                            <FormLabel htmlFor="password">contraseña</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                borderColor={validationErrors.password ? 'red.500' : 'gray.300'} // Color del borde si hay error
                            />
                            {validationErrors.password && (
                                <Text color="red.500" fontSize="sm">
                                    {validationErrors.password}
                                </Text>
                            )}
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            width="full"
                            isLoading={loading}
                            loadingText="Cargando"
                        >
                            Iniciar sesión
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
};

export default AuthPage;
