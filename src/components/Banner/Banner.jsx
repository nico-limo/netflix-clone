import React, { useEffect, useState } from "react";
//CSS
import "./Banner.css";
// Local Axios
import axios from "../../api/axios";
import requests from "../../api/Request";

const Banner = () => {
  const [movie, setMovie] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original";

  //Function for truncate the description when is too long
  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };

  //UseEffects
  useEffect(() => {
    async function fetchData() {
      const requestMovies = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        requestMovies.data.results[
          Math.floor(Math.random() * requestMovies.data.results.length - 1)
        ]
      );
      return requestMovies;
    }

    fetchData();
  }, []);
  

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${base_url}${movie?.backdrop_path}')`,
        backgroundPosition: "center",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title"> {movie?.title || movie?.name || movie?.original_name }</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {" "}
          {truncate(movie?.overview , 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
