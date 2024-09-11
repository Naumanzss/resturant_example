import Typography from "@/components/Typography/Typography";
import "./styles.css";
import { Color } from "@/constants/Colors";
import { FontVariant } from "@/constants/Font";

const WorkingHours = () => {
  return (
    <div className="footer-section">
      <Typography variant={FontVariant.subheading} color={Color.headingColor}>
        WORKING HOURS
      </Typography>
      <Typography color={Color.white}>
        Kitchen: 11:00 am to 10:30 pm Weekdays
      </Typography>
      <Typography color={Color.white}>
        Kitchen: 11:00 am to 1:00 am on Weekends
      </Typography>
      {/* <Typography color={Color.white}>
        Bar: 11:00 am to 1:00 am on Weekdays
      </Typography>
      <Typography color={Color.white}>
        Bar: 11:00 am to 3:00 am on Weekends
      </Typography> */}
    </div>
  );
};
export default WorkingHours;
