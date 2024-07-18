import { FaLongArrowAltLeft } from "react-icons/fa";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.group || []);

  const { name, city, state, about, previewImage, type } = group;
  
  // console.log("THIS IS GROUP",group)
  const host = {...group.Organizer};
  // console.log("THIS IS HOST: ", host)
  const { firstName, lastName } = host;

  useEffect(() => {
    dispatch(groupActions.getGroupById(groupId));
  }, [dispatch,groupId]);
  //   !Needs Num of Events

  return (
    <div>
      <div>
        <NavLink to="/groups">
          <FaLongArrowAltLeft />
          Groups
        </NavLink>
      </div>
      <div id="groupCard">
        <div id="img">
          <img src={previewImage} alt="" />
        </div>
        <div id="groupInfo">
          <h2 id="groupName">{name}</h2>
          <h4 id="groupLocation">
            {city}
            {state}
          </h4>
          <div>
            <h4>Number of events</h4>
            <h4>{type}</h4>
          </div>

          <h4>
            Organized by {lastName}, {firstName}
          </h4>
        </div>
        <div>
            <NavLink><button>Join this Group</button></NavLink>
            
        </div>
      </div>
      <div id="details">
        <h2>Organizer</h2>
        <h4>{lastName}, {firstName}</h4>
        <h3>What we&apos;re about</h3>
        <p>{about}</p>
        <h3>Upcoming events ()</h3>
        <div id="upcomingEvent">
        </div>
      </div>
    </div>
  );
};

export default GroupDetailsPage;
