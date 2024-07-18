import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as eventActions from "../../store/event";
import { FaCircleDollarToSlot } from "react-icons/fa6";

const GroupFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errs, setErrs] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [isPrivate, setPrivate] = useState();
  let [capacity, setCapacity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [img, setImg] = useState("");
  const group = useSelector((state) => state.group.groups);
  console.log(group)

  const validImg = [".png", ".jpeg", ".jpg"];

  const validateImageUrl = (url) => {
    if (!url) {
      setErrors("Image URL is required");
      return false;
    }
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase();
    if (!validImg.includes(extension)) {
      setErrors("Image must be a .png, .jpeg, or .jpg");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const event = { name, about, type, private: isPrivate, city, state };

    const result = await dispatch(eventActions.createEvent(event));

    if (result.errors.errors) {
      setErrs(result.errors.errors);
    } else {
      navigate(`/events/${result.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new Event for {group.id}
      </h2>
      <div id="name">
        <h4>What is the name of your event?</h4>
        <input
          type="text"
          placeholder="Event Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="errors">{errs.name}</div>
      <hr />
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
      <div id="price">
        <h4>What is the price for your event?</h4>
        <div id="priceInput">
        <FaCircleDollarToSlot /> 
            <input type="text" />
        </div>
        
      </div>
      <hr />
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
          placeholder="Please write at least 50 characters"
          onChange={(e) => setAbout(e.target.value)}
        />
        <div className="errors">{errs.about}</div>
      </div>
      <hr />
      <button type="submit">Update Group</button>
    </form>
  );
};

export default GroupFormPage;
