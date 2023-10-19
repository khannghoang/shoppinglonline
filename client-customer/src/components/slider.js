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
  const mySwiper = {
    width: "1100px",
    height: "400px",
    margin: "40px 0px 40px",
    marginLeft:"170px"
  }
  const banner = {
    width: "1100px",
    height: "400px",
  }
  const imageStyle = {
    width: "1100px",
    height: "400px",
     // Sử dụng object-fit để hiển thị hình ảnh và co giãn tỉ lệ
  };

  return (
    <div style={mySwiper}>
      <Slider {...settings}>
        <div style={banner}>
          <img
            src="https://i.pinimg.com/originals/8e/f7/26/8ef726ffe903afa19aa545e23f3b9c72.png"
            alt="Image 1"
            style={imageStyle}
          />
        </div>
        <div style={banner}>
          <img
            src="https://cdn.shopify.com/s/files/1/1043/3082/files/Web_banner_CNY.jpg?v=1641868757"
            alt="Image 2"
            style={imageStyle}
          />
        </div>
        <div style={banner}>
          <img
            src="https://insite.browntextbook.com/SiteImages/110-SchoolImages/110-TechCenter/110-MacBook%20Air%20M2%20(Jul22)%20Hero%20Space.png"
            alt="Image 3"
            style={imageStyle}
          />
        </div>
      </Slider>
    </div>
  );
}

export default MySlider;
