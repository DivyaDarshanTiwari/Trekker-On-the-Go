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

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();
  const [license, setLicense] = useState();
  const [capacity, setCapacity] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();

  const handleClick = () => setShow(!show);

  const submitHandler = () => {};

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
      {/* <FormControl id="role" isRequired>
        <FormLabel>Role (Driver or Passenger)</FormLabel>
        <Input
          placeholder="Enter Role"
          onChange={(e) => setRole(e.target.value)}
        />
      </FormControl> */}
      <FormControl as={"fieldset"}>
        <FormLabel as="legend">Select Your Role</FormLabel>
        <RadioGroup defaultValue="Passenger">
          <HStack spacing="24px">
            <Radio value="Driver">Driver</Radio>
            <Radio value="Passenger">Passenger</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl id="license">
        <FormLabel>License Plate No (for Driver Role)</FormLabel>
        <Input
          placeholder="Enter License Plate No"
          onChange={(e) => setLicense(e.target.value)}
        />
      </FormControl>
      <FormControl id="capacity">
        <FormLabel>Enter Maximum Capacity (for Driver Role)</FormLabel>
        <Input
          placeholder="Enter Maximum Capacity"
          onChange={(e) => setCapacity(e.target.value)}
        />
      </FormControl>
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
