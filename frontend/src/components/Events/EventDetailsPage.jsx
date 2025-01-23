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
  const [group, setGroup] = useState({})
  const [organizer, setOrganizer] = useState({})

  // const groupId = group.id;

  useEffect(() => {
    dispatch(eventActions.getEventById(eventId));
    if (event && event.delete === true) {
      event.delete = false;
      navigate(`/groups/${groupId}`);
    }
    if (event){
      setGroup({...event.Group})
    }

    if(group) {
      setOrganizer({...group.Organizer})

    }

  }, [dispatch]);

  const {
    name,
    description,
    startDate,
    endDate,
    price,
    type,
    previewImage,
  } = event;

  // console.log("This is EVEnt ID", eventId);
  // console.log("THIS IS GROUP", group);

  const { id, firstName, lastName } = organizer;
  // console.log()

  const currUserRole = currUser && id === currUser.id ? "organizer" : "guest";

  // console.log("GROUP", group)

  const isOrganizer = currUserRole === "organizer";
  // console.log("isOrganizer", isOrganizer)


  const [startDay, startTime] = new Date(startDate).toLocaleString().split(",");

  const [endDay, endTime] = new Date(endDate).toLocaleString().split(",");

  return (
    <div className="mt-36">
      <div>
        <div>
          <NavLink to="/events" className="flex gap-4 items-center hover:text-lg w-min">
            <FaLongArrowAltLeft />
            Events
          </NavLink>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <h4 className="text-lg font-semibold">
            Hosted by {lastName} , {firstName}
          </h4>
        </div>
        <div>
          <div className="flex flex-row gap-4">
              <img src={previewImage} className="w-1/2 h-auto"/>
            <NavLink to={`/groups/${group.id}`} className={"flex-flex-col"}>
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
          <div>
            <h3>Description</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
