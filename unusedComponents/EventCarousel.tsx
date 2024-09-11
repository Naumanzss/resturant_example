import gif2a from "../../../assets/img/bullNight.gif";
import gif3a from "../../../assets/img/karaoke.gif";
import "../styles.css"; // Your stylesheet path
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const EventCarousel = () => {
  const events = [
    {
      title: "Bull Riding",
      description:
        "Come visit our bull riding eventCome visitiding eventCome visitiding eventCome visitiding eventCome visitiding eventCome visitiding eventCome visitiding eventCome visitiding eventCome visit our bull riding eventCome visit our bull riding eventCome visit our bull riding eventCome visit our bull riding eventCome visit our bull riding eventCome visit our bull riding eventCome visit our bull riding eventCome visit our bull riding event.",
      gif: gif2a,
    },
    {
      title: "Karaoke Night",
      description: "Join",
      gif: gif3a,
    },
  ];

  return (
    <div className="events-section">
      <div className="background-overlay"></div>
      <h2 className="events-heading">UPCOMING EVENTS</h2>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, A11y]}
        scrollbar={{ draggable: true }}
        navigation={false}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="custom-swiper"
      >
        <div className="events-container">
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="events-card">
                <img src={event.gif} alt="Event" className="events-image" />
                <div className="events-content">
                  <h4 className="events-title">{event.title}</h4>
                  <p className="events-description">{event.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default EventCarousel;
