import { Box, Center } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import cityList from "../pages/CityPage";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      await api.get("/movies/playing").then((res) => {
        console.log(res.data);
        setMovies(res.data);
      });
    } catch (err) {
      console.log(err.message);
      alert("error");
    }
  }

  return (
    <>
      <Box paddingBottom={"10px"}>
        <Link to="/list-city">
          <Center
            flexDir={"column"}
            justifyItems={"normal"}
            position={"sticky"}
            top="48px"
            width={"100vw"}
            maxW="420px"
            border="0px solid white"
            cursor="pointer"
            zIndex={2}
          >
            <Center
              h="45px"
              w="100%"
              justifyContent={"center"}
              letterSpacing={"normal"}
              color={"rgb(0,83,80)"}
              bgColor={"white"}
            >
              <a>
                Theaters in <b>Jakarta </b>
              </a>
            </Center>
          </Center>
        </Link>
        <Box>
          <Carousel />
        </Box>
        <MovieList movies={movies} />
        <Box h={"60px"}></Box>
      </Box>
    </>
  );
}
