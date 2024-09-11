import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoryMapping } from "./menuItems";
import MenuItemComponent from "./MenuItemComponent";
import Typography from "@/components/Typography/Typography";
import { Color } from "@/constants/Colors";
import { MenuItem } from "@/components/types";
import HomeMenuHeader from "@/components/MenuHeader/HomeMenuHeader";
import "./styles.css";

interface MenuProps {
  menuItems: MenuItem[];
}
interface ActiveItems {
  [key: string]: boolean;
}

const Menu = ({ menuItems }: MenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryMapping["Starters"]
  );

  const [activeItems, setActiveItems] = useState<ActiveItems>({});

  useEffect(() => {
    const showStartersItems = () => {
      const startersCategory = categoryMapping["Starters"];
      const initialActiveItems = menuItems.reduce((acc, item) => {
        acc[item._id] = item.itemCategory.includes(startersCategory);
        return acc;
      }, {} as ActiveItems);
      setActiveItems(initialActiveItems);
    };

    if (menuItems.length > 0) {
      showStartersItems();
    }
  }, [menuItems]);

  const handleCategoryChange = (newCategory: string) => {
    setActiveItems(
      menuItems.reduce((acc, item) => {
        acc[item._id] = item.itemCategory.includes(newCategory);
        return acc;
      }, {} as ActiveItems)
    );
    setActiveCategory(newCategory);
  };

  return (
    <section className="menu">
      <div className="container">
        <HomeMenuHeader
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          categoryMapping={categoryMapping}
        />
        <div className="row menu-items">
          {menuItems.map((item, index) => (
            <MenuItemComponent
              key={item._id}
              item={item}
              isActive={activeItems[item._id]}
            />
          ))}
        </div>
        <div className="menu-footer">
          <Link to="/menu" className="go-to-menu-btn">
            <Typography color={Color.white}>Go to Menu</Typography>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Menu;
