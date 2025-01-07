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

  const ulClassName = "h-auto w-1/5 hover:scale-125" + (sessionUser ? "" : "font-grey");

  useEffect(() => {

  }, [sessionUser]);

  return (
    <div className="flex flex-col pt-16">
      <div className="flex flex-row py-24 px-48 w-auto h-2/3 justify-center content-center gap-4">
        <div className="py-0 px-1 justify-center w-1/2 mt-24">
          <h2 className="text-2xl font-semibold">
            The Anime Enthusiasts&apos; Hub—Where Passion Becomes Friendship
          </h2>
          <h4 className="mt-4">
          Whether you&apos;re into classic series, the latest releases, cosplay, or manga, you&apos;re not alone—there are thousands of anime fans ready to connect with you. neetUp is your gateway to both in-person and online anime events happening every day. Sign up today and be part of the excitement—share your passion, meet like-minded fans, and dive deeper into the anime world!
          </h4>
        </div>
          <img src={landingPageImg} alt="" className="h-auto w-1/3" />
      </div>
      <div id="buttons">
        <h3 className="text-center font-bold text-lg">How neetUp works</h3>
        <div className="flex justify-evenly py-8 px-60">
          <div className="flex flex-row h-auto w-1/5  hover:scale-125">
            <NavLink style={{ textDecoration: 'none' }} to="/groups">
              <img src={groupImg} />
              <h4 className="text-center">See All Groups</h4>
            </NavLink>
          </div>
          <div className=" h-auto w-1/5  hover:scale-125">
            <NavLink style={{ textDecoration: 'none' }} to="/events">
              <img src={eventImg} />
              <h4 className="text-center">Find An Event</h4>
            </NavLink>
          </div>
          {sessionUser ?
            <div className={ulClassName}>
              <NavLink style={{ textDecoration: 'none' }} to="/groups/new">
                <img src={createImg} />
                <h4 className="text-center">Start a group</h4>
              </NavLink>
            </div> :
            <div className={ulClassName}>
              <img src={createImg} />
              <h4 className="text-center">Create group</h4>
          </div>
          }
        </div>
      </div>
      <div className="m-auto my-3 h-auto">
        <OpenModalButton
        buttonText={<h3 className="flex justify-center items-center p-1.25 w-24 h-10 bg-blue-950 text-white  hover:bg-white hover:text-black hover:border hover:border-blue-950">Join neetUp</h3>}
        modalComponent={<SignupFormModal />}
      />
      </div>
    </div>
  );
};

export default LandingPage;
