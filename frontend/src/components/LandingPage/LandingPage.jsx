import { NavLink } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
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
          <img src="" alt="lp-img" />
        </div>
        
      </div>
      <div>
        <h3>How neetUp works</h3>
        <div id="toDo-cards">
          <h4>
            <NavLink to="/groups">See All Groups</NavLink>
          </h4>
          <h4>
            <NavLink to="/events">Find An Event</NavLink>
          </h4>

          <h4>
            {/* Link is disabled if user is 
                not logged in */}
            <NavLink>Start a new Group</NavLink>
          </h4>
        </div>
      </div>
      <div>
        <button>
          <NavLink>Join neetUp</NavLink>
          </button>
      </div>
    </>
  );
};

export default LandingPage;
