import React, { useState, useEffect } from "react";
import { useParams} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import service from "../../Services/service";

const useStyles = makeStyles((theme) => ({
  actorPage: {
    marginTop: 40,
    color: `white`
  },
  imagesContainer: {
    padding: 20,
    display: `grid`,
    gridTemplateColumns: `repeat(auto-fill, minmax(180px, 1fr))`,
    gridAutoRows: `auto`,
    gridGap: `1rem`,
  },
  imgBackground: {
    display: `flex`,
    justifyContent: `center`,
    paddingTop: 10,
    width: 200,
    height: 300,
    backgroundColor: `white`,
    transition: `transform 0.3s ease 0s`,
    boxShadow: `2px 2px 5px 0px rgba(0,0,0,1)`,
    '&:hover': {
      transform: `translateY(-2px) rotate(1deg)`,
      transition: `transform 0.3s ease 0s`,
    }
  },
  image: {
    width: `90%`,
    height: `90%`
  }
}));

function ActorDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const [state, setState] = useState({
    currActor: null,
    actorImages: []
  });

  useEffect(() => {
    async function getActorById(what, tmdbActorId) {
      const gottenActor = await service.getById(what, tmdbActorId);
      const actorImages = await service.getImages(tmdbActorId);
      Promise.all([gottenActor, actorImages])
      .then((results) => {
          const actor = results[0];
          const actorImageArr = results[1].profiles;
          setState((state) => ({...state, currActor: actor, actorImages: actorImageArr }));
      });    
    } 
    getActorById('actor', id);
  }, [id]);

  const getImgUrl = (imgPath) => {
    return `https://image.tmdb.org/t/p/original${imgPath}`;
  };

  return (
    <div className={classes.actorPage}>
      {state.currActor && <div>
        <div>Actor Name: {state.currActor.name}</div>
          <div className={classes.imagesContainer}>Images:
            {state.actorImages.map((image, index) => (
              <div className={classes.imgBackground}>
                <img className={classes.image} key={index} src={getImgUrl(image.file_path)} alt=""  />
              </div>
            ))}
          </div>
      </div>}
    </div>
  );
}

export default ActorDetails;
