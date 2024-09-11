import React, { useRef, useState, useEffect } from "react";
import {
  FaCoffee,
  FaHamburger,
  FaUtensils,
  FaList,
  FaBars,
  FaSeedling,
  FaWineBottle,
  FaIceCream,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./styles.css";
import Typography from "../Typography/Typography";
import { FontVariant } from "@/constants/Font";

interface HomeMenuHeaderProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryMapping: { [key: string]: string };
}
type DisplayCategories = {
  [key: string]: JSX.Element;
};
const HomeMenuHeader: React.FC<HomeMenuHeaderProps> = ({
  activeCategory,
  onCategoryChange,
  categoryMapping,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  let displayCategories: DisplayCategories = {
    Starters: <FaSeedling />,
    Brunch: <FaCoffee />,
    Lunch: <FaUtensils />,
    Dinner: <FaWineBottle />,
    Desserts: <FaIceCream />,
  };

  if (!isHomePage) {
    displayCategories = { All: <FaList />, ...displayCategories };
  }
  const [isVisible, setIsVisible] = useState(false);
  const aboutSubtitleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6, rootMargin: "150px" }
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
    <div className="menu-header">
      <div
        className={`menu-title ${isVisible ? "active" : ""}`}
        ref={aboutSubtitleRef}
      >
        <Typography variant={FontVariant.heading} marginTop="20px">
          {isHomePage ? "Most Popular Items" : "Menu"}
        </Typography>
        <Typography className="menu-subtitle" variant={FontVariant.subheading}>
          The fine food and drinks that we serve.
        </Typography>
      </div>
      <div className="menu-filters">
        {Object.entries(displayCategories).map(([displayCategory, Icon]) => (
          <div
            key={displayCategory}
            className={`filter-option ${
              activeCategory === categoryMapping[displayCategory]
                ? "active"
                : ""
            }`}
            onClick={() =>
              onCategoryChange(
                categoryMapping[displayCategory] || displayCategory
              )
            }
          >
            {Icon}
            <span>{displayCategory}</span>
            {activeCategory ===
              (categoryMapping[displayCategory] || displayCategory) && (
              <div className="active-underline"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeMenuHeader;
