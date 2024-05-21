import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface Image {
  imageUrl: string;
}

interface ImageDetailProps {
  images: Image[];
  height?: string
  hidden?: boolean
}

const ImageDetail: React.FC<ImageDetailProps> = ({ images = [], height, hidden }) => {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentImageIndex(index),
  };
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const sliderRef = React.useRef<Slider>(null);

  const goToNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Slider ref={sliderRef} {...settings} arrows={false}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.imageUrl}
              style={{ width: "100%", height: height, objectFit: "cover" }}
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </Slider>
      {hidden ? <></> :
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        {images?.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            alt={`Thumbnail ${index}`}
            style={{
              width: "80px",
              height: "80px",
              margin: "0 5px",
              cursor: "pointer",
              border:
                index === currentImageIndex ? "2px solid #fa6819" : "none",
            }}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
      }
      {images.length > 1 && (
        <>
          <IconButton
            aria-label="previous"
            onClick={goToPrevSlide}
            style={{
              position: "absolute",
              top: hidden ? "66%" : "50%",
              left: "10px",
              transform: "translateY(-200%)",
              color: "#fff",
              backgroundColor: hidden ? "#000" : "#fa6819",
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton
            aria-label="next"
            onClick={goToNextSlide}
            style={{
              position: "absolute",
              top: hidden ? "66%" : "50%",
              right: "10px",
              transform: "translateY(-200%)",
              color: "#fff",
              backgroundColor:  hidden ? "#000" : "#fa6819",
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default ImageDetail;
