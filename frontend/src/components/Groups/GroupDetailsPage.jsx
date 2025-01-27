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
  const group = useSelector((state) => state.group.group);
  const currUser = useSelector((state) => state.session.user);
  const events = useSelector((state) => state.event.events);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [about, setAbout] = useState("");
  const [isPrivate, setPrivate] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [organizer, setOrganizer] = useState({});

  useEffect(() => {
    dispatch(groupActions.getGroupById(groupId));
    dispatch(eventActions.getGroupEvents(groupId));
    if (group && group.delete === true) {
      group.delete = false;
      navigate("/groups");
    }
    if (group) {
      setIsLoading(true);
      setMemberships(group.Memberships);
      setCity(group.city);
      setName(group.name);
      setState(group.state);
      setAbout(group.about);
      setPrivate(group.isPrivate);
      setPreviewImage(
        group?.GroupImages?.findLast((image) => image.preview === true).url
      );
      setOrganizer({ ...group.Organizer });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, groupId]);

  // console.log(Memberships);
  const { firstName, lastName } = organizer;

  const membershipStatus = currUser
    ? memberships.find((member) => member.userId === currUser.id).status 
    : "guest";

  const currUserRole =
    currUser && organizer?.id === currUser.id ? "organizer" : "guest";

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
    alert("Feature coming soon!");
  };

  return (
    <>
      {isLoading && (
        <div className="mt-40">
          <div>
            <NavLink to="/groups" className={"flex gap-4 items-center w-min hover:font-semibold ml-4"}>
              <FaLongArrowAltLeft />
              Groups
            </NavLink>
          </div>
          <div className="w-3/4 m-auto">
            <div className="flex h-96 gap-2">
              <div className="h-80 w-80">
                <img src={previewImage} alt="" />
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg">{name}</h2>
                <h4>
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
                <div className="m-4">
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
            <div >
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold text-lg">Organizer</h2>
                <h4>
                  {lastName}, {firstName}
                </h4>
              </div>

              <h3 className="font-semibold text-lg my-4">What we&apos;re about</h3>
              <p>{about}</p>
              <h3 className="font-semibold text-lg my-4">Upcoming events ({upcomingEvents.length}) </h3>
              <div id="upcomingEvent">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <NavLink key={event.id} to={`/events/${event.id}`}>
                      <div className="eventCard">
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
                        <div className="eventCard">
                          <img src={event.previewImage} alt={event.name} />
                          <h4>{event.name}</h4>
                          <p>{formatDate(event)}</p>
                          <p>
                            {event.Venue && (event.Venue.city)} ,{" "}
                            {event.Venue && (event.Venue.state)}
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
      )}
    </>
  );
};

export default GroupDetailsPage;
