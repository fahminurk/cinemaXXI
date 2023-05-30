import {
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { FaLock, FaPhone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useEffect, useState } from "react";

export default function ChangePasswordPage() {
  //forget pass
  const location = useLocation();
  const [user, setUser] = useState([]);
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const nav = useNavigate();

  async function fetchUser(token) {
    await api
      .get("/users/v3", {
        params: {
          token,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }

  async function changePassword() {
    await api
      .patch("/users/forgotPassword?token=" + token, {
        user,
      })
      .then((res) => {
        alert(res.data.message);
      });
    nav("/login");
  }

  useEffect(() => {
    const tempToken = location.pathname.split("/")[2];
    fetchUser(tempToken);
    setToken(tempToken);
  }, []);

  function inputHandler(e) {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
  }

  return (
    <>
      {user.id ? (
        <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
          <Center fontWeight={"bold"} padding="10px">
            Change New Password
          </Center>
          <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
            <InputGroup h="34px">
              <InputLeftAddon
                bgColor="#eee"
                padding={"6px 12px"}
                color="#555"
                border="1px solid #ccc"
              >
                <FaLock fontSize="16px" />
              </InputLeftAddon>
              <Input
                padding={"6px 12px"}
                type="password"
                maxLength={"6"}
                placeholder="6 digits Number"
                border="1px solid #ccc"
                w="100vw"
                maxW="355px"
                id="password"
                onChange={inputHandler}
              />
            </InputGroup>
          </Stack>

          <Flex
            justifyContent={"space-between"}
            w="100%"
            padding="10px"
            paddingBottom="20px"
            flexDir={"column"}
          >
            <Center
              w="100%"
              padding="10px"
              paddingBottom="20px"
              borderBottom={"1px solid #333"}
            >
              <Button
                color="white"
                bgColor={"#006666"}
                border="1px solid #005350"
                padding="6px 12px"
                onClick={changePassword}
              >
                Change Password
              </Button>
            </Center>
          </Flex>
        </Center>
      ) : (
        <Center flexDir={"column"} w="100vw" maxW="420px">
          <Center fontWeight={"bold"} h={"100vh"}>
            Link has expired
          </Center>
        </Center>
      )}
    </>
  );
}

export function ChangePasswordPage2() {
  //changepass di profile
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const [user, setUser] = useState({
    password: "",
  });

  //
  function inputHandler(e) {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
  }

  const editPassword = async () => {
    await api.patch("/users/editPassword/" + userSelector.id, user);

    alert("password berhasil di ganti");
    return nav("/profile");
  };

  return (
    <>
      <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Center fontWeight={"bold"} padding="10px">
          Change Password
        </Center>
        <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaLock fontSize="16px" />
            </InputLeftAddon>
            <Input
              padding={"6px 12px"}
              type="password"
              maxLength={"6"}
              placeholder="6 digits Number"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
            />
          </InputGroup>

          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaLock fontSize="16px" />
            </InputLeftAddon>
            <Input
              padding={"6px 12px"}
              type="password"
              placeholder="Input New Password"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              id="password"
              onClick={inputHandler}
            />
          </InputGroup>
        </Stack>

        <Flex
          justifyContent={"space-between"}
          w="100%"
          padding="10px"
          paddingBottom="20px"
          flexDir={"column"}
        >
          <Center
            w="100%"
            padding="10px"
            paddingBottom="20px"
            borderBottom={"1px solid #333"}
          >
            <Button
              color="white"
              bgColor={"#006666"}
              border="1px solid #005350"
              padding="6px 12px"
              onClick={editPassword}
            >
              Change Password
            </Button>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
