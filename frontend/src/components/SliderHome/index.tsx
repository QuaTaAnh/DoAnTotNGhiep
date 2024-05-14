import React from "react";
import Slider from "react-slick";

const SliderHome: React.FC = () => {
  const images = [{ imageUrl: "", navigate: "" }];
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.imageUrl}
            style={{ width: "100%", height: "500px" }}
            alt={`Image ${index}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default SliderHome;
