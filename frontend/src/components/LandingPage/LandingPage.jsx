import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import landingPageImg from "../../store/images/lp/landingPageImg.jpg";
import groupImg from "../../store/images/lpGroupImg.png";
import eventImg from "../../store/images/lp/lpEventImg.png";
import createImg from "../../store/images/lp/lpCreateGroup.png";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

const LandingPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  console.log("landing page sessionUser", sessionUser)

  const ulClassName = "cards " + (sessionUser ? "" : " deactivated");

  useEffect(() => {
    
  }, [sessionUser]);

  return (
    <div id="lp">
      <div id="pageIntro">
        <div id="info">
          <h2>
            The Anime Enthusiasts&apos; Hub—Where Passion Becomes Friendship
          </h2>
          <h4>
            Whether your interest is in classic series, new releases, cosplay,
            or manga, there are thousands of anime fans who share your passion
            on Meetup. Anime events are happening every day—sign up to join the
            excitement.
          </h4>
        </div>
        <div id="img">
          <img src={landingPageImg} alt="" />
        </div>
      </div>
      <div id="buttons">
        <h3 id="works">How neetUp works</h3>
        <div id="toDoCards">
          <div className="cards">
            <NavLink style={{ textDecoration: 'none' }} to="/groups">
              <img src={groupImg} />
              <h4>See All Groups</h4>
            </NavLink>
          </div>
          <div className="cards">
            <NavLink style={{ textDecoration: 'none' }} to="/events">
              <img src={eventImg} />
              <h4>Find An Event</h4>
            </NavLink>
          </div>
          {sessionUser ?
            <div className={ulClassName}>
              <NavLink style={{ textDecoration: 'none' }} to="/groups/new">
                <img src={createImg} />
                <h4>Start a group</h4>
              </NavLink>
            </div> :
            <div className={ulClassName}>
              <img src={createImg} />
              <h4>Start a group</h4>
          </div> 
          }
        </div>
      </div>
      <div id="join">
        <OpenModalButton
        buttonText={<NavLink><h3>Join neetUp</h3></NavLink>}
        modalComponent={<SignupFormModal />}
      />
      </div>
    </div>
  );
};

export default LandingPage;
