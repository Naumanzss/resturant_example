import { useState, useEffect } from "react";
import { MenuItem } from "@/components/types";
import Typography from "@/components/Typography/Typography";
import { FontVariant } from "@/constants/Font";

interface MenuItemComponentProps {
  item: MenuItem;
  isActive: boolean;
}

const MenuItemComponent = ({ item, isActive }: MenuItemComponentProps) => {
  const [isVisible, setIsVisible] = useState(isActive);
  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
    } else {
      const timeoutId = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isActive]);

  const style = !isVisible ? { display: "none" } : {};
  return (
    <div
      style={style}
      className={`menu-item col-sm-6 col-xs-12 ${
        isActive ? "active" : "inactive"
      }`}
    >
      <div className="clearfix menu-wrapper">
        <Typography variant={FontVariant.subheading}>
          {item.itemName}
        </Typography>
        {/* {item.itemPrice > 0 && (
          <span className="price">{`$${item.itemPrice}`}</span>
        )} */}

        <div className="dotted-bg" />
      </div>
      <Typography>{item.itemDescription}</Typography>
      <Typography>{item.itemSubDescription}</Typography>
    </div>
  );
};
export default MenuItemComponent;
