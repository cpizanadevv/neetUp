import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as groupActions from "../../store/group";


const GroupFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errs, setErrs] = useState({});
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [isPrivate, setPrivate] = useState();
  let [cityState, setCityState] = useState("")
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  
    cityState = cityState.split(',').map(part => part.trim());
  
      if (cityState.length === 2) {
        setCity(cityState[0]);
        setState(cityState[1]);
      }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrs({});

    const group = { name, about, type, city, state };
    group.private = isPrivate;
    const newGroup = await dispatch(groupActions.createGroup(group))
    if (group.errs) {
        setErrs(group.errors)
    }else{
        navigate(`/groups/${group.id}`);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Become an Organizer</h3>
      <h2>We&apos;ll walk you through a few steps to build your local community</h2>
      <hr />
      <div id="location">
        <h2>First, set your group&apos;s location.</h2>
        <h4>
          Meetup groups meet locally, in person and online. We&apos;ll connect you
          with people in your area, and more can join you online
        </h4>
        <input type="text" placeholder="City, STATE" onChange={(e) => setCityState(e.target.value)} />
        <hr />
      </div>
      <div id="name">
        <h2>What will your group&apos;s name be?</h2>
        <h4>Choose a name that will give people a clear idea of what the group is about.
Feel free to get creative! You can edit this later if you change your mind.</h4>
      <input type="text" placeholder="What is your group name?" onChange={(e) => setName(e.target.value)}/>
      </div>
      <div id="about">
        <h2>Now describe what your group will be about</h2>
        <h4>People will see this when we promote your group, but you&apos;ll be able to add to it later, too</h4>
        <ol>
            <li>What&apos;s the purpose of the group?</li>
            <li>Who should join?</li>
            <li>What will you do at your events?</li>
        </ol>
        <input type="text" placeholder="Please erite at least 50 characters" onChange={(e) => setAbout(e.target.value)}/>
      </div>
      <h3>Final steps...</h3>
      <div id="type">
        <h4>Is this an in person or online group?</h4>
        <input type="text" placeholder="(select one)" onChange={(e) => setType(e.target.value)}/>
      </div>
      <div id="private">
        <h4>Is this group private or public?</h4>
        <input type="text" placeholder="(select one)" onChange={(e) => setPrivate(e.target.value)}/>
      </div>
      <div id="img">
        <h4>Please add an image url for your group below:</h4>
        <input type="text" placeholder="Image Url" />
      </div>
    </form>
  );
};

export default GroupFormPage;
