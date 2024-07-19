import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as eventActions from "../../store/event";
import { FaCircleDollarToSlot } from "react-icons/fa6";

const EventFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errs, setErrs] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  let [capacity, setCapacity] = useState("");
  let [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [img, setImg] = useState("");
  

  const group = useSelector((state) => state.group.group || {});
  const groupId = group.id; // Get groupId from the group object


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


  const parseDateTime = (dateTimeStr) => {
    const [datePart, timePart, modifier] = dateTimeStr.split(" ");
    const [month, day, year] = datePart.split("/");
    let [hours, minutes] = timePart.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${hours}:${minutes}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const event = { 
        name,
        description,
        type,
        capacity,
        price,
        startDate: parseDateTime(startDate),
        endDate: parseDateTime(endDate),
   };

    const result = await dispatch(eventActions.createEvent(event,groupId));

    
    if(validateImageUrl(img)){
        await dispatch(eventActions.createImg(groupImg))
  
      }

    if (result.errors.errors) {
      setErrs(result.errors.errors);
    } else {
      const eventId = result.id;

      if (validateImageUrl(img)) {
        const eventImg = { url: img, preview: true, eventId };
        await dispatch(eventActions.createImg(eventImg));
      }
      navigate(`/events/${result.id}`);
    }
    reset();
  };

  const reset = () => {
    setErrs({});
    setName("");
    setDescription("");
    setType("");
    setPrivate();
    setPrice("");
    setStartDate("");
    setEndDate("");
    setImg("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a new Event for {group.id}</h2>
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
        <select
          placeholder="(select one)"
          onChange={(e) => setType(e.target.value)}
        >
          <option>(select one)</option>
          <option value="In Person">In Person</option>
          <option value="Online">Online</option>
        </select>
        <div className="errors">{errs.type}</div>
      </div>
      <div id="price">
        <h4>What is the price for your event?</h4>
        <div id="priceInput">
          <FaCircleDollarToSlot />
          <input type="text" onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="errors">{errs.price}</div>
      </div>
      <hr />
      <div id="date">
        <div id="startDate">
            <h4>When does your event start?</h4>
          <input type="text" placeholder="MM/DD/YYY HH/mm AM/PM"  onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="errors">{errs.startDate}</div>
        <div id="endDate">
            <h4>When does your event end?</h4>
          <input type="text" placeholder="MM/DD/YYY HH/mm AM/PM" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="errors">{errs.endDate}</div>
      </div>
      <hr />
      <div id="img">
        <h4>Please add in image url for your event below</h4>
        <input type="text" placeholder="Image Url" onChange={(e) => setImg(e.target.value)} />
      </div>
      <div className="errors">{errs.img}</div>
      <div id="about">
        <h4>Please describe your event:</h4>
        <textarea
          type="text"
          placeholder="Please write at least 50 characters"
          onChange={(e) => setAbout(e.target.value)}
        />
        <div className="errors">{errs.description}</div>
      </div>
      <hr />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventFormPage;
