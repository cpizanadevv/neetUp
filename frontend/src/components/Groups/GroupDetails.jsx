import { FaLongArrowAltLeft } from "react-icons/fa";
import * as groupActions from "../../store/group";
import * as eventActions from "../../store/event";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

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
      const memberships = Object.keys(group.Memberships);
      console.log("memberships", memberships);
      const isMember = memberships.find((member) => member.id == currUser.id);
      console.log("isMember", isMember);

      if (!isMember) {
        setStatus("guest");
      } else {
        setStatus(isMember.status);
      }
      if (currUser.id == group.Organizer.id) {
        setOrganizer(true);
      }
    }
  }, [currUser, group, group.Memberships]);

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
      <div className="mt-40">
        <NavLink
          to={"/groups"}
          className={"flex gap-4 items-center w-min hover:font-semibold ml-4"}
        >
          <FaLongArrowAltLeft /> Groups
        </NavLink>
      </div>
      {group && (
        <div className="w-3/4 m-auto">
          <div className="flex flex-row justify-center gap-2">
            <div className="size-fit">
              {group.GroupImages && (
                <img src={group.GroupImages[0]} className="h-80 w-80" />
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="font-semibold text-lg">{group.name}</h2>
              <h4>
                {group.city}, {group.state}
              </h4>
              <h4>
                {events.length} events ·{" "}
                {group.isPrivate ? "Private" : "Public"}
              </h4>
              {group && group.Organizer && (
                <h4>
                  Organized by: {group.Organizer.lastName}{" "}
                  {group.Organizer.firstName}
                </h4>
              )}
              {currUser && status == "guest" && (
                <button
                  onClick={handleClick}
                  className="m-auto hover:bg-blue-950 hover:text-white h-auto border border-black"
                >
                  Join this Group
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold text-lg">Organizer</h3>
              {group && group.Organizer && (
                <h4>
                  {group.Organizer.lastName} {group.Organizer.firstName}
                </h4>
              )}
            </div>
            <h3 className="font-semibold text-lg">What we&apos;re about</h3>
            <p>{group.about}</p>
          </div>
          <div>
            {organizer && (
              <div className="flex gap-1">
                <NavLink to={`/${groupId}/events/new`}>
                  <button className="m-auto hover:bg-blue-950 hover:text-white h-auto border border-black">
                    Create Event
                  </button>
                </NavLink>
                <NavLink to={`/groups/${groupId}/edit`}>
                  <button className="m-auto hover:bg-blue-950 hover:text-white h-auto border border-black">
                    Update Group
                  </button>
                </NavLink>
                <OpenModalButton
                  buttonText="Delete Group"
                  modalComponent={
                    <DeleteModal className="m-auto hover:bg-blue-950 hover:text-white h-auto border border-black" />
                  }
                />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg mt-24">
              Upcoming events ({upcomingEvents.length}){" "}
            </h3>
            <div className="flex flex-col gap-1">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <NavLink to={`/events/${event.id}`} key={event.id}>
                    <div className="eventCard">
                      <img src={event.previewImage} alt={event.name} />
                      <h4>{event.name}</h4>
                      <h4>{formatDate(event)}</h4>
                      <p>
                        {event.Venue
                          ? `${event.Venue.city}, ${event.Venue.state}`
                          : "Online"}
                      </p>
                      <p>{event.description}</p>
                    </div>
                  </NavLink>
                ))
              ) : (
                <p className="text-lg">No upcoming events</p>
              )}
            </div>
            {pastEvents.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mt-12">
                  Past Events ({pastEvents.length}){" "}
                </h3>
                <div>
                  {pastEvents.map((event) => (
                    <NavLink to={`/events/${event.id}`} key={event.id}>
                      <div className="mt-4">
                        <img src={event.previewImage} alt={event.name} />
                        <h4 className="font-semibold text-lg">{event.name}</h4>
                        <p>{formatDate(event)}</p>
                        <p>
                          {event.Venue
                            ? `${event.Venue.city}, ${event.Venue.state}`
                            : "Online"}
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
