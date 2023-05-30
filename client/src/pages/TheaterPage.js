import TheaterMovie from "../components/Theater";
import { useLocation } from "react-router-dom";
import { api } from "../api/api";
import { useEffect, useState } from "react";

export default function TheaterMoviePage() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [movie, setMovie] = useState([]);
  const [theater, setTheater] = useState([]); //--
  const idTheater = location.pathname.split("/")[4]; //--

  useEffect(() => {
    fetchMovie();
    // fetchTheater();
  }, []);

  async function fetchMovie() {
    await api.get("/movies/" + id).then((res) => {
      console.log(res.data);
      setMovie(res.data);
    });
  }

  // async function fetchTheater() {
  //   await api.get("/theaters").then((res) => {
  //     console.log(res.data);
  //     setTheater(res.data);
  //   });
  // }

  return (
    <>
      <TheaterMovie movie={movie} />
    </>
  );
}
