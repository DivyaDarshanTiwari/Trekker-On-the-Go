import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ setTabIndex }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [role, setRole] = useState("Passenger");
  const [LicensePlate, setLicense] = useState("");
  const [maxCapacity, setCapacity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    if (password !== confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const dataPayload = {
        name,
        ID: id, // Corrected field name
        Email,
        phoneNo,
        role,
        password,
      };

      // Add additional fields for Driver role
      if (role === "Driver") {
        dataPayload.LicensePlate = LicensePlate;
        dataPayload.maxCapacity = maxCapacity;
      }

      const { data } = await axios.post(
        "http://localhost:5000/sign_up",
        dataPayload,
        config
      );

      console.log("User Registered Successfully: ", data);
      navigate("/"); // Redirect to login page after successful signup
      setTabIndex(0); // Switch to Login tab after successfully signing up
    } catch (error) {
      console.error("Error during signup: ", error.response.data); // Log the error response for better debugging
      alert(error.response?.data?.msg || "An error occurred during signup.");
    }
  };

  return (
    <VStack spacing={"5px"} color={"black"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="id" isRequired>
        <FormLabel>ID</FormLabel>
        <Input
          placeholder="Enter SAP ID / DL ID"
          onChange={(e) => setId(e.target.value)}
        />
      </FormControl>
      <FormControl id="phone" isRequired>
        <FormLabel>Phone No</FormLabel>
        <Input
          placeholder="Enter Phone No"
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>
      <FormControl as={"fieldset"} isRequired>
        <FormLabel as="legend">Select Your Role</FormLabel>
        <RadioGroup
          defaultValue="Passenger"
          onChange={setRole} // Update role state on change
        >
          <HStack spacing="24px">
            <Radio value="Driver">Driver</Radio>
            <Radio value="Passenger">Passenger</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      {role === "Driver" && (
        <>
          <FormControl id="license" isRequired>
            <FormLabel>License Plate No</FormLabel>
            <Input
              placeholder="Enter License Plate No"
              onChange={(e) => setLicense(e.target.value)}
            />
          </FormControl>
          <FormControl id="capacity" isRequired>
            <FormLabel>Maximum Capacity</FormLabel>
            <Input
              placeholder="Enter Maximum Capacity"
              onChange={(e) => setCapacity(e.target.value)}
            />
          </FormControl>
        </>
      )}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
