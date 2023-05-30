import { Box, Center } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function UpComingPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    await api.get("/movies/up-coming").then((res) => {
      console.log(res.data);
      setMovies(res.data);
    });
  }

  return (
    <>
      <Box paddingBottom={"80px"}>
        <MovieList movies={movies} />
      </Box>
    </>
  );
}
