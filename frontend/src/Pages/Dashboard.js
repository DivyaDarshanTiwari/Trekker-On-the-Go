import {
  VStack,
  Text,
  Box,
  Divider,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  useNavigate,
  Link as RouterLink,
  Route,
  Routes,
} from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Use for redirecting if needed

  useEffect(() => {
    // Get the logged-in user details from localStorage or redirect to login if no data
    const storedUser = localStorage.getItem("User_Data");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user data found, redirect to login page
      navigate("/");
    }
  }, [navigate]);

  return (
    <VStack
      spacing={6}
      align="start"
      p={8}
      bg="gray.50"
      w="full"
      maxW="600px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Text fontSize="3xl" fontWeight="bold" color="teal.600" align="center">
        User Dashboard
      </Text>

      {/* Navigation bar */}
      <HStack
        spacing={8}
        w="full"
        justifyContent="center"
        p={4}
        bg="teal.600"
        color="white"
        borderRadius="md"
      >
        <Link
          as={RouterLink}
          to="/dashboard/profile"
          fontWeight="bold"
          _hover={{ textDecoration: "underline" }}
        >
          Profile
        </Link>
        <Link
          as={RouterLink}
          to="/dashboard/functionality"
          fontWeight="bold"
          _hover={{ textDecoration: "underline" }}
        >
          Functionality
        </Link>
      </HStack>

      {/* Divider for better visual separation */}
      <Divider borderColor="gray.300" />

      <Routes>
        <Route
          path="/profile"
          element={
            <>
              {/* Profile section showing user details */}
              {user.name && (
                <Box
                  w="full"
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  borderColor="gray.200"
                  borderWidth="1px"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    Name:
                  </Text>
                  <Text>{user.name}</Text>
                </Box>
              )}
              {user.SAP_DL_ID && (
                <Box
                  w="full"
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  borderColor="gray.200"
                  borderWidth="1px"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    ID:
                  </Text>
                  <Text>{user.SAP_DL_ID}</Text>
                </Box>
              )}
              {user.Email && (
                <Box
                  w="full"
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  borderColor="gray.200"
                  borderWidth="1px"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    Email:
                  </Text>
                  <Text>{user.Email}</Text>
                </Box>
              )}
              {user.phoneNo && (
                <Box
                  w="full"
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  borderColor="gray.200"
                  borderWidth="1px"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    Phone:
                  </Text>
                  <Text>{user.phoneNo}</Text>
                </Box>
              )}
              {user.role && (
                <Box
                  w="full"
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  borderColor="gray.200"
                  borderWidth="1px"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    Role:
                  </Text>
                  <Text>{user.role}</Text>
                </Box>
              )}

              {/* Conditionally display driver details */}
              {user.role === "Driver" && (
                <>
                  {user.LicensePlate && (
                    <Box
                      w="full"
                      p={4}
                      bg="white"
                      borderRadius="md"
                      boxShadow="md"
                      borderColor="gray.200"
                      borderWidth="1px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        License Plate:
                      </Text>
                      <Text>{user.LicensePlate}</Text>
                    </Box>
                  )}
                  {user.maxCapacity && (
                    <Box
                      w="full"
                      p={4}
                      bg="white"
                      borderRadius="md"
                      boxShadow="md"
                      borderColor="gray.200"
                      borderWidth="1px"
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        Capacity:
                      </Text>
                      <Text>{user.maxCapacity}</Text>
                    </Box>
                  )}
                </>
              )}
            </>
          }
        />
        <Route
          path="/functionality"
          element={
            <>
              {/* Functionality section with buttons */}
              <Box
                w="full"
                p={4}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                borderColor="gray.200"
                borderWidth="1px"
              >
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                  Functionality
                </Text>
                <Button colorScheme="teal" variant="solid" mb={2} w="full">
                  Button 1
                </Button>
                <Button colorScheme="teal" variant="solid" mb={2} w="full">
                  Button 2
                </Button>
                <Button colorScheme="teal" variant="solid" w="full">
                  Button 3
                </Button>
              </Box>
            </>
          }
        />
      </Routes>
    </VStack>
  );
};

export default Dashboard;
