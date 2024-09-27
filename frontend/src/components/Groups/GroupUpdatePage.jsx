import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as groupActions from "../../store/group";

const GroupFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const group = useSelector((state) => state.group.group);
  const groupImg = group?.GroupImages?.findLast((image) =>  image.preview === true).url;
  const [errs, setErrs] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(group.name || '');
  const [about, setAbout] = useState(group.about || '');
  const [type, setType] = useState(group.type || '');
  const [isPrivate, setPrivate] = useState(group.private);
  let [cityState, setCityState] = useState(`${group.city}, ${group.state}` || '');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [img, setImg] = useState(groupImg || '');
  const { groupId } = useParams();
  console.log("IMG", img)

  useEffect(() => {
    dispatch(groupActions.getGroupById(groupId));
    if (group){
      setIsLoading(true)

    }

  }, [dispatch,groupId]);

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
  const cityStateArray = cityState.split(",").map((part) => part.trim());
      if (cityStateArray.length === 2) {
        setCity(cityStateArray[0]);
        setState(cityStateArray[1]);
      }
    const updateGroup = {};

    updateGroup.name = name ? name : group.name;
    updateGroup.about = about ? about : group.about;
    updateGroup.type = type ? type : group.type;
    updateGroup.private = isPrivate !== undefined ? isPrivate : group.private;
    updateGroup.city = city ? city : group.city;
    updateGroup.state = state ? state : group.state;

    const result = await dispatch(groupActions.updateGroup(updateGroup, groupId));
    validateImageUrl(img);

    if (result.errors) {
      setErrs(result.errors.errors);
    } else {

      if (validateImageUrl(img)) {
        const groupImg = { url: img, preview: true, groupId };
        await dispatch(groupActions.createImg(groupImg));
      }
      navigate(`/groups/${groupId}`);
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
    setIsLoading(false)
  };
  return (
    <div>
    {isLoading && (
      <form onSubmit={handleSubmit}>
        <h3>UPDATE YOUR GROUP&apos;S INFORMATION</h3>
        <h2>
          We&apos;ll walk you through a few steps to update your group&apos;s
          information
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
            value={name}
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
            placeholder="Please write at least 50 characters"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <div className="errors">{errs.about}</div>
        </div>
        <h3>Final steps...</h3>
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
          <div className="errors">{errs.type}</div>
        </div>
        <div id="private">
          <h4>Is this group private or public?</h4>
          <select
            placeholder="(select one)"
            value={isPrivate}
            onChange={(e) => setPrivate(e.target.value)}
          >
            <option>(select one)</option>
            <option value="true">Private</option>
            <option value="false">Public</option>
          </select>
          <div className="errors">{errs.private}</div>
        </div>
        <div id="img">
          <h4>Please add an image url for your group below:</h4>
          <input
            type="text"
            placeholder="Image Url"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <div className="errors">{errs.img}</div>
        </div>
        <hr />
        <button type="submit">Update Group</button>
      </form>
  )}
    </div>
  )
};

export default GroupFormPage;
