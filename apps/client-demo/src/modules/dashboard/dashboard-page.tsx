// DashboardPage.js
import { useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

const DashboardPage = () => {
  const toast = useToast();

  useEffect(() => {
    const sessionStart = localStorage.getItem("sessionStart");

    if (!sessionStart) {
      localStorage.setItem("sessionStart", "true");

      toast({
        title: "Inicio de sesión exitoso.",
        description: "Has iniciado sesión correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [toast]);

  return (
    <Box p={5}>
      <Heading mb={5}>Dashboard</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
        <GridItem w="100%" h="200" bg="teal.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 1
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 1
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="blue.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 2
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 2
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>   <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
        <GridItem w="100%" h="200" bg="purple.500" borderRadius="md" p={4}>
          <Text color="white" fontWeight="bold">
            Card 3
          </Text>
          <Button mt={4} colorScheme="whiteAlpha">
            Acción 3
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
