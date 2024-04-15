import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Caroussel = () => {
    return (
        <Carousel
            style={{ maxWidth: 600, maxHeight: 400, margin: 'auto' }} 
        >
            <div>
                <img src="https://images.pexels.com/photos/6567538/pexels-photo-6567538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="carousel-image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                <p className="legend">1</p>
            </div>
            <div>
                <img src="https://images.pexels.com/photos/5625008/pexels-photo-5625008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="carousel-image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                <p className="legend">2</p>
            </div>
            <div>
                <img src="https://images.pexels.com/photos/3696755/pexels-photo-3696755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="carousel-image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                <p className="legend">3</p>
            </div>
        </Carousel>
    );
}

export default Caroussel;
