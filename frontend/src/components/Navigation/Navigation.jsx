import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "../ProfileButton/ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal.jsx/SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <ul>
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
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
