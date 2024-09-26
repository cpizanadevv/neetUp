import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/event";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaLongArrowAltLeft, FaMapPin, FaRegClock } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./EventDetails.css";
import DeleteEventModal from "../DeleteModal/DeleteEventModal";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.event);
  const currUser = useSelector((state) => state.session.user);
  // const navigate = useNavigate();
  // console.log("USER", currUser)
  const [group, setGroup] = useState(null)
  const [organizer, setOrganizer] = useState(null)

  // const groupId = group.id;
  console.log("This is EVENT", event);

  useEffect(() => {
    dispatch(eventActions.getEventById(eventId));
    // if (event && event.delete === true) {
    //   event.delete = false;
    //   navigate(`/groups/${groupId}`);
    // }
    if (event){
      setGroup(...event.Group)
    }

    if(group) {
      setOrganizer(...event.Group.Organizer)

    }

  }, [dispatch, eventId,event]);

  // console.log("This is GROUp", group);
  // console.log("This", event.Group);

  const {
    name,
    description,
    startDate,
    endDate,
    price,
    type,
    previewImage,
  } = event;

  console.log("This is EVEnt ID", eventId);
  // console.log("THIS IS GROUP", group);

  const { id, firstName, lastName } = organizer;

  const currUserRole = currUser && organizer?.id === currUser.id ? "organizer" : "guest";

  console.log("GROUP", group)

  const isOrganizer = currUserRole === "organizer";
  // console.log("isOrganizer", isOrganizer)


  const [startDay, startTime] = new Date(startDate).toLocaleString().split(",");

  const [endDay, endTime] = new Date(endDate).toLocaleString().split(",");

  return (
    <div>
      <div>
        <div>
          <NavLink to="/events">
            <FaLongArrowAltLeft />
            Events
          </NavLink>
        </div>
        
        <div>
          <h2>{name}</h2>
          <h4>
            Hosted by {lastName} , {firstName}
          </h4>
        </div>
        <div id="EventCard">
          <div id="topSection">
            <div id="img">
              <img src={previewImage} />
            </div>
            <NavLink to={`/groups/${group.id}`}>
              <div id="groupCard">
                <div id="groupImg">
                  <img src="" alt="" />
                </div>
                <div id="groupInfo">
                  {group.name}
                  {group.type === true ? <h4>Private</h4> : <h4>Public</h4>}
                </div>
              </div>
            </NavLink>

            <div id="eventInfo">
              <div id="time">
                <FaRegClock />
                <div>
                  <h4>
                    Start {startDay} · {startTime}
                  </h4>
                  <h4>
                    End {endDay} · {endTime}
                  </h4>
                </div>
              </div>
              <div id="price">
                <FaCircleDollarToSlot /> {price === 0 ? 'FREE' : `$${price}`}
              </div>
              <div id="eventType">
                <FaMapPin /> {type}
              </div>
              <div id="buttons">
                {isOrganizer && (
                  <div>
                    <button>Update Event</button>
                    <OpenModalButton
                      buttonText="Delete Event"
                      modalComponent={<DeleteEventModal />}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id="details">
            <h3>Description</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
