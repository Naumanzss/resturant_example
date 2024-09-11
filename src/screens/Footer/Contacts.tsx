import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Typography from "@/components/Typography/Typography";
import "./styles.css";
import { Color } from "@/constants/Colors";
import { FontVariant } from "@/constants/Font";

const Contacts = () => {
  return (
    <div className="footer-section">
      <Typography variant={FontVariant.subheading} color={Color.headingColor}>
        Contact
      </Typography>
      <Typography className="icon-text">
        <a
          href="https://www.google.com/maps/place/65+Court+St,+Binghamton,+NY+13901"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLocationDot} className="icon" />
          65 Court St, Binghamton, NY 13901
        </a>
      </Typography>
      <Typography className="icon-text">
        <a href="tel:+16072381729">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          (607) 238-1729
        </a>
      </Typography>
      <Typography className="icon-text">
        <a href="mailto:thegrovebing@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          thegrovebing@gmail.com
        </a>
      </Typography>
    </div>
  );
};
export default Contacts;
