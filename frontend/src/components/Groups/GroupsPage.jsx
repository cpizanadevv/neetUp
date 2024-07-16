import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/group';


const GroupsPage = () => {
  const groups = useSelector((state) => state.group.groups || []);
  console.log("THIS IS GROUP",groups)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.getGroups());
  }, [dispatch]);

  return (
    <>
      <div>
        <div id="headings">
          <NavLink to='/events'>
            <h3>Events</h3>
          </NavLink>
          <NavLink to='/groups'>
            <h3>Groups</h3>
          </NavLink>
        </div>
        <h4>Groups in neetUp</h4>
        <hr />
      </div>
      <div>
        {groups.map(({ id, name, city, state, about, preview, type }) => (
          <NavLink key={id} to={`/groups/${id}`}>
            <div>
              <img src={preview} />
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
        ))}
      </div>
    </>
  );
};

export default GroupsPage