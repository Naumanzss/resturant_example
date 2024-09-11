import OurSection from "./OurSection";
import { favorites } from "./dishes";
import { specials } from "./dishes";

const OurFavorites = () => {
  return (
    <OurSection
      subheading="Our most popular and favorite dishes"
      data={favorites}
      typedString="FAVORITES"
    />
  );
};

const OurSpecials = () => {
  return (
    <OurSection
      subheading="Our special and exquisite dishes"
      data={specials}
      typedString="SPECIALS"
    />
  );
};

export { OurFavorites, OurSpecials };
