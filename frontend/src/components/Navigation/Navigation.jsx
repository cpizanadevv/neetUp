import { NavLink} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

import logo from "../../store/images/neetup-logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log("USER", sessionUser)
  // const navigate = useNavigate();

  useEffect(() => {
  }, [sessionUser]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <ul className="flex-row justify-between items-center list-none h-min gap-8">
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </ul>
    );
  }

  return (
    <ul className="bg-white p-2 m-0 border-b-2 border-blue-950 border-solid flex-row justify-between items-center">
      <li className="left-0">
        <NavLink to="/">
          <img src={logo} alt="neetUp logo" />
        </NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
