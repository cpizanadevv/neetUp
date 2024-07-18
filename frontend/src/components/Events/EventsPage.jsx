import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as eventActions from "../../store/event";

const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events || []);
  
  console.log("THIS IS EVENTS", events);



  const allEvents = events.Events ? Object.values(events)[0] : [];
  // console.log("THIS IS ALLEVENTS: ", allEvents);

  useEffect(() => {
    dispatch(eventActions.getEvents());
  }, [dispatch]);
  return (
    <>
      <div>
        <div id="headings">
          <NavLink to="/events">
            <h3>Events</h3>
          </NavLink>
          <NavLink to="/groups">
            <h3>Groups</h3>
          </NavLink>
        </div>
        <h4>Events in neetUp</h4>
        <hr />
      </div>
      <div id="events">
        {allEvents &&
          allEvents.map(
            ({
              id,
              name,
              description,
              type,
              startDate,
              previewImage,
              Venue
            }) => (
              <NavLink key={id} to={`/events/${id}`}>
                <div id="eventCard">
                  <div>
                    <img src={previewImage} />
                    <div id="info">
                      <h4>{new Date(startDate).toLocaleString()}</h4>
                      <h2>{name}</h2>
                      {type !== 'Online'?(
                        <h4>
                        {Venue?.city}, {Venue?.state}
                      </h4>
                      ) : (<h4>{type}</h4>) }
                      
                      
                    </div>
                  </div>
                  <div id="about">
                    <p>{description}</p>
                  </div>
                </div>
                <hr />
              </NavLink>
            )
          )}
      </div>
    </>

  );
};

export default EventsPage;