import Typography from "@/components/Typography/Typography";
import "../styles.css";
import { Color } from "@/constants/Colors";
import { FontVariant } from "@/constants/Font";

const HappyHour = () => {
  return (
    <div className="happyHour-div">
      {/* <Typography
        className="happyHour-h1"
        variant={FontVariant.heading}
        color={Color.black}
        marginTop="20px"
      >
        HAPPY HOUR EVERYDAY FROM 9-11PM
      </Typography> */}

      {/* <Typography
        className="happyHour-h2"
        variant={FontVariant.subheading}
        color={Color.black}
      >
        NIGHTCLUB ON WEEKENDS AFTER 11PM
      </Typography> */}
    </div>
  );
};

export default HappyHour;
