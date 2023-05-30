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
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import moment from "moment/moment";
import {
  FaAddressBook,
  FaAddressCard,
  FaClock,
  FaFaucet,
  FaKey,
  FaLock,
  FaMailBulk,
  FaMailchimp,
  FaPersonBooth,
  FaPhone,
  FaVoicemail,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ModalSelectTicket } from "./Modals";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function TheaterMovie({ movie }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [schedule, setSchedule] = useState([]);
  useEffect(() => {
    fetchSchedule();
  }, []);

  async function fetchSchedule() {
    await api.get("/schedules").then((res) => {
      console.log(res.data);
      setSchedule(res.data);
    });
  }

  return (
    <>
      <Flex
        padding="10px"
        paddingTop={"30px"}
        gap="20px"
        w="100vw"
        maxW="420px"
        flexDir={"column"}
      >
        <Flex w="100%" gap={2}>
          <Image src={movie.image_url} w="180px" h="267px" />

          <Center w="100%" alignItems={"start"} fontSize={"14px"}>
            <Flex flexDir="column" gap="10px">
              <Box fontWeight={"bold"} textTransform={"uppercase"}>
                {movie.title}
              </Box>

              <Flex gap="3px">
                <Center>
                  <FaClock />
                </Center>
                {movie.duration} Minutes
              </Flex>

              <Center
                border="1px solid lightgrey"
                w="90px"
                borderRadius={"5px"}
                color="#005350"
                //    padding="5px 10px"
              >
                IMAX 2D
              </Center>
            </Flex>
          </Center>
        </Flex>
      </Flex>

      <Flex w="100%" padding="10px" flexDir={"column"}>
        {schedule.map((val, idx) => (
          <Box>
            <Flex gap="5px">
              {val.theater.name}
              <Center alignItems={"end"}>
                <Image
                  src="https://m.21cineplex.com/images/logo_imax.png"
                  h="14px"
                ></Image>
              </Center>
            </Flex>

            <Flex justifyContent={"space-between"} padding="14px 20px">
              {val.date}
              <Flex>Rp. {val.price}</Flex>
            </Flex>

            <Flex padding={"5px"} gap="15px">
              <Center
                border="1px solid "
                w="58px"
                borderRadius={"5px"}
                fontWeight={"600"}
                onClick={onOpen}
                cursor="pointer"
              >
                {val.time1}
              </Center>

              <Center
                border="1px solid "
                w="58px"
                borderRadius={"5px"}
                fontWeight={"600"}
                onClick={onOpen}
                cursor="pointer"
              >
                {val.time2}
              </Center>

              <Center
                border="1px solid "
                w="58px"
                borderRadius={"5px"}
                fontWeight={"600"}
                onClick={onOpen}
                cursor="pointer"
              >
                {val.time3}
              </Center>
            </Flex>
            <Box paddingTop={"10px"}>
              <hr />
            </Box>
          </Box>
        ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="80vw" maxW="300px">
          <ModalSelectTicket movie={movie} isOpen={isOpen} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
