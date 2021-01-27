import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './Styles.scss';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MovieCard = props => {
  const classes = useStyles();
  const { title, director, metascore, stars } = props.movie;
  return (
    <Box className='movie-card'>
      <Box>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              <h2>{title}</h2>
            </Typography>
            <Typography variant='h5' component='h2'>
              Director: <em>{director}</em>
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              Metascore: <strong>{metascore}</strong>
            </Typography>
            <Typography variant='body2' component='p'>
              <h3>Actors:</h3>
              {stars.map(star => (
                <Box key={star} className='movie-star'>
                  {star}
                </Box>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default MovieCard;
