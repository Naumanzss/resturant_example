import { useRef, useEffect, useState } from "react";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import AboutSection from "./components/AboutSection/AboutSection";
import Menu from "./components/Menu/Menu";
import CustomersReview from "./components/CustomersReview/CustomersReview";
import TableReservation from "./components/TableReservations/TableReservation";
import HappyHour from "./components/HappyHour";
import { OurFavorites, OurSpecials } from "./components/OurSection";
import { getEvents, getMenu, getReservation } from "@/store/api";

// import Snowfall from "./SnowFall";

const Home = () => {
  const tableReservationRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState([]);
  const [menu, setMenu] = useState([]);
  const [reservationFull, setReservationFull] = useState([]);

  const scrollToTableReservation = () => {
    if (tableReservationRef.current !== null) {
      tableReservationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    getEvents()
      .then((response) => {
        if (response && Array.isArray(response.event)) {
          setEvents(response.event);
        } else {
          console.error("Fetched data is not an array:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });

    getMenu()
      .then((response) => {
        if (response && Array.isArray(response.menuItem)) {
          const processedMenu = response.menuItem.map((item: any) => ({
            ...item,
            itemCategory: Array.isArray(item.itemCategory)
              ? item.itemCategory.map((cat: any) => cat.toLowerCase()) // Lowercase each category if it's an array
              : item.itemCategory.toLowerCase(), // Lowercase directly if it's a string
          }));
          setMenu(processedMenu);
        } else {
          console.error("Fetched data is not an array:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
    getReservation()
      .then((response) => {
        if (response && Array.isArray(response.reservationFull)) {
          setReservationFull(response.reservationFull);
        } else {
          console.error("Fetched data is not an array:", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  return (
    <div>
      {/* <Snowfall numberOfFlakes={80} /> */}
      <HeroBanner events={events} />
      <HappyHour />
      <AboutSection />
      <OurFavorites />
      <Menu menuItems={menu} />
      <OurSpecials />
      <div ref={tableReservationRef}>
        <TableReservation reservationItems={reservationFull} />
      </div>
      <CustomersReview />
      <button className="book-table-btn" onClick={scrollToTableReservation}>
        Book A Table
      </button>
    </div>
  );
};

export default Home;
