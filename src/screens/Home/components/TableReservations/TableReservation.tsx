import { useState, useEffect, useRef } from "react";
import crispyOnionBurgerImg from "@img/homebackground_new.png";
import "./styles.css";
import Typography from "@/components/Typography/Typography";
import { FontFamily, FontVariant } from "@/constants/Font";
import ReservationForm from "./ReservationForm";
import { ReservationItem } from "@/components/types";

// Define a type for the reservation state
interface TableReservationProps {
  reservationItems: ReservationItem[];
}
const TableReservation = ({ reservationItems }: TableReservationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const reservationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (reservationRef.current) {
      observer.observe(reservationRef.current);
    }

    return () => {
      if (reservationRef.current) {
        observer.unobserve(reservationRef.current);
      }
    };
  }, [reservationRef]);

  return (
    <>
      <div className="table-reservation-container">
        <div className="reservation-form-container">
          <Typography
            variant={FontVariant.heading}
            className="reservation-title"
          >
            Reservation
          </Typography>
          <Typography
            className={`book-table-title ${isVisible ? "active" : ""}`}
            ref={reservationRef}
            variant={FontVariant.subheading}
          >
            Call us to book for Open Bars, Formals, and Private Parties!
          </Typography>
          <ReservationForm
            disabledDates={reservationItems.map(
              (res) => new Date(res.reservationDate)
            )}
          />
        </div>
        <div className="image-container">
          <img src={crispyOnionBurgerImg} alt="Dining table" />
        </div>
      </div>
      <div className="reservation-contact-div">
        <Typography
          className="reservation-contact"
          variant="subheading"
          fontFamily={FontFamily.semiBold}
        >
          You can also call:
          <a href="tel:+16072381729" className="contact-link">
            (607) 238-1729
          </a>
          to make a reservation.
        </Typography>
      </div>
    </>
  );
};

export default TableReservation;
