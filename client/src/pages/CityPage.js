import { Box, Input } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function CityPage() {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    fetchCity();
  }, []);

  async function fetchCity() {
    try {
      await api.get("/cities").then((res) => {
        console.log(res.data);
        setCities(res.data);
      });
    } catch (err) {
      console.log(err.message);
    }
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
          {cities?.map((city, idx) => (
            <Box
              key={city + "_" + idx}
              w="100%"
              padding="10px 15px"
              border="1px solid #EBEBEB"
              color={"black"}
            >
              {city.city}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
