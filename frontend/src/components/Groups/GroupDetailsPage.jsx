import { FaLongArrowAltLeft } from "react-icons/fa";
import * as groupActions from "../../store/group";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./GroupDetails.css";

const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.group);
  const currUser = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.event.events);
  const navigate = useNavigate();

  // console.log("events", events);

  const {
    name,
    city,
    state,
    about,
    previewImage,
    private: isPrivate,
    Memberships = [],
  } = group;
  // console.log("name", name);

  const organizer = { ...group.Organizer };
  const { firstName, lastName } = organizer;

  useEffect(() => {
    dispatch(groupActions.getGroupById(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    dispatch(eventActions.getGroupEvents(groupId));
  }, [dispatch, groupId]);

  useEffect(() => {
    if (group && group.delete === true) {
      group.delete = false;
      navigate("/groups");
    }
  }, [group, navigate]);

  // console.log(Memberships);

  const membershipStatus = currUser
    ? Memberships.find((member) => member.userId === currUser.id)?.status ||
      "guest"
    : "guest";

  const currUserRole =
    currUser && group.organizerId === currUser.id ? "organizer" : "guest";

  // console.log(currUserRole);
  const isOrganizer = currUserRole === "organizer";
  const isMember = ["member", "co-host"].includes(membershipStatus);

  const now = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.startDate) > now
  );
  const pastEvents = events.filter((event) => new Date(event.startDate) <= now);
  // console.log("THIS IS PAST: ",pastEvents)

  const formatDate = (event) => {
    const [startDay, startTime] = new Date(event.startDate)
      .toLocaleString()
      .split(",");

    return startDay + " · " + startTime;
  };

  const handleClick = () => {
    alert("Feature coming soon!")
  }

  return (
    <div id="groupPage">
      <div id="topLinks">
        <NavLink to="/groups">
          <FaLongArrowAltLeft />
          Groups
        </NavLink>
      </div>
      <div id="group">
        <div id="top">
          <div id="img">
            <img src={previewImage} alt="" />
          </div>
          <div id="info">
            <h2 id="groupName">{name}</h2>
            <h4 id="groupLocation">
              {city}
              {state}
            </h4>
            <div>
              <h4>
                {events.length} events · {isPrivate ? "Private" : "Public"}
              </h4>
            </div>

            <h4>
              Organized by {lastName}, {firstName}
            </h4>
            <div id="buttons">
              {currUser && !isMember && (
                <button onClick={handleClick}>Join this Group</button>
              )}
              {isOrganizer && (
                <div>
                  <NavLink to={`/${groupId}/events/new`}>
                    <button>Create Event</button>
                  </NavLink>
                  <NavLink to={`/groups/${groupId}/edit`}>
                    <button>Update Group</button>
                  </NavLink>
                  <OpenModalButton
                    buttonText="Delete Group"
                    modalComponent={<DeleteModal />}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="details">
          <div id="host">
            <h2>Organizer</h2>
            <h4>
              {lastName}, {firstName}
            </h4>
          </div>

          <h3>What we&apos;re about</h3>
          <p>{about}</p>
          <h3>Upcoming events ({upcomingEvents.length}) </h3>
          <div id="upcomingEvent">
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
                  <NavLink key={event.id} to={`/events/${event.id}`}>
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
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsPage;
