import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as eventActions from "../../store/event";
import "./EventPage.css";

const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  console.log("THIS IS EVENTS", events);

  useEffect(() => {
    dispatch(eventActions.getEvents());
  }, [dispatch]);

  const now = new Date();
  let upcomingEvents = events.filter(
    (event) => new Date(event.startDate) > now
  );
  upcomingEvents = upcomingEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  
  let pastEvents = events.filter((event) => new Date(event.startDate) <= now);
  pastEvents = pastEvents.sort((b, a) => new Date(a.startDate) - new Date(b.startDate));

  const formatDate = (event) => {
    const [startDay, startTime] = new Date(event.startDate)
      .toLocaleString()
      .split(",");

    return startDay + " · " + startTime;
  };

  return (
    <div id="eventList">
      <div id="topLinks">
        <div id="headings">
          <NavLink to="/events">
            <h3>Events</h3>
          </NavLink>
          <NavLink to="/groups">
            <h3>Groups</h3>
          </NavLink>
        </div>
        <h4 id="headline">Events in neetUp</h4>
        <hr />
      </div>
      <div id="upcomingEvent">
      <h3>Upcoming events ({upcomingEvents.length}) </h3>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <NavLink key={event.id} to={`/events/${event.id}`}>
              <div key={event.id} className="eventCard">
                <img src={event.previewImage} alt={event.name} />
                <h4>{event.name}</h4>
                <h4>{formatDate(event)}</h4>
                <p>
                  {event.Venue && event.Venue.city} ,{" "}
                  {event.Venue && event.Venue.state}
                </p>
                <p>{event.description}</p>
              </div>
            </NavLink>
          ))
        ) : (
          <p>No upcoming events</p>
        )}
      </div>
      {pastEvents.length > 0 && (
        <div>
          <h3>Past Events ({pastEvents.length}) </h3>
          <div id="pastEvents">
            {pastEvents.map((event) => (
              <NavLink key={event.id}  to={`/events/${event.id}`}>
                <div key={event.id} className="eventCard">
                  <img src={event.previewImage} alt={event.name} />
                  <h4>{event.name}</h4>
                  <p>{formatDate(event)}</p>
                  <p>
                    {event.Venue && event.Venue.city} ,{" "}
                    {event.Venue && event.Venue.state}
                  </p>
                  <p>{event.description}</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {/* <div id="events">
        {events &&
          events.map(
            ({
              id,
              name,
              description,
              type,
              startDate,
              previewImage,
              Venue,
            }) => (
              <NavLink key={id} to={`/events/${id}`}>
                <div id="eventCard">
                  <div id="top">
                    <img id="img" src={previewImage} />

                    <div id="info">
                      <h4 id="date">{new Date(startDate).toLocaleString()}</h4>
                      <h2 id="name">{name}</h2>
                      {type !== "Online" ? (
                        <h4 id="location">
                          {Venue?.city}, {Venue?.state}
                        </h4>
                      ) : (
                        <h4 id="location">{type}</h4>
                      )}
                    </div>
                  </div>
                  <div id="bottom">
                    <p id="about">{description}</p>
                  </div>
                </div>
                <hr />
              </NavLink>
            )
          )}
      </div> */}
    </div>
  );
};

export default EventsPage;
