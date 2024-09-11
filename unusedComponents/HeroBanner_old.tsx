import slide1 from "../../../assets/img/homebackground.png";
import slide2 from "../../../assets/img/bullNight.png";
import slide3 from "../../../assets/img/karaoke.png";
import slide4 from "../../../assets/img/bingoNight.png";
import gif2a from "../../../assets/img/bullNight.gif";
import gif3a from "../../../assets/img/karaoke.gif";
import gif4a from "../../../assets/img/bingoNight.gif";

import Slider from "react-slick";
import "../styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroBanner_old = () => {
  // const images = [slide1, slide2, slide3, slide4];
  const images = [
    { img: slide1, gif: "none" },
    { img: slide2, gif: gif2a },
    { img: slide3, gif: gif3a },
    { img: slide4, gif: gif4a },
  ];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  return (
    <div style={{ backgroundColor: "red", top: -10 }}>
      <Slider {...settings}>
        {images.map((item: any, i: any) =>
          item.gif !== "none" ? (
            <div>
              <div className="flex flex-row">
                <div>
                  <img src={item.gif} alt={item.gif} />
                </div>
                <div>
                  <img key={item.img} src={item.img} />
                </div>
              </div>
            </div>
          ) : (
            <img key={item.img} src={item.img} />
          )
        )}
      </Slider>
    </div>
  );
};

export default HeroBanner_old;
