import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Typed from "typed.js";
import {
  Navigation,
  Autoplay,
  Scrollbar,
  A11y,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles.css";
import Typography from "@/components/Typography/Typography";
import { Color } from "@/constants/Colors";
import { FontVariant } from "@/constants/Font";

interface SectionItem {
  img: string;
  title: string;
  description: string;
}

interface OurSectionProps {
  subheading: string;
  data: SectionItem[];
  typedString: string;
}

const OurSection = ({ subheading, data, typedString }: OurSectionProps) => {
  useEffect(() => {
    const options = {
      strings: [typedString],
      typeSpeed: 200,
      backSpeed: 200,
      loop: true,
      cursorChar: "_",
      shuffle: true,
    };

    const typed = new Typed(`.${typedString.toLowerCase()}Typer`, options);

    return () => {
      typed.destroy();
    };
  }, [typedString]);

  return (
    <div className="section">
      <div className="background-overlay"></div>
      <Typography
        className="section-heading"
        variant={FontVariant.heading}
        color={Color.white}
      >
        OUR <span className={`${typedString.toLowerCase()}Typer typerHeader`} />
      </Typography>
      <Typography
        className="section-subheading"
        variant={FontVariant.subheading}
        color={Color.white}
      >
        {subheading}
      </Typography>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, A11y]}
        spaceBetween={-440}
        slidesPerView={3}
        navigation={false}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            navigation: false,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: -440,
          },
        }}
        className="section-swiper"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="card">
              <img src={item.img} alt={item.title} className="image" />
              <div className="details">
                <Typography className="title" variant={FontVariant.title}>
                  {item.title}
                </Typography>
                <Typography className="description">
                  {item.description}
                </Typography>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurSection;
