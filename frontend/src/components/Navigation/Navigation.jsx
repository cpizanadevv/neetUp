import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

import logo from "../../store/images/neetup-logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log("USER", sessionUser);
  // const navigate = useNavigate();

  useEffect(() => {}, [sessionUser]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className="flex flex-row justify-between items-center list-none h-8 gap-8 right-0">
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <div className="flex flex-row justify-between items-center list-none h-8 gap-8 right-0 ">
        <div className="border-2 border-blue-950 hover:bg-blue-950 hover:text-white">
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </div>
        <div className="border-2 border-blue-950 hover:bg-blue-950 hover:text-white">
          <OpenModalButton

            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row justify-between items-center h-fit w-full gap-8 bg-white p-2 m-0">
      <div className="hover:scale-125">
        <NavLink to="/">
          <img src={logo} alt="neetUp logo" className="h-24 px-10 m-1 "/>
        </NavLink>
      </div >
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
