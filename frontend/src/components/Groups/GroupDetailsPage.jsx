import { FaLongArrowAltLeft } from "react-icons/fa";
import * as groupActions from "../../store/group";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

const GroupDetailsPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const group = useSelector((state) => state.group.group);
  const currUser = useSelector((state) => state.session.user);

  const {
    name,
    city,
    state,
    about,
    previewImage,
    type,
    Memberships = [],
  } = group;
  console.log("name", name);

  const organizer = { ...group.Organizer };
  const { firstName, lastName } = organizer;

  useEffect(() => {
    dispatch(groupActions.getGroupById(groupId));
  }, [dispatch, groupId]);

  // console.log(Memberships);

  const membershipStatus = currUser
    ? Memberships.find((member) => member.userId === currUser.id)?.status ||
      "guest"
    : "guest";

  const currUserRole =
    currUser && group.organizerId === currUser.id ? "organizer" : "guest";

    console.log(currUserRole)
  const isOrganizer = currUserRole === 'organizer';
  const isMember = ["member", "co-host"].includes(membershipStatus);


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
          {isOrganizer && (
            <div>
              <NavLink to={`/groups/${groupId}/events/new`}>
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
      <div id="details">
        <h2>Organizer</h2>
        <h4>
          {lastName}, {firstName}
        </h4>
        <h3>What we&apos;re about</h3>
        <p>{about}</p>
        <h3>Upcoming events ()</h3>
        <div id="upcomingEvent"></div>
      </div>
    </div>
  );
};

export default GroupDetailsPage;
