import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Styles.scss';

const initialNewMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

const MovieForm = ({ updateMovieList }) => {
  const [newMovie, setNewMovie] = useState(initialNewMovie);
  const { push } = useHistory();

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;

    setNewMovie({
      ...newMovie,
      [e.target.name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const processed = { ...newMovie };
    processed.stars = newMovie.stars.split(', ');
    axios
      .post(`http://localhost:5000/api/movies`, processed)
      .then(res => {
        updateMovieList();
        push(`/movies/${res.data[res.data.length - 1].id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Box className='add-wrapper'>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className='add-form'>
        <TextField
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='Title'
          value={newMovie.title}
        />

        <TextField
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='Director'
          value={newMovie.director}
        />

        <TextField
          type='number'
          name='metascore'
          onChange={changeHandler}
          placeholder='Metascore'
          value={newMovie.metascore}
        />

        <TextField
          type='string'
          name='stars'
          onChange={changeHandler}
          placeholder='Stars'
          value={newMovie.stars}
        />

        <Button>Add New Movie</Button>
      </form>
    </Box>
  );
};

export default MovieForm;
