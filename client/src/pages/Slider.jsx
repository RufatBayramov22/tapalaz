import { useState } from "react";
import RightIcon from "../assets/images/arrow.png";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null); // Hover zamanı göstəriləcək şəkil

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src={RightIcon} alt="" />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src={RightIcon} className="right" alt="" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      {/* Hover zamanı şəkil dəyişdirilməsi */}
      <div className="bigImage">
        <img
          src={hoveredImage || images[0]} // Hover olunan şəkili göstər
          alt=""
          onClick={() => setImageIndex(0)}
        />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onMouseEnter={() => setHoveredImage(image)} // Hover olunduqda şəkili dəyişdir
            onMouseLeave={() => setHoveredImage(null)} // Hover bitdikdə əsas şəkili geri qaytar
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
