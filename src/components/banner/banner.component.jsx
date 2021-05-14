import React, { useState, useEffect } from "react";
import axios from "../../axios";
import requests from "../../request";
import "./banner.styles.css";

const banner = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [movie, setMovie] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(requests.fetchNetflixOriginals);
      //   console.log(Math.floor(Math.random * req.data.results.length));
      setMovie(
        req.data.results[
          Math.floor(Math.random() * req.data.results.length - 1)
        ]
      );
      return req;
    };
    fetchData();
  }, []);
  console.log("movie", movie);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadebottom"></div>
    </header>
  );
};

export default banner;
