import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as groupActions from "../../store/group";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.group.groups || []);
//   console.log("THIS IS GROUP", groups);
  const allGroups = groups.Groups ? Object.values(groups)[0] : [];
//   console.log("allgroups", allGroups);

  useEffect(() => {
    dispatch(groupActions.getGroups());
  }, [dispatch]);

  return (
    <>
      <div>
        <div id="headings">
          <NavLink to="/events">
            <h3>Events</h3>
          </NavLink>
          <NavLink to="/groups">
            <h3>Groups</h3>
          </NavLink>
        </div>
        <h4>Groups in neetUp</h4>
        <hr />
      </div>
      <div>
        {groups &&
          allGroups.map(
            ({ id, name, city, state, about, previewImage, type }) => (
              <NavLink key={id} to={`/groups/${id}`}>
                <div>
                  <img src={previewImage} />
                  <div>
                    <h2>{name}</h2>
                    <h4>
                      {city},{state}
                    </h4>
                    <p>{about}</p>
                    <h4>{type}</h4>
                  </div>
                </div>
              </NavLink>
            )
          )}
      </div>
    </>
  );
};

export default GroupsPage;
