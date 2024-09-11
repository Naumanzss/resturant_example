import { useEffect } from "react";
import Typed from "typed.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
// import { events } from "./events";
import Typography from "@/components/Typography/Typography";
import { Color } from "@/constants/Colors";
import { FontVariant } from "@/constants/Font";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import bullNightGif from "@img/bullNight.gif";
import karaoke from "@img/karaoke.gif";
import "./styles.css";
import { getImageUrl } from "@/store/api";

type EventAssetKey = keyof typeof imageMap;

interface Event {
  _id: string;
  eventTitleName: string;
  eventDescription: string;
  eventAsset: EventAssetKey;
  __v?: number;
}
interface HeroBannerProps {
  events: Event[];
}
const imageMap: { [key: string]: string } = {
  bullNight: bullNightGif,
  karaoke: karaoke,
};

const HeroBanner = ({ events }: HeroBannerProps) => {
  useEffect(() => {
    const options = {
      strings: ["EVENTS"],
      typeSpeed: 200,
      backSpeed: 200,
      loop: true,
      cursorChar: "_",
      shuffle: true,
    };
    const typed = new Typed(".typer", options);
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="hero-banner">
      <div className="overlay">
        <Typography
          className="events-heading"
          variant={FontVariant.heading}
          color={Color.white}
        >
          UPCOMING <span className="typer typerHeader" />
        </Typography>
        <Typography
          className="events-subheading"
          variant={FontVariant.subheading}
          color={Color.white}
        >
          Our exciting entertainment
        </Typography>
        <Swiper
          modules={[Navigation, Autoplay, Pagination, A11y]}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="custom-swiper-banner"
        >
          <div className="events-container">
            {events.map((event, index) => (
              <SwiperSlide key={index}>
                <div className="events-card">
                  <img
                    src={getImageUrl(event.eventAsset)}
                    alt="Event"
                    className="events-image"
                  />
                  <div className="events-content">
                    <Typography
                      className="events-title"
                      variant={FontVariant.title}
                    >
                      {event.eventTitleName}
                    </Typography>
                    <Typography className="events-description">
                      {event.eventDescription}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroBanner;
