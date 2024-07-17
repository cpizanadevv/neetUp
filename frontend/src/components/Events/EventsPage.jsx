import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
import * as eventActions from "../../store/event";


const EventsPage = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events || []);
    console.log("THIS IS EVENTS", events);
//   const allevents = events.events ? Object.values(events)[0] : [];
  //   console.log("allevents", allevents);

  useEffect(() => {
    dispatch(eventActions.getevents());
  }, [dispatch]);

  return <div></div>;
};

export default EventsPage;
