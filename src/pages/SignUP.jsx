import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { register } from "../Redux/action";

const SignUP = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [extrapss, setExtrapass] = useState("");

  // alert functions code starts

  const Accountcreated = () => {
    return toast({
      title: "Account created.",
      position: "top",
      description: "We've created your account for you.",
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

  // alert functions code ends

  useEffect(() => {
    const getusers = () => {
      fetch(`https://my-json-server-uk9r.onrender.com/users`)
        .then((res) => res.json())
        .then((data) => setUsers(data));
    };
    getusers();
  }, []);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isauth = useSelector((state) => state.isauth);

  if (isauth) return <Navigate to="/" />;

  const { name, email, password } = user;

  const handlechange = (e) => {
    const { value, name } = e.target;

    setUser({ ...user, [name]: value });
  };

  const signUpNow = (e) => {
    e.preventDefault();

    if (password === extrapss) {
      if (name !== "" && email !== "" && password !== "") {
        let isPresent = false;

        users.forEach((elem) => {
          if (elem.email === email) isPresent = true;
        });

        if (isPresent) {
          Warning({
            title: "User already exists",
            desc: "Try using another Email or try Sign in",
          });
        } else {
          Accountcreated();
          dispatch(register(user));
          navigate("/signin");
        }
      } else {
        Warning({
          title: "Empty Fields found",
          desc: "All fields are mandotary Please fill all fields",
        });
      }
    } else {
      Warning({ title: "Different Passwords", desc: "Password not matching" });
    }
  };

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
          <Box p="10px" border="1px solid grey" borderRadius={"5px"}>
            <FormControl>
              <Text fontSize="3xl">Create account</Text>
              <FormLabel>Your name</FormLabel>
              <Input
                placeholder="First and last name"
                value={name}
                onChange={handlechange}
                name="name"
              />
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
              <FormHelperText>
                Passwords must be at least 6 characters.
              </FormHelperText>
              <FormLabel>Re-enter password</FormLabel>
              <Input
                type="password"
                value={extrapss}
                onChange={(e) => {
                  setExtrapass(e.target.value);
                }}
              />
              <Button
                mt={"5px"}
                bg="#003953"
                color="white"
                w="100%"
                colorScheme="grey"
                variant="outline"
                onClick={signUpNow}
              >
                CREATE YOUR ZAPPOS ACCOUNT
              </Button>

              <Text>
                Don't have an email address or need additional help? Don't
                worry! Give us a call at{" "}
                <Link color="#003953">(800) 927-7671</Link>
              </Text>
              <Text>
                Registering means you agree to the Zappos{" "}
                <Link color="#003953">terms of use</Link> and{" "}
                <Link color="#003953">privacy policy</Link>
              </Text>
              <Divider />

              <Text>
                Already have an account?<NavLink to="/signin">Sign in</NavLink>
              </Text>
            </FormControl>
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default SignUP;
