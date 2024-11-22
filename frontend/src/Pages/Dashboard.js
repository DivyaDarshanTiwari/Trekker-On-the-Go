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
  List,
  ListItem,
  Spinner,
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
import Notifications from "./Notification";
import NotificationBadge from "./NotificationBadge";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [availableTrekkers, setAvailableTrekkers] = useState([]);
  const [availableStudents, setAvailableStudents] = useState({});
  const [loading, setLoading] = useState(false);
  const [showTrekkers, setShowTrekkers] = useState(false);
  const [showStudent, setShowStudent] = useState(false);
  const [trekkerStatus, setTrekkerStatus] = useState(null);
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
    //checking if trekker is already at college
    if(trekkerStatus === "OnTheGo" || trekkerStatus === "AtCollege") {
      toast({
        title: "Action not allowed",
        description: "You are already on the way to college or at the college.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const driverToken = localStorage.getItem("token");
      console.log(driverToken);
      console.log("trekker id: " + user.LicensePlate);
      const response = await axios.post(
        "http://localhost:5000/driver/trekker-go-up",
        {
          role: "driver",
          trekkerId: user.LicensePlate,
        },
        {
          headers: { Authorization: `Bearer ${driverToken}` },
        }
      );
      if (response.data) {
        setTrekkerStatus("OnTheGo");
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

  const handleOnTheGoFromCollegeClick = async () => {
    if(trekkerStatus === "FromCollege" || trekkerStatus === "OnTheGo") {
      toast({
        title: "Action not allowed",
        description: "You are already on the way from college.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const driverToken = localStorage.getItem("token");
      console.log(driverToken);
      console.log("trekker id: " + user.LicensePlate);
      const response = await axios.post(
        "http://localhost:5000/driver/trekker-go-down",
        {
          role: "driver",
          trekkerId: user.LicensePlate,
        },
        {
          headers: { Authorization: `Bearer ${driverToken}` },
        }
      );
      if (response.data) {
        setTrekkerStatus("FromCollege")
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

  const handleReachedCollegeClick = async () => {
    if(trekkerStatus === "AtCollege" || trekkerStatus === "FromCollege") {
      toast({
        title: "Action not allowed",
        description: "You are at college gate.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const driverToken = localStorage.getItem("token");
      console.log(driverToken);
      const response = await axios.post(
        "http://localhost:5000/driver/reached-college",
        {
          role: "driver",
          trekkerId: user.LicensePlate,
        },
        {
          headers: { Authorization: `Bearer ${driverToken}` },
        }
      );
      if (response.data) {
        setTrekkerStatus("AtCollege");
        toast({
          title: "Success",
          description: "Message broadcasted: Driver has reached the College.",
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

  const handleReqStudentNumberClick = async () => {
    try {
      const driverToken = localStorage.getItem("token");
      console.log(driverToken);
      const response = await axios.post(
        "http://localhost:5000/driver/available-students",
        {
          role: "driver",
        },
        {
          headers: { Authorization: `Bearer ${driverToken}` },
        }
      );
      setAvailableStudents(response.data.availableStudents);
      setShowStudent(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleReqTrekkerClick = async () => {
    const requestTime = new Date().toISOString(); //getting real-time for request
    const passengerToken = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:5000/passenger/request-trekker",
        {
          Id: user.SAP_DL_ID,
          name: user.name,
          requestTime: requestTime,
          role: "passenger",
        },
        {
          headers: { Authorization: `Bearer ${passengerToken}` },
        }
      );
      if (response) {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }

      //fetching number of students waiting
      const studentResponse = await axios.post(
        "http://localhost:5000/driver/available-students",
        {
          role: "driver",
        },
        {
          headers: { Authorization: `Bearer ${passengerToken}` },
        }
      );

      // Update the state with the available students and show the student section
      setAvailableStudents(studentResponse.data.availableStudents);
      setShowStudent(true);
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

  const handleShowAvailableTrekkersClick = async () => {
    setLoading(true);
    setShowTrekkers(false);
    try {
      const passengerToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/driver/available-trekkers",
        {
          role: "driver",
          trekkerId: user.LicensePlate,
        },
        {
          headers: { Authorization: `Bearer ${passengerToken}` },
        }
      );
      setAvailableTrekkers([]); //resetting for managing duplicancy of trekker id
      setAvailableTrekkers(response.data.availableTrekkers);
      setShowTrekkers(true);
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to load available trekkers.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudentClick = async() => {
    try {
      const driverToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/driver/add-student-to-trekker",
        {
          role: "driver",
          trekkerId: user.LicensePlate,
        },
        {
          headers: { Authorization: `Bearer ${driverToken}` }
        }
      );

      if (response.data) {
        toast({
          title: "Success",
          description: `Student added successfully!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description:
          error.response?.data?.message ||
          "Failed to add student. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRemoveStudentClick = async() => {
    try {
      const driverToken = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/driver/remove-student-from-trekker",
        {
          role: "driver",
          trekkerId: user.LicensePlate,
        },
        {
          headers: { Authorization: `Bearer ${driverToken}` }
        }
      );

      if (response.data) {
        toast({
          title: "Success",
          description: `Student removed successfully!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description:
          error.response?.data?.message ||
          "Failed to add student. Please try again.",
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
          <Divider orientation="vertical" borderColor="teal.400" h="24px" />
          <Link
            as={RouterLink}
            to="/dashboard/notification"
            fontWeight="bold"
            _hover={{ textDecoration: "none", color: "teal.200" }}
            display="flex"
            alignItems="center"
          >
            <Icon as={FaBell} mr={2} />
            Notifications
            <NotificationBadge />
          </Link>
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
                      On the Go to College
                    </Button>
                  </>
                )}
                {user.role === "Passenger" && (
                  <>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      mb={2}
                      w="full"
                      onClick={handleShowAvailableTrekkersClick}
                    >
                      Show Available Trekkers
                    </Button>
                  </>
                )}

                {loading ? (
                  <Spinner size={"lg"} />
                ) : (
                  showTrekkers && (
                    <Box mt={4} w={"full"}>
                      <Text fontWeight={"bold"} mb={2}>
                        Available Trekkers
                      </Text>
                      <List spacing={2}>
                        {availableTrekkers.length > 0 ? (
                          availableTrekkers.map(({trekkerId, availableSeats}, index) => (
                            <ListItem key={index}>
                              {/* Trekker ID: {trekkerId} */}
                              <Text>
                                <strong>Trekker ID: </strong> {trekkerId} <br />
                                <strong>Available Seats: </strong> {availableSeats} <br />
                              </Text>
                            </ListItem>
                          ))
                        ) : (
                          <Text>No Trekkers available right now.</Text>
                        )}
                      </List>
                    </Box>
                  )
                )}
                {user.role === "Driver" && (
                  <>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      mb={2}
                      w="full"
                      onClick={handleOnTheGoFromCollegeClick}
                    >
                      On the Go from College
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
                      onClick={handleReachedCollegeClick}
                    >
                      Reached College
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
                      onClick={handleAddStudentClick}
                    >
                      Add Student to Trekker
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
                      onClick={handleRemoveStudentClick}
                    >
                      Remove Student from Trekker
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
                      onClick={handleReqStudentNumberClick}
                    >
                      Available Students
                    </Button>
                  </>
                )}
                {loading ? (
                  <Spinner size={"lg"} />
                ) : (
                  showStudent && (
                    <Box mt={4} w={"full"}>
                      <Text fontWeight={"bold"} mb={2}>
                        Available Students
                      </Text>
                      <Text>
                        {availableStudents > 0
                          ? `Number of available students: ${availableStudents}`
                          : "No students are available right now."}
                      </Text>
                    </Box>
                  )
                )}
              </Box>
            }
          />
          <Route path="/notification" element={<Notifications />}></Route>
        </Routes>
      </VStack>
    </Flex>
  );
};

export default Dashboard;
