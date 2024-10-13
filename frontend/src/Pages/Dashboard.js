import { VStack, Text, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Get the logged-in user details from your server or session
    axios
      .get("http://localhost:5000/dashboard")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  }, []);

  return (
    <VStack spacing={4} color="black">
      <Text fontSize="2xl">User Dashboard</Text>
      {/* Display user details conditionally based on availability */}
      {user.name && <Box><Text><strong>Name:</strong> {user.name}</Text></Box>}
      {user.email && <Box><Text><strong>Email:</strong> {user.email}</Text></Box>}
      {user.id && <Box><Text><strong>ID:</strong> {user.id}</Text></Box>}
      {user.phone && <Box><Text><strong>Phone:</strong> {user.phone}</Text></Box>}
      {user.role && <Box><Text><strong>Role:</strong> {user.role}</Text></Box>}
      {user.license && user.role === 'Driver' && <Box><Text><strong>License Plate:</strong> {user.license}</Text></Box>}
      {user.capacity && user.role === 'Driver' && <Box><Text><strong>Capacity:</strong> {user.capacity}</Text></Box>}
    </VStack>
  );
};

export default Dashboard;
