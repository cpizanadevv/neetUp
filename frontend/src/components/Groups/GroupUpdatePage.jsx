import { useEffect, useState } from "react";
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
    let [cityState, setCityState] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [img, setImg] = useState("");

  useEffect(() => {
    const cityStateArray = cityState.split(",").map((part) => part.trim());
    if (cityStateArray.length === 2) {
      setCity(cityStateArray[0]);
      setState(cityStateArray[1]);
    }
  }, [cityState]);


  const validImg = [".png", ".jpeg", ".jpg"];

  const validateImageUrl = (url) => {
    if (!url) {
      setErrs("Image URL is required");
      return false;
    }
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase();
    if (!validImg.includes(extension)) {
      setErrs("Image must be a .png, .jpeg, or .jpg");
      return false;
    }
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const group = { name, about, type, private: isPrivate, city, state };


    const result = await dispatch(groupActions.updateGroup(group));
    validateImageUrl(img);

    if (result.errors.errors) {
      setErrs(result.errors.errors);
    } else {
      navigate(`/groups/${result.id}`);
    }
    reset();
  };

  const reset = () => {
    setErrs({});
    setName("");
    setAbout("");
    setType("");
    setPrivate();
    setCityState("");
    setCity("");
    setState("");
    setImg("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>UPDATE YOUR GROUP&apos;S INFORMATION</h3>
      <h2>
      We&apos;ll walk you through a few steps to update your group&apos;s information

      </h2>
      <hr />
      <div id="location">
        <h2>First, set your group&apos;s location.</h2>
        <h4>
          Meetup groups meet locally, in person and online. We&apos;ll connect
          you with people in your area, and more can join you online
        </h4>
        <input
          type="text"
          placeholder="City, STATE"
          onChange={(e) => setCityState(e.target.value)}
          value={cityState}
        />
        <div className="errors">{errs.city}</div>
        <div className="errors">{errs.state}</div>
        <hr />
      </div>
      <div id="name">
        <h2>What will your group&apos;s name be?</h2>
        <h4>
          Choose a name that will give people a clear idea of what the group is
          about. Feel free to get creative! You can edit this later if you
          change your mind.
        </h4>
        <input
          type="text"
          placeholder="What is your group name?"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="errors">{errs.name}</div>
      <div id="about">
        <h2>Now describe what your group will be about</h2>
        <h4>
          People will see this when we promote your group, but you&apos;ll be
          able to add to it later, too
        </h4>
        <ol>
          <li>What&apos;s the purpose of the group?</li>
          <li>Who should join?</li>
          <li>What will you do at your events?</li>
        </ol>
        <input
          type="text"
          placeholder="Please erite at least 50 characters"
          onChange={(e) => setAbout(e.target.value)}
        />
        <div className="errors">{errs.about}</div>
      </div>
      <h3>Final steps...</h3>
      <div id="type">
        <h4>Is this an in person or online group?</h4>
        <select placeholder="(select one)"
          onChange={(e) => setType(e.target.value)}>
            <option >(select one)</option>
            <option value="In Person">In Person</option>
            <option value="Online">Online</option>
          </select>
        <div className="errors">{errs.type}</div>
      </div>
      <div id="private">
        <h4>Is this group private or public?</h4>
        <select placeholder="(select one)"
          onChange={(e) => setPrivate(e.target.value)}>
            <option >(select one)</option>
            <option value='true' >Private</option>
            <option value='false'>Public</option>
          </select>
        <div className="errors">{errs.private}</div>
      </div>
      <hr />
      <button type="submit">Update Group</button>
    </form>
  );
};

export default GroupFormPage;
