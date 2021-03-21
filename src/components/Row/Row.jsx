import React, { useState, useEffect } from "react";
//CSS
import "./Row.css";
//Axios
import axios from "../../api/axios";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original";

    //useEffects
    useEffect(() => {
        async function fetchData() {
            const requestMovies = await axios.get(fetchUrl);
            setMovies(requestMovies.data.results);
            return requestMovies;
        }
        fetchData();
    }, [fetchUrl]);
    console.log(movies);
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                className={`row__poster ${
                                    isLargeRow && "row__posterLarge"
                                }`}
                                src={`${base_url}${
                                    isLargeRow
                                        ? movie.poster_path
                                        : movie.backdrop_path
                                }`}
                                key={movie.id}
                                alt={movie.name}
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default Row;
