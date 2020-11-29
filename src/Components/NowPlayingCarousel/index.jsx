import React, { useState, useEffect } from 'react';

import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import service from '../../Services/service';


function NowPlayingCarousel() {
    //const classes = useStyles();
    const [state, setState] = useState({
        carouselMovies: []
    });


    useEffect(() => {
        async function getMovies(moviesToShow) {
            const gottenMovies = await service.query(moviesToShow);
            const fiveRandomMovies = service.getFiveRandomMovies(gottenMovies.results);
            setState((state) => ({ ...state, carouselMovies:[] }));
            // setState((state) => ({ ...state, carouselMovies: Array.from(fiveRandomMovies) }));
        }
        getMovies('latest');
    }, []);


    return (
        <div>
            <Carousel>
                {/* {state.carouselMovies.map((movie, index) => {
                    <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                })} */}
            </Carousel>
        </div>
    );
}

export default NowPlayingCarousel;






