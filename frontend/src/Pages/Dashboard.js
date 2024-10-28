import {
  VStack,
  Text,
  Box,
  Divider,
  HStack,
  Button,
  Link,
  Flex,
  Icon,
  useToast, //using for feedback
} from "@chakra-ui/react";
import { FaUser, FaTools, FaBell } from "react-icons/fa"; // Add icons for profile and functionality
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useNavigate,
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("User_Data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/profile");
    }
  }, [navigate, location]);

  const handleOnTheGoClick = async () => {
    try {
      const driverToken = localStorage.getItem("token");
      console.log(driverToken);
      const response = await axios.post(
        "http://localhost:5000/driver/trekker-go-up",
        {
          role: "driver",
        },
        {
          headers: { Authorization: `Bearer ${driverToken}` },
        }
      );
      if (response.data) {
        toast({
          title: "Success",
          description: "Message broadcasted: Driver is on the move.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to broadcast message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReqTrekkerClick = async () => {
    const requestTime = new Date().toISOString(); //getting real-time for request
    try {
      const response = await axios.post(
        "http://localhost:5000/passenger/request-trekker",
        {
          name: user.name,
          requestTime: requestTime,
        }
      );
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to request trekker.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justify={"center"}
      align={"center"}
      minH={"100vh"}
      bg={"gray.50"}
      p={4}
      w={"full"}
    >
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

        {/* Enhanced Navigation bar */}
        <HStack
          spacing={8}
          w="full"
          justifyContent="center"
          p={4}
          bg="teal.600"
          color="white"
          borderRadius="md"
          boxShadow="md"
          position="relative"
        >
          <Link
            as={RouterLink}
            to="/dashboard/profile"
            fontWeight="bold"
            _hover={{ textDecoration: "none", color: "teal.200" }}
            display="flex"
            alignItems="center"
          >
            <Icon as={FaUser} mr={2} />
            Profile
          </Link>
          <Divider orientation="vertical" borderColor="teal.400" h="24px" />
          <Link
            as={RouterLink}
            to="/dashboard/functionality"
            fontWeight="bold"
            _hover={{ textDecoration: "none", color: "teal.200" }}
            display="flex"
            alignItems="center"
          >
            <Icon as={FaTools} mr={2} />
            Functionality
          </Link>

          {/* Notification section for the passenger */}
          {user.role === "Passenger" && (
            <>
              <Divider orientation="vertical" borderColor="teal.400" h="24px" />
              <Link
                as={RouterLink}
                to="/notification"
                fontWeight="bold"
                _hover={{ textDecoration: "none", color: "teal.200" }}
                display="flex"
                alignItems="center"
              >
                <Icon as={FaBell} mr={2} />
                Notifications
              </Link>
            </>
          )}
        </HStack>

        <Divider borderColor="gray.300" />

        <Routes>
          <Route
            path="/profile"
            element={
              <>
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
                {user.role === "Passenger" && (
                  <>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      mb={2}
                      w="full"
                      onClick={handleReqTrekkerClick}
                    >
                      Request Trekker
                    </Button>
                  </>
                )}
                {user.role === "Driver" && (
                  <>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      mb={2}
                      w="full"
                      onClick={handleOnTheGoClick}
                    >
                      On the Go
                    </Button>
                  </>
                )}
                <Button colorScheme="teal" variant="solid" mb={2} w="full">
                  Button 2
                </Button>
                <Button colorScheme="teal" variant="solid" w="full">
                  Button 3
                </Button>
              </Box>
            }
          />
        </Routes>
      </VStack>
    </Flex>
  );
};

export default Dashboard;
