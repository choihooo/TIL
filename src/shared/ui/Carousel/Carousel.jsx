import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.scss";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        <div className={styles.carousel__item}>
          <img src="/images/default.png" alt="Banner 1" />
        </div>
        <div className={styles.carousel__item}>
          <img src="/images/banner2.jpeg" alt="Banner 2" />
        </div>
        <div className={styles.carousel__item}>
          <img src="/images/banner3.jpeg" alt="Banner 3" />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
