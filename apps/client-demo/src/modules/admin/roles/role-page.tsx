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
  Input,
  GridItem,
  FormControl,
  FormErrorMessage,
  InputLeftElement,  
  InputGroup,
} from '@chakra-ui/react';

import { MdGroup, MdSearch } from 'react-icons/md';
import { OverlayProvider } from '@react-aria/overlays';
import MotionBox from '../../../components/MotionBox';
import ModalSkeleton from '../../../components/modal-esqueleton.component';
import { useForm, SubmitHandler } from 'react-hook-form';
import Paginator from '../../../components/paginator.component';
import getRoles from './role-service';

type Roles = {
  id: number;
  name: string;
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
  name: string; 
};

const RolePage: React.FC = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInputs>();
  const [roles, setRoles] = useState<Roles[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda

  const fetchRoles = async (page: number, perPage: number) => {
    setLoading(true);
    try {
      const payload = await getRoles(page, perPage);
      setRoles(payload.data);
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
    fetchRoles(page, perPage);
  }, [page, perPage, toast]);

  const handleUpdate = (role: Roles) => {
    toast({
      title: `User ${role.id} updated.`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
    // Aquí puedes implementar la lógica de actualización, como abrir otro modal con los datos del usuario
  };

  const handleDelete = (role: Roles) => {
    // Aquí puedes implementar la lógica de eliminación del usuario, como llamar a una API para eliminarlo
    setRoles(roles.filter((r) => r.id !== role.id));
    toast({
      title: `User ${role.id} deleted.`,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCreateRoleSubmit: SubmitHandler<UserFormInputs> = (data) => {
    // Aquí puedes implementar la lógica para crear el usuario, por ejemplo, enviando los datos a una API
    console.log('Datos del formulario:', data);


    setRoles([...roles]);
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
              colorScheme="whiteAlpha"
              bg="gray.700"
              rounded="10px"
              boxShadow="md"
              color={"white"}
            >
              <Thead>
                <Tr>
                  <Th color="white.100">#</Th>
                  <Th color="white.100">Nombre del rol</Th>
                </Tr>
              </Thead>
              <Tbody>
                {roles
                  .filter(role => 
                    role.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) // Filtrar usuarios según el término de búsqueda
                  .map((role) => (
                    <ContextMenu.Root key={role.id}>
                      <ContextMenu.Trigger asChild>
                        <Tr>
                          <Td>{role.id}</Td>
                          <Td>{role.name}</Td>
                        </Tr>
                      </ContextMenu.Trigger>
                      <ContextMenu.Content asChild>
                        <MotionBox
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          bg="white"
                          color="black"
                          borderRadius="md"
                          shadow="md"
                          p={2}
                          minWidth="150px"
                          zIndex={10}
                        >
                          <ContextMenu.Item onSelect={() => handleUpdate(role)}>
                            <Text
                              _hover={{ bg: 'gray.200', cursor: 'pointer' }}
                              p={2}
                              borderRadius="md"
                            >
                              Actualizar
                            </Text>
                          </ContextMenu.Item>
                          <ContextMenu.Item onSelect={() => handleDelete(role)}>
                            <Text
                              _hover={{ bg: 'gray.200', cursor: 'pointer' }}
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
            title="Crear Rol"
            gridTemplateColumns="repeat(2, 1fr)"
            onSubmit={handleSubmit(handleCreateRoleSubmit)}
          >
            
            {/* Nombre */}
            <GridItem colSpan={{ base: 2, md: 2 }}>
              <FormControl isInvalid={!!errors.name}>
                <Text mb={2}>Nombre del rol</Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdGroup color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Rol"
                    {...register('name', { required: 'Este campo es obligatorio' })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
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

export default RolePage;
