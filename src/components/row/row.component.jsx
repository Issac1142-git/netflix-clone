import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./row.styles.css";

const row = ({ title, fetchUrl, isLargeRow }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [movies, setMovies] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(fetchUrl);
      // console.log(req);
      setMovies(req.data.results);
      return req;
    };
    fetchData();
  }, [fetchUrl]);

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${baseUrl}${movie.poster_path}`}
            alt={movie.title}
            className={`row_poster ${isLargeRow && "poster_large"}`}
          ></img>
        ))}
      </div>
    </div>
  );
};

export default row;
