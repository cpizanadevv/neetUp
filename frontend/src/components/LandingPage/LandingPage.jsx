import { NavLink } from "react-router-dom";
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
    <div className="flex flex-col">
      <div className="flex flex-row py-24 px-48 w-auto h-2/3 justify-center content-center gap-4">
        <div className="py-0 px-1 justify-center w-1/2 mt-24">
          <h2 className="text-2xl font-semibold">
            The Anime Enthusiasts&apos; Hub—Where Passion Becomes Friendship
          </h2>
          <h4 className="mt-4">
          Whether you&apos;re into classic series, the latest releases, cosplay, or manga, you&apos;re not alone—there are thousands of anime fans ready to connect with you. Meetup is your gateway to both in-person and online anime events happening every day. Sign up today and be part of the excitement—share your passion, meet like-minded fans, and dive deeper into the anime world!
          </h4>
        </div>
          <img src={landingPageImg} alt="" className="h-50 w-1/3" />
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
