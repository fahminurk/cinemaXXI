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
  Avatar,
} from "@chakra-ui/react";
import {
  FaBell,
  FaClipboard,
  FaClock,
  FaCreditCard,
  FaGift,
  FaHistory,
  FaLock,
  FaMailBulk,
  FaPersonBooth,
  FaPhone,
  FaSignOutAlt,
  FaTimes,
  FaUpload,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useEffect, useRef, useState } from "react";

export default function Profile() {
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [SelectFile, setSelectFile] = useState(null);
  const inputFileRef = useRef(null);

  const handleFile = (event) => {
    setSelectFile(event.target.files[0]);
    // console.log(event.target.files[0]);
  };
  useEffect(() => {
    if (SelectFile) {
      uploudAvatar();
    }
  }, [SelectFile]);

  async function uploudAvatar() {
    const formData = new FormData();
    formData.append("avatar", SelectFile);
    let user;
    await api
      .post("users/image/avatar/" + userSelector.id, formData)
      .then((res) => {
        user = res.data;
      });

    console.log(user.avatar_url);
    if (user) {
      await dispatch({
        type: "login",
        payload: user,
      });
      alert("berhasil upload");
    }
    setSelectFile(0);
  }

  return (
    <>
      <Flex
        paddingY="30px"
        padding="20px"
        flexDir={"column"}
        w="100vw"
        maxW="420px"
      >
        <Flex justifyContent={"normal"}>
          <Flex paddingX={"10px"} w="100px">
            <Input
              accept="image/png, image/jpeg"
              onChange={handleFile}
              ref={inputFileRef}
              type="file"
              display={"none"}
            />
            <Avatar
              boxSize={"73px"}
              onClick={() => {
                // if (SelectFile) {
                //   uploudAvatar();
                // } else {
                inputFileRef.current.click();
                // }
              }}
              src={"http://localhost:2000/avatar/" + userSelector.avatar_url}
            />
          </Flex>
          <Flex flexDir={"column"} paddingX={"20px"} w="100%">
            <Flex fontWeight={"bold"}>{userSelector.name}</Flex>
            <Flex>{userSelector.handphone}</Flex>
            <Flex>{userSelector.email}</Flex>
          </Flex>
        </Flex>

        <Flex paddingY={"20px"} flexDir={"column"} paddingBottom={"80px"}>
          {/* Top Up */}
          <Flex
            gap="10px"
            w="100%"
            padding="10px"
            border="1px solid #EBEBEB"
            borderTopRadius={"5px"}
            bgColor={"#E6E6E6"}
          >
            <Center>
              <FaCreditCard />
            </Center>
            Top Up M-Tix
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaSignOutAlt />
            </Center>
            Reload Balance
          </Flex>
          {/* //account */}
          <Flex
            gap="10px"
            w="100%"
            padding="10px"
            border="1px solid #EBEBEB"
            borderTopRadius={"5px"}
            bgColor={"#E6E6E6"}
          >
            <Center>
              <FaPersonBooth />
            </Center>
            Account
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaGift />
            </Center>
            My Voucher
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaCreditCard />
            </Center>
            Partner Loyalty Rewards
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaBell />
            </Center>
            Inbox
          </Flex>
          <Link to="/profile/edit">
            <Flex
              gap="10px"
              w="100%"
              padding="10px 20px"
              border="1px solid #EBEBEB"
            >
              <Center>
                <FaPersonBooth />
              </Center>
              Update Profile
            </Flex>
          </Link>

          <Link to="/change-password">
            <Flex
              gap="10px"
              w="100%"
              padding="10px 20px"
              border="1px solid #EBEBEB"
            >
              <Center>
                <FaLock />
              </Center>
              Change PIN/Password{" "}
            </Flex>
          </Link>

          {/* Transaction History */}
          <Flex
            gap="10px"
            w="100%"
            padding="10px"
            border="1px solid #EBEBEB"
            borderTopRadius={"5px"}
            bgColor={"#E6E6E6"}
          >
            <Center>
              <FaClock />
            </Center>
            Transaction History
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaCreditCard />
            </Center>
            Purchase History
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaHistory />
            </Center>
            Top Up History
          </Flex>

          {/* Contact */}
          <Flex
            gap="10px"
            w="100%"
            bgColor={"#E6E6E6"}
            padding="10px"
            border="1px solid #EBEBEB"
          ></Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaPhone />
            </Center>
            Contact Us
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaClipboard />
            </Center>
            Term of Services
          </Flex>
          <Flex
            gap="10px"
            w="100%"
            padding="10px 20px"
            border="1px solid #EBEBEB"
          >
            <Center>
              <FaSignOutAlt />
            </Center>
            <Box
              onClick={() => {
                localStorage.removeItem("user");
                dispatch({
                  type: "logout",
                });
              }}
            >
              Logout{" "}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
