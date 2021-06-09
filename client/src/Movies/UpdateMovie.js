import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const UpdateMovie = ({ updateMovieList }) => {
  const [updateMovie, setUpdateMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        const processed = { ...res.data };
        processed.stars = res.data.stars.join(', ');
        setUpdateMovie(processed);
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const updateForm = e => {
    e.persist();
    let value = e.target.value;
    setUpdateMovie({
      ...updateMovie,
      [e.target.name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const processed = { ...updateMovie };
    processed.stars = updateMovie.stars.split(', ');
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, processed)
      .then(res => {
        updateMovieList();
        console.log(params);
        push(`/movies/${params.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (!updateMovie) return <Box>Loading...</Box>;
  return (
    <Box className='update-wrapper'>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit} className='update-form'>
        <TextField
          type='text'
          name='title'
          onChange={updateForm}
          placeholder='Title'
          value={updateMovie.title}
        />
        <Box className='baseline' />

        <TextField
          type='text'
          name='director'
          onChange={updateForm}
          placeholder='Director'
          value={updateMovie.director}
        />
        <Box className='baseline' />

        <TextField
          type='number'
          name='metascore'
          onChange={updateForm}
          placeholder='Metascore'
          value={updateMovie.metascore}
        />
        <Box className='baseline' />

        <TextField
          type='string'
          name='stars'
          onChange={updateForm}
          placeholder='Stars'
          value={updateMovie.stars}
        />
        <Box className='baseline' />

        <Button>Submit Update</Button>
      </form>
    </Box>
  );
};

export default UpdateMovie;
