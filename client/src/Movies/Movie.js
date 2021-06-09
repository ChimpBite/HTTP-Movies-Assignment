import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

import Box from '@material-ui/core/Box';

import './Styles.scss';

function Movie({ addToSavedList, updateMovieList, removeMovieFromSavedList }) {
  const [movie, setMovie] = useState(null);
  const { push } = useHistory();
  const params = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const updateMovie = () => {
    push(`/update-movie/${params.id}`);
  };

  const deleteMovie = () => {
    removeMovieFromSavedList(movie);
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(() => {
        updateMovieList();
        push(`/`);
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <Box className='list-wrapper'>
      <MovieCard movie={movie} />
      <Box onClick={() => addToSavedList(movie)}>Save</Box>
      <Box onClick={() => removeMovieFromSavedList(movie)}>
        Remove Movie From Save List
      </Box>
      <Box onClick={updateMovie}>Update Movie</Box>
      <Box onClick={deleteMovie}>Delete Movie</Box>
      <MovieCard movie={movie} />
    </Box>
  );
}

export default Movie;
