import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  movieCard: {
    maxWidth: 200,
    maxHeight: 300,
    border: 2,
    margin: '10px 5px',
    backgroundImage: props => props.imgUrl,
    backgroundSize: '100% 100%' ,
    backgroundRepeat: 'no-repeat',
  },
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

  function MovieCard(props) {
  const classes = useStyles(props);

  return (
    <Card className={classes.movieCard}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        {props.plot}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;