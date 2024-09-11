import Typography from "@/components/Typography/Typography";
import Contacts from "./Contacts";
import Socials from "./Socials";
import WorkingHours from "./WorkingHours";
import "./styles.css";
import { Color } from "@/constants/Colors";

const Footer = () => {
  return (
    <footer className="footer">
      <Contacts />
      <WorkingHours />
      <Socials />
      <div className="footer-bottom">
        <Typography className="footer-bottom-text" color={Color.white}>
          © TheGrove, All Right Reserved
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
