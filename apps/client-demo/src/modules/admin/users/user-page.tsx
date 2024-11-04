import React, { useEffect, useState } from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Heading,
  Button,
  useToast,
  Flex,
  Select,
  Input,
  GridItem,
  FormControl,
  FormErrorMessage,
  InputLeftElement,  
  InputGroup,
} from '@chakra-ui/react';

import { MdPerson, MdEmail, MdSearch } from 'react-icons/md';
import { OverlayProvider } from '@react-aria/overlays';
import MotionBox from '../../../components/MotionBox';
import getUsers from './user-service';
import ModalSkeleton from '../../../components/modal-esqueleton.component';
import { useForm, SubmitHandler } from 'react-hook-form';
import Paginator from '../../../components/paginator.component';

type Role = {
  id: number;
  name: string;
};

type User = {
  id: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
};

type Meta = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
};

type UserFormInputs = {
  username: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
};

const UserPage: React.FC = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInputs>();
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda

  const fetchUsers = async (page: number, perPage: number) => {
    setLoading(true);
    try {
      const payload = await getUsers(page, perPage);
      setUsers(payload.data);
      setMeta(payload.meta);
      console.log('Users fetched:', payload.data);
    } catch (error) {
      toast({
        title: 'Error fetching users.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, perPage);
  }, [page, perPage, toast]);

  const handleUpdate = (user: User) => {
    toast({
      title: `User ${user.id} updated.`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    // Aquí puedes implementar la lógica de actualización, como abrir otro modal con los datos del usuario
  };

  const handleDelete = (user: User) => {
    // Aquí puedes implementar la lógica de eliminación del usuario, como llamar a una API para eliminarlo
    setUsers(users.filter((u) => u.id !== user.id));
    toast({
      title: `User ${user.id} deleted.`,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCreateUserSubmit: SubmitHandler<UserFormInputs> = (data) => {
    // Aquí puedes implementar la lógica para crear el usuario, por ejemplo, enviando los datos a una API
    console.log('Datos del formulario:', data);

    // Simulación de creación de usuario
    const newUser: User = {
      id: users.length + 1, // Simular un ID único
      username: data.username,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      role: { id: 1, name: data.role }, // Asignar un ID fijo para el rol
    };

    setUsers([...users, newUser]);
    toast({
      title: 'Usuario creado exitosamente.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    setIsModalOpen(false);
    reset();
  };

  const handleCreateUser = () => {
    setIsModalOpen(true);
  };

  const handleClearFields = () => {
    reset();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejar el clic en el botón de búsqueda
  const handleSearch = () => {
    console.log('Buscar:', searchTerm);
  };

  return (
    <OverlayProvider>
      <Box p={6}>
        <Heading color="gray.900">Usuarios</Heading>
        <Box mb={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <InputGroup size="md" maxWidth="300px" mr={2}>
              <InputLeftElement pointerEvents="none">
                <MdSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                size="md"
              />
            </InputGroup>
            <Button onClick={handleSearch} colorScheme="blue">
              Buscar
            </Button>
          </Flex>
          <Button colorScheme="teal" onClick={handleCreateUser}>
            Crear Usuario
          </Button>
        </Flex>
      </Box>
        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <Box overflow={"auto"}>
            <Table
              variant="striped"
              colorScheme="gray"
              bg="whiteAlpha.900"
              rounded="10px"
              boxShadow="md"
            >
              <Thead>
                <Tr>
                  <Th color="gray.600">Nombre de usuario</Th>
                  <Th color="gray.600">Nombre</Th>
                  <Th color="gray.600">Apellido</Th>
                  <Th color="gray.600">Email</Th>
                  <Th color="gray.600">Rol</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users
                  .filter(user => 
                    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                  ) // Filtrar usuarios según el término de búsqueda
                  .map((user) => (
                    <ContextMenu.Root key={user.id}>
                      <ContextMenu.Trigger asChild>
                        <Tr>
                          <Td>{user.username}</Td>
                          <Td>{user.name}</Td>
                          <Td>{user.lastName}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.role.name}</Td>
                        </Tr>
                      </ContextMenu.Trigger>
                      <ContextMenu.Content asChild>
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          bg="gray.700"
                          color="white"
                          borderRadius="md"
                          shadow="md"
                          p={2}
                          minWidth="150px"
                          zIndex={10}
                        >
                          <ContextMenu.Item onSelect={() => handleUpdate(user)}>
                            <Text
                              _hover={{ bg: 'gray.600', cursor: 'pointer' }}
                              p={2}
                              borderRadius="md"
                            >
                              Actualizar
                            </Text>
                          </ContextMenu.Item>
                          <ContextMenu.Item onSelect={() => handleDelete(user)}>
                            <Text
                              _hover={{ bg: 'gray.600', cursor: 'pointer' }}
                              p={2}
                              color="red.400"
                              borderRadius="md"
                            >
                              Eliminar
                            </Text>
                          </ContextMenu.Item>
                        </MotionBox>
                      </ContextMenu.Content>
                    </ContextMenu.Root>
                  ))}
              </Tbody>
            </Table>
            {meta && (
              <Paginator
                meta={meta}
                onPageChange={setPage}
                onPerPageChange={setPerPage}
              />
            )}
          </Box>
        )}
        {isModalOpen && (
          <ModalSkeleton
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Crear Usuario"
            gridTemplateColumns="repeat(2, 1fr)"
            onSubmit={handleSubmit(handleCreateUserSubmit)}
          >
            {/* Nombre de Usuario */}
            <GridItem colSpan={2}>
              <FormControl isInvalid={!!errors.username}>
                <Text mb={2}>Nombre de Usuario</Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdPerson color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Nombre de usuario"
                    {...register('username', { required: 'Este campo es obligatorio' })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            
            {/* Nombre */}
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isInvalid={!!errors.name}>
                <Text mb={2}>Nombre</Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdPerson color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Nombre"
                    {...register('name', { required: 'Este campo es obligatorio' })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            
            {/* Apellido */}
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isInvalid={!!errors.lastName}>
                <Text mb={2}>Apellido</Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdPerson color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Apellido"
                    {...register('lastName', { required: 'Este campo es obligatorio' })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
            
            {/* Email */}
            <GridItem colSpan={2}>
              <FormControl isInvalid={!!errors.email}>
                <Text mb={2}>Email</Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdEmail color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Email"
                    {...register('email', { required: 'Este campo es obligatorio' })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            {/* Rol */}
            <GridItem colSpan={2}>
              <FormControl isInvalid={!!errors.role}>
                <Text mb={2}>Rol</Text>
                <Select placeholder="Selecciona un rol" {...register('role', { required: 'Este campo es obligatorio' })}>
                  <option value="admin">Admin</option>
                  <option value="user">Usuario</option>
                </Select>
                <FormErrorMessage>
                  {errors.role && errors.role.message}
                </FormErrorMessage>
              </FormControl>
            </GridItem>

            {/* Botones */}
            <GridItem colSpan={2} display="flex" justifyContent="space-between">
              <Button onClick={handleClearFields}>Limpiar</Button>
              <Button colorScheme="teal" type="submit">Crear</Button>
            </GridItem>
          </ModalSkeleton>
        )}
      </Box>
    </OverlayProvider>
  );
};

export default UserPage;
