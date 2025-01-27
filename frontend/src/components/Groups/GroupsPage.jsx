import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as groupActions from "../../store/group";
// import * as eventActions from "../../store/event";

const GroupsPage = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.group.groups);
  const allGroups = groups.Groups ? groups.Groups : [];

  useEffect(() => {
    dispatch(groupActions.getGroups());
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center mx-5 my-48 font-blue-950 font-semibold no-underline gap-4">
      <div className="flex flex-col gap-2 justify-start left-0">
        <div className="flex flex-row gap-8 h-12">
          <NavLink to="/events" className={"hover:text-lg w-8"}>
            <h2>Events</h2>
          </NavLink>
          <NavLink to="/groups" className={"hover:text-lg w-8"}>
            <h2>Groups</h2>
          </NavLink>
        </div>
        <h4 className="left-0 font-bold text-lg">Groups in neetUp</h4>
        <hr />
      </div>
      <div className="w-2/3">
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
                <div className="flex flex-row justify-start align-top w-2/3 my-8 ml-12">
                  <div className="h-auto w-96">
                    <img src={previewImage} />
                  </div>
                  <div className="flex flex-row justify-start align-top mt-4 p-0">
                    <div className="flex flex-col my-0 mx-2 text-left">
                      <h2 className="my-2 text-lg">{name}</h2>
                      <h4 className="mt-2">
                        {city},{state}
                      </h4>
                      <p className="mt-2 p-0">{about}</p>

                      <h4 className="mt-2">
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
