import { Center, Image } from "@chakra-ui/react";
import XXI_LOGO from "../assets/Cinema-XXI-logo.jpg";
import loading from "../assets/loading.jpg";
export default function Loading(props) {
  return (
    <Center w={"100vw"} h="100vh">
      <Image w="100vw" maxW="200px" src={loading}></Image>
    </Center>
  );
}
