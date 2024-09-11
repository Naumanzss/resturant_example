import { useState, useEffect } from "react";
import MenuHeader from "@/components/MenuHeader/MenuHeader";
import { categoryMapping } from "./menuItems";
import MenuItemComponent from "./MenuItemComponent";
import { getMenu } from "@/store/api";
import { MenuItem } from "@/components/types";
import "./styles.css";

interface ActiveItems {
  [key: string]: boolean;
}

const AllMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(
    categoryMapping["All"]
  );
  const [activeItems, setActiveItems] = useState<ActiveItems>(
    menuItems.reduce((acc, item, index) => {
      acc[index] = true;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  useEffect(() => {
    getMenu().then((data) => {
      console.log("data@", data);
      if (data && Array.isArray(data.menuItem)) {
        console.log("data", data.menuItem);
        const processedMenu = data.menuItem.map((item: any) => ({
          ...item,
          itemCategory: Array.isArray(item.itemCategory)
            ? item.itemCategory.map((cat: any) => cat.toLowerCase()) // Lowercase each category if it's an array
            : item.itemCategory.toLowerCase(), // Lowercase directly if it's a string
        }));
        setMenuItems(processedMenu);
        // Initialize activeItems based on fetched data
        const initialActiveItems = data.menuItem.reduce(
          (acc: { [key: string]: boolean }, item: MenuItem) => {
            acc[item._id] = true;
            return acc;
          },
          {}
        );
        setActiveItems(initialActiveItems);
      }
    });
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === "all") {
      setActiveItems(
        menuItems.reduce((acc, item) => {
          acc[item._id] = true;
          return acc;
        }, {} as ActiveItems)
      );
    } else {
      setActiveItems((currentItems) =>
        Object.keys(currentItems).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {} as ActiveItems)
      );

      setTimeout(() => {
        setActiveItems(
          menuItems.reduce((acc, item) => {
            acc[item._id] = item.itemCategory.includes(newCategory);
            return acc;
          }, {} as ActiveItems)
        );
      }, 500);
    }
    setActiveCategory(newCategory);
  };

  return (
    <section className="menu">
      <div className="container">
        <MenuHeader
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          categoryMapping={categoryMapping}
        />
        <div className="row menu-items padding-for-navbar">
          {menuItems.map((item, index) => (
            <MenuItemComponent
              key={item._id}
              item={item}
              isActive={activeItems[item._id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default AllMenu;
