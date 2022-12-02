import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { setuser } from "../Redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const isauth = useSelector((state) => state.isauth);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // alert functions code starts

  const LoginSuccess = () => {
    return toast({
      title: "Login Successful",
      position: "top",
      description: "Enjoy Shopping",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const Warning = ({ title, desc }) => {
    return toast({
      title: title,
      position: "top",
      description: desc,
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  const Error = () => {
    return toast({
      title: "Wrong password",
      position: "top",
      description: "Please enter valid password",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  // alerts code ends---------

  useEffect(() => {
    const getusers = () => {
      fetch(`https://my-json-server-uk9r.onrender.com/users`)
        .then((res) => res.json())
        .then((data) => setUsers(data));
    };
    getusers();
  }, []);

  const handlechange = (e) => {
    const { value, name } = e.target;

    setUser({ ...user, [name]: value });
  };
  const { email, password } = user;

  const loginNow = (e) => {
    e.preventDefault();

    if (password !== "" && email !== "") {
      let isPresent = false;

      users.forEach((elem) => {
        if (elem.email === email) isPresent = true;
      });

      if (isPresent) {
        let passwormatch = false;

        users.forEach((elem) => {
          if (elem.password === password) {
            dispatch(setuser(elem));
            passwormatch = true;
          }
        });

        if (passwormatch) {
          LoginSuccess();
          navigate("/");
        } else {
          Error();
        }
      } else {
        Warning({
          title: "User Not exists",
          desc: "Try using another Email or try Creating Account",
        });
      }
    } else {
      Warning({
        title: "Empty Fields found",
        desc: "All fields are mandotary Please fill all fields",
      });
    }
  };

  if (isauth) return <Navigate to="/" />;

  return (
    <>
      <Center>
        <VStack w="25vw" m="20px">
          <Box m={3}>
            <Image
              src="https://m.media-amazon.com/images/G/01/zappos/melody/logo-blue-small._CB485919770_.svg"
              alt="https://m.media-amazon.com/images/G/01/zappos/melody/logo-blue-small._CB485919770_.svg"
            />
          </Box>
          <Box p="25px" border="1px solid grey" borderRadius={"5px"}>
            <FormControl>
              <Text fontSize="3xl">Sign-In</Text>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={handlechange}
                name="email"
              />
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={handlechange}
                name="password"
              />
              <Button
                mt={"20px"}
                bg="#003953"
                color="white"
                w="100%"
                colorScheme="grey"
                variant="outline"
                onClick={loginNow}
              >
                Sign in
              </Button>

              <NavLink to="/signup">
                <Button
                  mt={"20px"}
                  color="#003953"
                  border={"1px solid #003953"}
                  w="100%"
                  colorScheme="grey"
                  variant="outline"
                >
                  CREATE YOUR ZAPPOS ACCOUNT
                </Button>
              </NavLink>
            </FormControl>
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default SignIn;
