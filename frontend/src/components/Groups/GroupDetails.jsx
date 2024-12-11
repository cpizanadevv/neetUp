import { FaLongArrowAltLeft } from "react-icons/fa";
import * as groupActions from "../../store/group";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./GroupDetails.css";

const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const group = useSelector((state) => state.group.group);
  const currUser = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.event.events);

  const [status, setStatus] = useState("guest");
  const [organizer, setOrganizer] = useState(false);

  useEffect(() => {
    dispatch(groupActions.getGroupById(groupId));
    dispatch(eventActions.getGroupEvents(groupId));
    if (group && group.delete === true) {
      group.delete = false;
      navigate("/groups");
    }
  }, [dispatch, groupId]);

  useEffect(() => {
    if (currUser && group && group.Memberships) {
      const isMember = group.Memberships.find(
        (member) => member.userId == currUser.id
      );
      console.log("isMember", isMember);
      setStatus(isMember?.status || "guest");
      if (currUser.id == group.Organizer.id) {
        setOrganizer(true);
      }
    }
  }, [currUser, group]);

  const now = new Date();
  const upcomingEvents = events.filter(
    (event) => new Date(event.startDate) > now
  );
  const pastEvents = events.filter((event) => new Date(event.startDate) <= now);

  const formatDate = (event) => {
    const [startDay, startTime] = new Date(event.startDate)
      .toLocaleString()
      .split(",");

    return startDay + " · " + startTime;
  };

  const handleClick = () => {
    alert("Feature coming soon!");
  };

  return (
    <div>
      <div className="links">
        <NavLink to={"/groups"}>
          <FaLongArrowAltLeft /> Groups
        </NavLink>
      </div>
      {group && (
        <div>
          <div>
            <h2>{group.name}</h2>
            {group && group.Organizer && (
              <h4>
                Organized by: {group.Organizer.lastName}{" "}
                {group.Organizer.firstName}
              </h4>
            )}
          </div>
          <div>
            {group.GroupImages && <img src={group.GroupImages[0]} alt="" />}
          </div>
          <div>
            <h4>
              {group.city}, {group.state}
            </h4>
            <h4>
              {events.length} events · {group.isPrivate ? "Private" : "Public"}
            </h4>
          </div>
          <div>
            About group:
            <p>{group.about}</p>
          </div>
          <div>
            {currUser && status == "guest" && (
              <button onClick={handleClick}>Join this Group</button>
            )}
            {organizer && (
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
          <div>
            <h3>Upcoming events ({upcomingEvents.length}) </h3>
            <div id="upcomingEvent">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <NavLink to={`/events/${event.id}`}>
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
                      <NavLink to={`/events/${event.id}`}>
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
      )}
    </div>
  );
};

export default GroupDetailsPage;
