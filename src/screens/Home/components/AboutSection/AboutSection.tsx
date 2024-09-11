import { useState, useEffect, useRef } from "react";
import foodAboutUs from "@img/food/food_about_us.jpg";
import "./styles.css";
import Typography from "@/components/Typography/Typography";
import { Color } from "@/constants/Colors";
import { FontVariant } from "@/constants/Font";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutSubtitleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6, rootMargin: "-150px" }
    );

    if (aboutSubtitleRef.current) {
      observer.observe(aboutSubtitleRef.current);
    }

    return () => {
      if (aboutSubtitleRef.current) {
        observer.unobserve(aboutSubtitleRef.current);
      }
    };
  }, [aboutSubtitleRef]);

  return (
    <div className="about-section">
      <div className="about-content">
        <Typography className="about-title" variant={FontVariant.heading}>
          About Us
        </Typography>
        <Typography
          className={`about-subtitle ${isVisible ? "active" : ""}`}
          ref={aboutSubtitleRef}
          variant={FontVariant.subheading}
        >
          The Enchanting Tale of The Grove's Inception
        </Typography>
        <Typography
          className="about-text"
          variant={FontVariant.small}
          color={Color.textColor}
        >
          Opening our doors in May of 2022, The Grove is the first and only
          locally owned and operated sit-down American-Halal Fusion dining
          experience in the Triple Cities, specializing in our hand-breaded
          chicken sandwiches and ever-popular wings. We pride ourselves on
          making your experience fun, a standard that is truly upheld by our
          wonderful, personable staff. With enjoyment being the center of your
          time with us, we bring many late-night activities to downtown, such as
          karaoke, trivia, and even a Stock Market Saturday! <br />
          <br />
          We also offer a weekend brunch featuring house bloody Marys and
          bottomless mimosas, as well as nine large televisions throughout so
          you can cheer on your favorite team with us.
        </Typography>
      </div>
      <div className="about-images">
        <img className="about-main" src={foodAboutUs} alt="restaurant image" />
      </div>
    </div>
  );
};

export default AboutSection;
