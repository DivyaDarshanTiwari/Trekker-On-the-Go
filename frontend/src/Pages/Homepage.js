import {
  Box,
  Container,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Tab,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Homepage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d={"flex"}
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text
          fontSize={"4xl"}
          fontFamily={"Work sans"}
          color={"black"}
          m={"3px 0 0 96px"}
        >
          Trekker On the Go
        </Text>
      </Box>
      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        color={"black"}
        borderWidth={"1px"}
      >
        <Tabs
          variant="soft-rounded"
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Log In</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup setTabIndex={setTabIndex} />{" "}
              {/* Passing setTabIndex to Signup */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
