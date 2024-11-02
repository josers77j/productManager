// MyTable.tsx
import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { Table, Thead, Tbody, Tr, Th, Td, Text, Box, Heading, Button, useToast } from '@chakra-ui/react';
import MotionBox from '../../../components/MotionBox';

type Product = {
  id: number;
  name: string;
  technology: string;
  description: string;
  price: number;
  discount: string;
};

const data: Product[] = [
  { id: 1, name: 'Education Dashboard', technology: 'Angular', description: 'Start developing with...', price: 149, discount: 'No' },
  { id: 2, name: 'React UI Kit', technology: 'React JS', description: 'Start developing with...', price: 129, discount: '10%' },
  // Más productos...
];

const UserPage: React.FC = () => {
  const toast = useToast();

  const handleUpdate = (product: Product) => {
    toast({
      title: `Item ${product.id} actualizado.`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (product: Product) => {
    toast({
      title: `Item ${product.id} eliminado.`,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading mb={5} color="teal.500">Usuarios</Heading>
      <Table variant="striped" colorScheme="teal" bg="white" rounded="10px" boxShadow="md">
        <Thead>
          <Tr>
            <Th color="teal.600">Product Name</Th>
            <Th color="teal.600">Technology</Th>
            <Th color="teal.600">Description</Th>
            <Th color="teal.600">Price</Th>
            <Th color="teal.600">Discount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((product) => (
            <ContextMenu.Root key={product.id}>
              <ContextMenu.Trigger asChild>
                <Tr>
                  <Td>{product.name}</Td>
                  <Td>{product.technology}</Td>
                  <Td>{product.description}</Td>
                  <Td>${product.price}</Td>
                  <Td>{product.discount}</Td>
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
                >
                  <ContextMenu.Item onSelect={() => handleUpdate(product)}>
                    <Text
                      _hover={{ bg: 'gray.600', cursor: 'pointer' }}
                      p={2}
                      borderRadius="md"
                    >
                      Update
                    </Text>
                  </ContextMenu.Item>
                  <ContextMenu.Item onSelect={() => handleDelete(product)}>
                    <Text
                      _hover={{ bg: 'gray.600', cursor: 'pointer' }}
                      p={2}
                      color="red.400"
                      borderRadius="md"
                    >
                      Delete
                    </Text>
                  </ContextMenu.Item>
                </MotionBox>
              </ContextMenu.Content>
            </ContextMenu.Root>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserPage;
