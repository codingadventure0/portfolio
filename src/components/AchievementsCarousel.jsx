import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/carousel.css';

const AchievementsCarousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = React.useRef(null);

  // Auto-play settings
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        sliderRef.current.slickNext();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div 
      className="achievements-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Slider {...settings} ref={sliderRef}>
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="carousel-slide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="slide-content">
              <motion.img
                src={img.src}
                alt={img.alt}
                className="achievement-image"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {/* {img.caption && (
                <motion.div
                  className="caption"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3>{img.caption.title}</h3>
                  <p>{img.caption.description}</p>
                </motion.div>
              )} */}
            </div>
          </motion.div>
        ))}
      </Slider>

      
      <motion.button
        className="nav-arrow prev"
        onClick={() => sliderRef.current.slickPrev()}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </motion.button>
      <motion.button
        className="nav-arrow next"
        onClick={() => sliderRef.current.slickNext()}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </motion.button>
    </div>
  );
};

export default AchievementsCarousel;