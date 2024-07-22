import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as groupActions from "../../store/group";
// import * as eventActions from "../../store/event";
import "./Groups.css";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.group.groups);
  console.log("THIS IS GROUPS", groups);
  const allGroups = groups.Groups ? groups.Groups : [];
  console.log("allgroups", allGroups);

  useEffect(() => {
    dispatch(groupActions.getGroups());
  }, [dispatch]);

  return (
    <div id="groupList">
      <div id="topLinks">
        <div id="headings">
          <NavLink to="/events">
            <h2>Events</h2>
          </NavLink>
          <NavLink to="/groups">
            <h2>Groups</h2>
          </NavLink>
        </div>
        <h4 id="headline">Groups in neetUp</h4>
        <hr />
      </div>
      <div id="groups">
        {groups &&
          allGroups.map(
            ({
              id,
              name,
              city,
              state,
              about,
              previewImage,
              private: isPrivate,
              Events,
            }) => (
              <NavLink key={id} to={`/groups/${id}`}>
                <div id="groupCard">
                  <div id="img">
                    <img src={previewImage} />
                  </div>
                  <div id="sideInfo">
                    <div id="info">
                      <h2 id="name">{name}</h2>
                      <h4 id="location">
                        {city},{state}
                      </h4>
                      <p id="about">{about}</p>

                      <h4>
                        {Events.length} events ·{" "}
                        {isPrivate ? "Private" : "Public"}
                      </h4>
                    </div>
                  </div>
                </div>
                <hr />
              </NavLink>
            )
          )}
      </div>
    </div>
  );
};

export default GroupsPage;
