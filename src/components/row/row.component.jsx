import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./row.styles.css";
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const row = ({ title, fetchUrl, isLargeRow }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [movies, setMovies] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [trailerUrl, setTrailerUrl] = useState('')
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
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = movie => {
    console.log(movie);
    if(trailerUrl){
      setTrailerUrl("")
    }else{
     movieTrailer(movie?.name || movie?.title || "")
     .then(url => {
       console.log("url", url);
       const urlParams = new URLSearchParams(new URL(url).search)
       setTrailerUrl(urlParams.get('v'))
     }).catch(err => console.log(err))
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick = {() => handleClick(movie)}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
            className={`row_poster ${isLargeRow && "poster_large"}`}
          ></img>
        ))}
      </div>
     { trailerUrl && <Youtube videoId = {trailerUrl} opts = {opts}/>}
    </div>
  );
};

export default row;
