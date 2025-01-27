import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as eventActions from "../../store/event";

const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);
  // console.log("THIS IS EVENTS", events);

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
    <div className="mt-36 p-6">
      <div className="flex flex-col gap-1 justify-start left-0">
      <div className="flex flex-row gap-8 h-12">
          <NavLink to="/events" className={"hover:text-lg w-8"}>
            <h2>Events</h2>
          </NavLink>
          <NavLink to="/groups" className={"hover:text-lg w-8"}>
            <h2>Groups</h2>
          </NavLink>
        </div>
        <h4 className="font-semibold text-xl">Events in neetUp</h4>
        <hr />
      </div>
      <div>
      <h3 className="text-lg font-semibold mt-4">Upcoming events ({upcomingEvents.length}) </h3>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <NavLink key={event.id} to={`/events/${event.id}`} className={"mt-4"}>
              <div key={event.id} className="flex flex-col w-96 h-auto gap-2">
                <img src={event.previewImage} alt={event.name} className="h-24 w-48"/>
                <h4 className="text-lg font-medium">{event.name}</h4>
                <h4>{formatDate(event)}</h4>
                <div>
                  {event.Venue ? (
                    <div>
                      {event.Venue && event.Venue.city} ,{" "}
                      {event.Venue && event.Venue.state}
                    </div>
                  ):(
                    <div>
                      Online
                    </div>
                  )}
                  
                </div>
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
          <h3 className="text-lg font-semibold mt-4">Past Events ({pastEvents.length}) </h3>
          <div className="flex flex-col gap-6">
            {pastEvents.map((event) => (
              <NavLink key={event.id} to={`/events/${event.id}`}>
                <div key={event.id} className="eventCard">
                  <img src={event.previewImage} alt={event.name} className="h-24 w-48"/>
                  <h4 className="text-lg font-medium">{event.name}</h4>
                  <p>{formatDate(event)}</p>
                  <div>
                  {event.Venue ? (
                    <div>
                      {event.Venue && event.Venue.city} ,{" "}
                      {event.Venue && event.Venue.state}
                    </div>
                  ):(
                    <div>
                      Online
                    </div>
                  )}
                  
                </div>
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
