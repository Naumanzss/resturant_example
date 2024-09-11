import gif2a from "@img/bullNight.gif";
import gif3a from "@img/karaoke.gif";
import "./styles.css";

const Events = () => {
  const events = [
    {
      title: "Bull Riding",
      description: "Detailed description about the Bull Riding event...",
      gif: gif2a,
    },
    {
      title: "Karaoke Night",
      description: "Detailed description about the Karaoke Night...",
      gif: gif3a,
    },
  ];

  return (
    <div className="events-list-section padding-for-navbar">
      <h2 className="events-headings">UPCOMING EVENTS</h2>
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <img src={event.gif} alt={event.title} className="event-image" />
          <div className="event-details">
            <h4 className="event-title">{event.title}</h4>
            <p className="event-description">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
