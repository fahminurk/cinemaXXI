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
} from "@chakra-ui/react";
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
import { api } from "../api/api";
import { useEffect } from "react";

export default function MovieDetail({ movie }) {
  return (
    <>
      <Flex flexDir={"column"} w="100vw" maxW="420px">
        <Center flexDir="column" py={"10px"}>
          <Flex gap={5} alignItems={"center"}>
            <Box fontWeight={"bold"} color={"white"} p={"5px"} bg="#005350">
              {movie.rated}
            </Box>
            <Box>
              <Box fontWeight={"bold"} textTransform={"uppercase"}>
                {movie?.title}
              </Box>
              <Box> {movie?.genre}</Box>
            </Box>
          </Flex>

          <Box w="364px" paddingTop={"10px"}>
            <hr />
          </Box>
        </Center>

        <Flex
          padding="20px"
          paddingTop={"10px"}
          gap="20px"
          w="100vw"
          maxW="420px"
        >
          <Image src={movie.image_url} w="170px" h="254px" />

          <Center w="100%" alignItems={"start"} fontSize={"14px"}>
            <Flex flexDir="column" gap="10px">
              <Flex gap="3px">
                <Center>
                  <FaClock />
                </Center>
                {movie.duration}
              </Flex>

              <Center
                border="1px solid #005350"
                w="90px"
                borderRadius={"5px"}
                fontWeight={"600"}
                color="#005350"
                padding="5px 10px"
              >
                IMAX 2D
              </Center>

              <Center
                border="1px solid #005350"
                w="150px"
                borderRadius={"5px"}
                fontWeight={"600"}
                bgColor="#006666"
                color="white"
                padding="5px 10px"
              >
                PLAYING AT
              </Center>

              <Link to={`/movies/${movie.id}/theaters/theater`}>
                <Center
                  border="1px solid #005350"
                  w="150px"
                  borderRadius={"5px"}
                  fontWeight={"600"}
                  bgColor="#006666"
                  color="white"
                  padding="5px 10px"
                  cursor="pointer"
                >
                  BUY TICKET
                </Center>
              </Link>

              <Center
                border="1px solid #005350"
                w="150px"
                borderRadius={"5px"}
                fontWeight={"600"}
                bgColor="#006666"
                color="white"
                padding="5px 10px"
              >
                TRAILER
              </Center>
            </Flex>
          </Center>
        </Flex>
        <Flex flexDir={"column"} padding="20px" gap="10px">
          {movie?.description}

          <Flex flexDir={"column"}>
            <b>Producer</b>
            <span> {movie?.producer}</span>
          </Flex>
          <Flex flexDir={"column"}>
            <b>Director</b>
            <span>{movie?.director}</span>
          </Flex>
          <Flex flexDir={"column"}>
            <b>Writer</b>
            <span>{movie?.writer}</span>
          </Flex>
          <Flex flexDir={"column"}>
            <b>Cast</b>
            <span>{movie?.cast}</span>
          </Flex>
          <Flex flexDir={"column"}>
            <b>Distributor</b>
            <span>{movie?.distributor}</span>
          </Flex>
          <Flex flexDir={"column"}>
            <b>Website</b>
          </Flex>
          <Box h={"60px"}></Box>
        </Flex>
      </Flex>
    </>
  );
}
