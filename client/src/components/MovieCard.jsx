import { Flex, Image, Box, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function MovieCard(props) {
  return (
    <>
      <Flex
        maxW="100%"
        flexDir={"column"}
        justifyContent={"space-between"}
        boxShadow={"2px 2px 6px 0px rgba(0,0,0,0.3)"}
      >
        <Center flexDir={"column"} w="100%">
          <Link to={`/movies/${props.id}`}>
            <Image
              maxW="100%"
              minH={"290px"}
              src={props.image_url}
              cursor="pointer"
            ></Image>
          </Link>
          <Box h="50px" fontWeight={"600"} fontSize={"12px"} padding="5px">
            {props.title}
          </Box>
        </Center>

        <Center
          gap="10px"
          h="50px"
          color="rgb(0,83,80)"
          fontSize={"12px"}
          alignItems={"normal"}
        >
          <Box border="1px solid #EBEBEB" padding="5px 10px" h="30px">
            {props?.format}
          </Box>
          <Box border="1px solid #EBEBEB" padding="5px 10px" h="30px">
            {props?.rated}
          </Box>
        </Center>
      </Flex>
    </>
  );
}
