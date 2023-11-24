import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// npm install react-slick@latest slick-carousel@latest

function MySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
 

  return (
    <div className='swiperrespon mySwiper scroll-animation' >
      <Slider {...settings}>
        <div className='banner'>
          <img
            src="https://i.imgur.com/wpLAn1y.png"
            alt="Image 1"
            className='imageStyle'
          />
        </div>
        <div className='banner'>
          <img
            src="https://i.imgur.com/5ytUAC3.png"
            alt="Image 2"
            className='imageStyle'
          />
        </div>
        <div className='banner'>
          <img
            src="https://i.imgur.com/qQPHZ8G.png"
            alt="Image 3"
            className='imageStyle'
          />
        </div>
      </Slider>
    </div>
  );
}

export default MySlider;
