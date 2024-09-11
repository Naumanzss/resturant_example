import React, { SetStateAction, useEffect, useRef, useState } from "react";
import Typography from "@/components/Typography/Typography";
import { PatternFormat } from "react-number-format";
import { getReservation, sendReservationEmail } from "@/store/api";

interface ReservationFormProps {
  disabledDates: Date[];
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  disabledDates,
}: ReservationFormProps) => {
  const [FullName, setFullName] = useState("");
  const [Guests, setGuests] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Time, setTime] = useState("");
  const [reservationDate, setReservationDate] = useState("");

  const [FullNameError, setFullNameError] = useState(false);
  const [GuestsError, setGuestsError] = useState(false);
  const [emailAddressError, setEmailAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [timeError, setTimeError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [dateErrorMessage, setDateErrorMessage] = useState("");

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowSuccessPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const isDateDisabled = (date: string) => {
    return disabledDates.some(
      (disabledDate) =>
        new Date(disabledDate).toDateString() === new Date(date).toDateString()
    );
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDateDisabled(event.target.value)) {
      setReservationDate(event.target.value);
      setDateError(false);
      setDateErrorMessage("");
    } else {
      setDateError(true);
      setDateErrorMessage("The reservation is full at this date");
    }
  };
  const validateSignUpForm = () => {
    let isValid = true;
    if (FullName === "") {
      setFullNameError(true);
      isValid = false;
    } else {
      setFullNameError(false);
    }
    if (Guests === "") {
      setGuestsError(true);
      isValid = false;
    } else {
      setGuestsError(false);
    }
    if (EmailAddress.trim() === "") {
      setEmailAddressError("Email address is required");
      isValid = false;
    } else if (!validateEmail(EmailAddress.trim())) {
      setEmailAddressError("Invalid email address format");
      isValid = false;
    } else {
      setEmailAddressError("");
    }
    if (reservationDate === "") {
      setDateErrorMessage("Date is required");
      setDateError(true);
      isValid = false;
    } else {
      setDateError(false);
    }
    if (Time === "") {
      setTimeError(true);
      isValid = false;
    } else {
      setTimeError(false);
    }

    if (PhoneNumber === "") {
      setPhoneNumberError("This field is required");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }
    const phoneNumberDigits = PhoneNumber.replace(/\D/g, "");
    if (phoneNumberDigits.length !== 10) {
      setPhoneNumberError("Phone number must be 10 digits");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }
    return isValid;
  };
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const valueChangePhone = (formattedValue: SetStateAction<string>) => {
    setPhoneNumber(formattedValue);
  };
  const onChange = (event: any) => {
    const { name, value } = event.target;
    sessionStorage.setItem(name, value);
    switch (name) {
      case "FullName":
        setFullName(value);
        break;
      case "Guests":
        setGuests(value);
        break;
      case "EmailAddress":
        setEmailAddress(value);
        break;
      case "Time":
        setTime(value);
        break;
      case "Date":
        setReservationDate(value);
        break;
      case "PhoneNumber":
        setPhoneNumber(value);
        break;

      default:
        break;
    }
  };
  const handleValueChange = (values: {
    value: string | any[];
    formattedValue: SetStateAction<string>;
  }) => {
    if (values.value.length <= 10) {
      valueChangePhone(values.formattedValue);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const isFormValid = validateSignUpForm();
    if (!isFormValid) {
      console.log("Form has errors");
      return;
    }
    try {
      const latestReservations = await getReservation();
      if (
        latestReservations &&
        Array.isArray(latestReservations.reservationFull)
      ) {
        const selectedDate = new Date(reservationDate);
        const selectedDateStr = selectedDate.toISOString().split("T")[0];

        const isDisabled = latestReservations.reservationFull.some(
          (reservation: any) => {
            const reservationDateStr = new Date(reservation.reservationDate)
              .toISOString()
              .split("T")[0];
            return reservationDateStr === selectedDateStr;
          }
        );

        if (isDisabled) {
          setDateError(true);
          setDateErrorMessage("The reservation is full at this date");
          return;
        }
      }
      const emailData = {
        date: reservationDate,
        time: Time,
        fullName: FullName,
        emailAddress: EmailAddress,
        phoneNumber: PhoneNumber,
        guests: Guests,
      };

      await sendReservationEmail(emailData);
      setFullName("");
      setGuests("");
      setEmailAddress("");
      setPhoneNumber("");
      setTime("");
      setReservationDate("");
      setShowSuccessPopup(true);
      console.log("Form is valid and submitted");
    } catch (error) {
      console.error(
        "Error while checking reservation availability or sending email:",
        error
      );
      setDateErrorMessage(
        "Error processing your reservation. Please try again."
      );
    }
  };

  return (
    <>
      {showSuccessPopup && (
        <div className="popup-overlay">
          <Typography variant="medium" className="popup" ref={popupRef}>
            Your Reservation has been made. Please contact us, if you need to
            change or cancel the reservation. Thank you!
            <div
              onClick={() => setShowSuccessPopup(false)}
              className="popup-button"
            >
              <Typography color="white">Close</Typography>
            </div>
          </Typography>
        </div>
      )}
      <div className="input-field-div">
        <div className="input-field-wrapper">
          <div className="input-field-container">
            <Typography>Full Name</Typography>
            <input
              type="text"
              className="input-field"
              placeholder="Full Name"
              value={FullName}
              name="FullName"
              onChange={onChange}
              style={{
                borderColor: FullNameError ? "red" : undefined,
              }}
            />
            {FullNameError && (
              <span className="input-field-error">This field is required.</span>
            )}
          </div>
          <div className="input-field-container">
            <Typography>Email Address</Typography>
            <input
              className="input-field"
              type="email"
              placeholder="example@email.com"
              name="EmailAddress"
              value={EmailAddress}
              onChange={onChange}
              style={{
                borderColor: emailAddressError ? "red" : undefined,
              }}
              required
            />
            {emailAddressError && (
              <div className="input-field-error">{emailAddressError}</div>
            )}
          </div>
        </div>
        <div className="input-field-wrapper">
          <div className="input-field-container">
            <Typography>Phone Number</Typography>
            <PatternFormat
              className="input-field"
              placeholder="xxx-xxx-xxxx"
              format="###-###-####"
              allowEmptyFormatting
              mask="_"
              name="PhoneNumber"
              value={PhoneNumber}
              onValueChange={handleValueChange}
              style={{
                borderColor: phoneNumberError ? "red" : undefined,
              }}
            />
            {phoneNumberError && (
              <span className="input-field-error">{phoneNumberError}</span>
            )}
          </div>
          <div className="input-field-container">
            <Typography>Guests</Typography>
            <input
              type="number"
              className="input-field"
              placeholder="How many of you?"
              value={Guests}
              name="Guests"
              onChange={onChange}
              style={{
                borderColor: GuestsError ? "red" : undefined,
              }}
            />
            {GuestsError && (
              <span className="input-field-error">This field is required.</span>
            )}
          </div>
        </div>

        <div className="input-field-wrapper">
          <div className="input-field-container">
            <Typography>Time</Typography>
            <input
              className="input-field"
              type="time"
              name="Time"
              value={Time}
              onChange={onChange}
              style={{
                borderColor: timeError ? "red" : undefined,
              }}
              required
            />
            {timeError && (
              <div className="input-field-error">This field is required.</div>
            )}
          </div>
          <div className="input-field-container">
            <Typography>Date</Typography>
            <input
              type="date"
              className="input-field"
              name="Date"
              value={reservationDate}
              onChange={handleDateChange}
              style={{
                borderColor: dateError ? "red" : undefined,
              }}
            />
            {dateError && (
              <span className="input-field-error">{dateErrorMessage}</span>
            )}
          </div>
        </div>
      </div>
      <div className="button-container">
        <div className="btn-reserve" onClick={handleSubmit}>
          BOOK TABLE
        </div>
      </div>
    </>
  );
};

export default ReservationForm;
