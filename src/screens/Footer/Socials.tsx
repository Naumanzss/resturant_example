import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Typography from "@/components/Typography/Typography";
import "./styles.css";
import { Color } from "@/constants/Colors";
import { FontVariant } from "@/constants/Font";

const Socials = () => {
  return (
    <div className="footer-section">
      <Typography variant={FontVariant.subheading} color={Color.headingColor}>
        Socials
      </Typography>
      <div>
        <a
          href="https://www.facebook.com/thegrovebing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
        </a>
        <a
          href="https://www.instagram.com/thegrovebing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
      </div>
    </div>
  );
};
export default Socials;
