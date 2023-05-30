import { Box, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function TheaterPage() {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    fetchTheater();
  }, []);

  async function fetchTheater() {
    await api.get("/theaters").then((res) => {
      console.log(res.data);
      setTheaters(res.data);
    });
  }

  return (
    <>
      <Box paddingBottom={"80px"}>
        <Input
          w="100vw"
          textAlign={"center"}
          maxW="420px"
          placeholder="type a city to search"
          variant={"unstyled"}
          padding="10px"
          border="1px solid white"
          color="rgb(0,83,80)"
          sx={{
            _focus: {
              border: "2px solid #DD9F20",
            },
          }}
          borderRadius={"0"}
        ></Input>

        <Box>
          {theaters?.map((val, idx) => (
            <Box
              w="100%"
              padding="10px 15px"
              border="1px solid #EBEBEB"
              color={"black"}
            >
              {val.name}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
