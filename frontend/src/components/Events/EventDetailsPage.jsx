import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/event";
import { NavLink, useParams } from "react-router-dom";
import { FaLongArrowAltLeft, FaMapPin, FaRegClock } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";

const EventDetailsPage = () => {
  const {eventId} = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.event.event);

  // const currEvent = {...event.Event}
  console.log("THIS IS EVENT ", event)
  // console.log("THIS IS CURREVENT ", currEvent)

  // console.log(currEvent)


  // const organizer = {...Group.Organizer}
  // const host = organizer.lastName + " , " + organizer.firstName;
  
  useEffect(() => {
    dispatch(eventActions.getEventById(eventId));
  }, [dispatch, eventId]);

  const {
    name,
    description,
    startDate,
    endDate,
    price,
    type,
    Group,
    previewImage,
  } = event;
  
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
          <h4>Hosted by </h4>
        </div>
        <div id="EventCard">
          <div id="topSection">
            <div id="img">
              <img src={previewImage} />
            </div>
            <NavLink to={`/groups/${Group.id}`}>
              <div id="groupCard">
                <div id="groupImg">
                  <img src="" alt="" />
                </div>
                <div id="groupInfo">
                  {Group.name}
                  {Group.type === true ? <h4>Private</h4> : <h4>Public</h4>}
                </div>
              </div>
            </NavLink>

            <div id="eventInfo">
              <div id="time">
                <FaRegClock />
                <div>
                  <h4>Start</h4>
                  <h4>End</h4>
                </div>

                <div>
                  <h4>{new Date(startDate).toLocaleString()}</h4>
                  <h4>{new Date(endDate).toLocaleString()}</h4>
                </div>
              </div>
              <div id="price">
                <FaCircleDollarToSlot /> {price}
              </div>
              <div id="eventType">
                <FaMapPin /> {type}
              </div>
            </div>
          </div>
          <div id="details">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
