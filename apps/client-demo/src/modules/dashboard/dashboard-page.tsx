import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';



const dashboardPage = () => {
    const toast = useToast()
    const [sessionStart, setSessionStart] = useState(false);



useEffect(() =>{
    
    if (!sessionStart) {
        console.log(sessionStart);
        setSessionStart(!sessionStart); 
        toast({
            title: 'Inicio de sesión exitoso.',
            description: "Has iniciado sesión correctamente.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });  
    }

}, [])

  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading mb={5}>Dashboard</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem w="100%" h="200" bg="teal.500" borderRadius="md" p={4}>
            <Text color="white" fontWeight="bold">Card 1</Text>
            <Button mt={4} colorScheme="whiteAlpha">Acción 1</Button>
          </GridItem>
          <GridItem w="100%" h="200" bg="blue.500" borderRadius="md" p={4}>
            <Text color="white" fontWeight="bold">Card 2</Text>
            <Button mt={4} colorScheme="whiteAlpha">Acción 2</Button>
          </GridItem>
          <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
            <Text color="white" fontWeight="bold">Card 3</Text>
            <Button mt={4} colorScheme="whiteAlpha">Acción 3</Button>
          </GridItem>
          {/* Agrega más tarjetas según sea necesario */}
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default dashboardPage;
