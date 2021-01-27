import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import './Styles.scss';

function SavedList({ list }) {
  return (
    <Box className='saved-list'>
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName='saved-active'
          >
            <span className='saved-movie'>{movie.title}</span>
          </NavLink>
        );
      })}
      <Box className='saved-list-button-container'>
        <Button variant='outlined' className='add-movie-button'>
          <Link to='/new-movie'>Add Movie</Link>
        </Button>
        <Button variant='outlined' className='home-button'>
          <Link to='/'>Home</Link>
        </Button>
      </Box>
    </Box>
  );
}

export default SavedList;
