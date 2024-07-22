import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as eventActions from "../../store/event";
// import * as groupActions from "../../store/group";
import { FaCircleDollarToSlot } from "react-icons/fa6";

const EventFormPage = () => {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errs, setErrs] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState();
  const [price, setPrice] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [img, setImg] = useState("");

  const group = useSelector((state)=> state.group.group)

  // const group = groupActions.getGroupById(groupId);
  // console.log("THIS IS GROUP: ", group);

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
    // console.log(parseDateTime(startDate))
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    const venueId = getRandomInt(19);

    const event = {
      venueId,
      name,
      description,
      type,
      capacity,
      price,
      startDate,
      endDate
    };

    const result = await dispatch(eventActions.createEvent(event, groupId));

    console.log("jc result", result)

    if (result && result.errors) {
      setErrs(result.errors.errors);
      console.log(result.errors.errors)
    } else {
      const eventId = result.id;

      if (validateImageUrl(img)) {
        const eventImg = { url: img, preview: true, eventId };
        await dispatch(eventActions.createImg(eventImg));
      }
      reset();
      navigate(`/events/${eventId}`);
    }
  };

  const reset = () => {
    setErrs({});
    setName("");
    setDescription("");
    setType("");
    setCapacity("");
    setPrice("");
    setStartDate("");
    setEndDate("");
    setImg("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new Event for {group.name}</h2>
      <div id="name">
        <h4>What is the name of your event?</h4>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {errs.name && <p className="err">{errs.name}</p>}
      <hr />
      <div id="type">
        <h4>Is this an in person or online group?</h4>
        <select
          placeholder="(select one)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>(select one)</option>
          <option value="In Person">In Person</option>
          <option value="Online">Online</option>
        </select>
      </div>
      {errs.type && <p className="err">{errs.type}</p>}
      <div id="price">
        <h4>What is the price for your event?</h4>
        <div id="priceInput">
          <FaCircleDollarToSlot />
          <input
            placeholder="0"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      {errs.price && <p className="err">{errs.price}</p>}
      <div id="capacity">
        <h4>How many can attend?</h4>
        <div id="capacity-input">
          <input
            placeholder="0"
            type="text"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
      </div>
      {errs.capacity && <p className="err">{errs.capacity}</p>}
      <hr />
      <div id="date">
        <div id="startDate">
          <h4>When does your event start?</h4>
          <input
            type="text"
            placeholder="MM/DD/YYYY HH:MM AM|PM"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        {errs.startDate && <p className="err">{errs.startDate}</p>}
        <div id="endDate">
          <h4>When does your event end?</h4>
          <input
            type="text"
            placeholder="MM/DD/YYYY HH:MM AM|PM"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {errs.endDate && <p className="err">{errs.endDate}</p>}
      </div>
      <hr />
      <div id="img">
        <h4>Please add in image url for your event below</h4>
        <input
          type="text"
          placeholder="Image Url"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      </div>
      {errs.img && <p className="err">{errs.img}</p>}
      <div id="about">
        <h4>Please describe your event:</h4>
        <textarea
          type="text"
          placeholder="Please write at least 50 characters"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {errs.description && <p className="err">{errs.description}</p>}
      <hr />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventFormPage;
