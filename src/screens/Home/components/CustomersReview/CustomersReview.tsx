import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import "./styles.css";
import Typography from "@/components/Typography/Typography";
import { Color } from "@/constants/Colors";
import { review } from "./review";
import { FontVariant } from "@/constants/Font";

const CustomersReview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const customersReviewRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (customersReviewRef.current) {
      observer.observe(customersReviewRef.current);
    }

    return () => {
      if (customersReviewRef.current) {
        observer.unobserve(customersReviewRef.current);
      }
    };
  }, [customersReviewRef]);

  const generateStars = (rating: any) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        // Full star
        stars.push(<FontAwesomeIcon key={`full-${i}`} icon={fasStar} />);
      } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
        // Half star
        stars.push(<FontAwesomeIcon key={`half-${i}`} icon={faStarHalfAlt} />);
      } else {
        // Empty star
        stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={farStar} />);
      }
    }
    return stars;
  };

  return (
    <div className="customersReview-section">
      <Typography
        className="customersReview-heading"
        variant={FontVariant.heading}
        color={Color.headingColor}
      >
        Customers Say
      </Typography>
      <Typography
        className={`customersReview-subheading ${isVisible ? "active" : ""}`}
        ref={customersReviewRef}
        variant={FontVariant.subheading}
      >
        Their Review
      </Typography>
      <Swiper
        modules={[Navigation, Autoplay, Pagination, A11y]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          // delay: 3500,
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
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 1,
            spaceBetween: 30,
            navigation: false,
          },
        }}
        className="customer-section-swiper"
      >
        {review.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="customersReview-details">
              <Typography
                variant={FontVariant.subheading}
                color={Color.textColor}
              >
                "{review.comment}"
              </Typography>
              <div className="customersReview-stars">
                {generateStars(review.stars)}
              </div>
              <Typography
                className="customersReview-user"
                variant={FontVariant.medium}
              >
                {review.user}
              </Typography>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomersReview;
