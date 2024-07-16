import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../store/group";
import { NavLink } from "react-router-dom";

const GroupsPage = () => {
  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGroups);
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
          <NavLink to={`/${id}`}>
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