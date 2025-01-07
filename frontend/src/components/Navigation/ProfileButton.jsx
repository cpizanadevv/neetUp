import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "fixed right-0 top-24 min-w-40 z-40 h-full bg-white" + (showMenu ? "" : " hidden");

  return (
    <div className="flex flex-row justify-between gap-4">
      <button className="w-24 hover:bg-blue-950 hover:text-white h-12 flex justify-center items-center font-semibold ">
        <NavLink to={"/groups/new"} className={'p-2'}>Create Group</NavLink>
      </button>
      <button onClick={toggleMenu}>
        <FaUserCircle className="h-12 w-8 hover:scale-150 hover:text-blue-950"/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {showMenu && (
          <div className="p-4 flex flex-col gap-4 justify-center items-center">
            <li className="font-medium text-lg w-48 h-8 flex justify-center items-center text-blue-950">Hello, {user.firstName}</li>

            <NavLink to={"/groups"}>
              <li className="hover:bg-blue-950 hover:text-white w-48 h-8 flex justify-center items-center">View Groups</li>
            </NavLink>

            <NavLink to={"/events"}>
              <li className="hover:bg-blue-950 hover:text-white w-48 h-8 flex justify-center items-center">View Events</li>
            </NavLink>

            <li className="hover:bg-blue-950 hover:text-white w-48 h-8 flex justify-center items-center">
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
        )}
        {!user && (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
