import Typography from "@/components/Typography/Typography";
import { FontVariant } from "@/constants/Font";
import { MenuItem } from "@components/types";

interface MenuItemComponentProps {
  item: MenuItem;
  isActive: boolean;
}

const MenuItemComponent = ({ item, isActive }: MenuItemComponentProps) => {
  const formattedPrice = `$${item.itemPrice.toFixed(2)}`;
  const style = isActive ? {} : { display: "none" };

  return (
    <div style={style} className={`menu-item col-sm-6 col-xs-12 `}>
      <div className="menu-wrapper">
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
