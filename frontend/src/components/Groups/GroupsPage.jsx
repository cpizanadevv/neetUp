import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as groupActions from "../../store/group";
import './Groups.css'

const GroupsPage = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.group.groups || []);
  //   console.log("THIS IS GROUP", groups);
  const allGroups = groups.Groups ? Object.values(groups)[0] : [];
  //   console.log("allgroups", allGroups);

  useEffect(() => {
    dispatch(groupActions.getGroups());
  }, [dispatch]);

//   !Needs NumofEvents

  return (
    <div id="groupList">
      <div>
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
            ({ id, name, city, state, about, previewImage, type }) => (
              <NavLink key={id} to={`/groups/${id}`}>
                <div id="groupCard">
                  <div id="groupImg">
                    <img src={previewImage} />
                  </div>
                  <div id="groupInfo">
                    <h2 id="groupName">{name}</h2>
                    <h4 id="groupLocation">
                      {city},{state}
                    </h4>
                    <p id="groupAbout">{about}</p>
                    <h4 id="groupType">{type}</h4>
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
