import { FaLongArrowAltLeft } from "react-icons/fa";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.group);
  const currUser = useSelector((state) => state.session.user);
  // console.log("THIS IS GROUP", group)
  // console.log("THIS IS currUser", currUser)


  const { name, city, state, about, previewImage, type, Memberships = [] } = group;
  console.log("name", name)
  
  const host = {...group.Organizer};
  const { firstName, lastName } = host;

  useEffect(() => {
    dispatch(groupActions.getGroupById(groupId));
  }, [dispatch,groupId]);

  console.log(Memberships)


  const currUserRole = currUser ? Memberships.find(member => member.userId === currUser.id)?.status || 'guest' : 'guest';
  const isOrganizerOrCoHost = ['co-host'].includes(currUserRole);
  const isMember = ['member', 'co-host'].includes(currUserRole);

  const handleDeleteGroup = async () => {
    await dispatch(groupActions.deleteGroup(groupId));
    navigate("/groups");
  };




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
          {!isMember && (
            <NavLink to={`/groups/${groupId}/join`}>
              <button>Join this Group</button>
            </NavLink>
          )}
          {isOrganizerOrCoHost && (
            <div>
              <NavLink to={`/groups/${groupId}/events/new`}>
                <button>Create Event</button>
              </NavLink>
              <NavLink to={`/groups/${groupId}/edit`}>
                <button>Update Group</button>
              </NavLink>
              {currUserRole === 'Organizer' && (
                <button onClick={handleDeleteGroup}>
                  Delete Group
                </button>
              )}
            </div>
          )}
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
