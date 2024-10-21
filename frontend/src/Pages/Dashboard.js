import {
  VStack,
  Text,
  Box,
  Divider,
  HStack,
  Button,
  Link,
  Flex,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  useNavigate,
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Use for redirecting if needed
  const location = useLocation();

  useEffect(() => {
    // Get the logged-in user details from localStorage or redirect to login if no data
    const storedUser = localStorage.getItem("User_Data");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user data found, redirect to login page
      navigate("/");
    }

    // Redirecting to profile when landing on Dashboard
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/profile");
    }
  }, [navigate, location]);

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bgGradient="linear(to-r, teal.100, teal.300, teal.500)"
      p={4}
    >
      <VStack
        spacing={6}
        align="start"
        p={8}
        bg="white"
        w="full"
        maxW="600px"
        borderRadius="lg"
        boxShadow="2xl"
      >
        <Text fontSize="4xl" fontWeight="bold" color="teal.600" align="center">
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
          boxShadow="lg"
        >
          <Link
            as={RouterLink}
            to="/dashboard/profile"
            fontWeight="bold"
            fontSize="lg"
            _hover={{ textDecoration: "underline", color: "teal.200" }}
            transition="color 0.2s"
          >
            Profile
          </Link>
          <Link
            as={RouterLink}
            to="/dashboard/functionality"
            fontWeight="bold"
            fontSize="lg"
            _hover={{ textDecoration: "underline", color: "teal.200" }}
            transition="color 0.2s"
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
              <VStack w="full" spacing={4}>
                {/* Profile section showing user details */}
                {user.name && (
                  <Box
                    w="full"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                    transition="all 0.3s"
                    _hover={{ boxShadow: "lg" }}
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      Name:
                    </Text>
                    <Text color="gray.600">{user.name}</Text>
                  </Box>
                )}
                {user.SAP_DL_ID && (
                  <Box
                    w="full"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                    transition="all 0.3s"
                    _hover={{ boxShadow: "lg" }}
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      ID:
                    </Text>
                    <Text color="gray.600">{user.SAP_DL_ID}</Text>
                  </Box>
                )}
                {user.Email && (
                  <Box
                    w="full"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                    transition="all 0.3s"
                    _hover={{ boxShadow: "lg" }}
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      Email:
                    </Text>
                    <Text color="gray.600">{user.Email}</Text>
                  </Box>
                )}
                {user.phoneNo && (
                  <Box
                    w="full"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                    transition="all 0.3s"
                    _hover={{ boxShadow: "lg" }}
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      Phone:
                    </Text>
                    <Text color="gray.600">{user.phoneNo}</Text>
                  </Box>
                )}
                {user.role && (
                  <Box
                    w="full"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    boxShadow="md"
                    transition="all 0.3s"
                    _hover={{ boxShadow: "lg" }}
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      Role:
                    </Text>
                    <Text color="gray.600">{user.role}</Text>
                  </Box>
                )}

                {/* Conditionally display driver details */}
                {user.role === "Driver" && (
                  <>
                    {user.LicensePlate && (
                      <Box
                        w="full"
                        p={4}
                        bg="gray.50"
                        borderRadius="md"
                        boxShadow="md"
                        transition="all 0.3s"
                        _hover={{ boxShadow: "lg" }}
                      >
                        <Text fontSize="lg" fontWeight="bold">
                          License Plate:
                        </Text>
                        <Text color="gray.600">{user.LicensePlate}</Text>
                      </Box>
                    )}
                    {user.maxCapacity && (
                      <Box
                        w="full"
                        p={4}
                        bg="gray.50"
                        borderRadius="md"
                        boxShadow="md"
                        transition="all 0.3s"
                        _hover={{ boxShadow: "lg" }}
                      >
                        <Text fontSize="lg" fontWeight="bold">
                          Capacity:
                        </Text>
                        <Text color="gray.600">{user.maxCapacity}</Text>
                      </Box>
                    )}
                  </>
                )}
              </VStack>
            }
          />
          <Route
            path="/functionality"
            element={
              <VStack w="full" spacing={4}>
                {/* Functionality section with buttons */}
                <Box
                  w="full"
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                  boxShadow="md"
                  transition="all 0.3s"
                  _hover={{ boxShadow: "lg" }}
                >
                  <Text fontSize="lg" fontWeight="bold" mb={4} color="teal.700">
                    Functionality
                  </Text>
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    mb={2}
                    w="full"
                    _hover={{ bg: "teal.500" }}
                  >
                    Button 1
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    mb={2}
                    w="full"
                    _hover={{ bg: "teal.500" }}
                  >
                    Button 2
                  </Button>
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    w="full"
                    _hover={{ bg: "teal.500" }}
                  >
                    Button 3
                  </Button>
                </Box>
              </VStack>
            }
          />
        </Routes>
      </VStack>
    </Flex>
  );
};

export default Dashboard;
