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
  const [isPrivate, setPrivate] = useState(true);
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

    const result = await dispatch(groupActions.createGroup(group));

    if (result.errors) {
      setErrs(result.errors.errors);
      return
    } else {
      const groupId = result.id;

      if (validateImageUrl(img)) {
        const groupImg = { url: img, preview: true, groupId };
        await dispatch(groupActions.createImg(groupImg));
      }
      console.log('groupId', groupId)
      navigate(`/groups/details/${groupId}`);
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
    <form className="flex flex-col m-auto w-2/4 mt-48 font-normal gap-6" onSubmit={handleSubmit}>
      <h3 className="font-semibold">Start a New Group</h3>
      <h2>
        We&apos;ll walk you through a few steps to build your local community
      </h2>
      <hr />
      <div className="flex-column gap-2">
        <h2 className="font-semibold">First, set your group&apos;s location.</h2>
        <h4>
          neetUp groups meet locally, in person and online. We&apos;ll connect
          you with people in your area, and more can join you online
        </h4>
        <input
          type="text"
          placeholder="City, STATE"
          value={cityState}
          onChange={(e) => setCityState(e.target.value)}
          className="border-b"
        />

      {errs.city && <p className="err">{errs.city}</p>}
      {errs.state && <p className="err">{errs.state}</p>}
        <hr />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">What will your group&apos;s name be?</h2>
        <h4>
          Choose a name that will give people a clear idea of what the group is
          about. Feel free to get creative! You can edit this later if you
          change your mind.
        </h4>
        <input
          type="text"
          placeholder="What is your group name?"
          value={name}
          onChange={(e) => setName(e.target.value)}className="border-b"
        />
      </div>
      {errs.name && <p className="err">{errs.name}</p>}
      <div className="flex-column">
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
        <textarea
          className="h-48 w-full border"
          placeholder="Please write at least 50 characters"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
      {errs.about && <p className="err">{errs.about}</p>}
      </div>
      <div className="my-4 mx-0">
      <h3>Final steps...</h3>
        <h4>Is this an in person or online group?
        <select
          placeholder="(select one)"
          value={type}
          onChange={(e) => setType(e.target.value)}className="border ml-6"
        >
          <option>(select one)</option>
          <option value="In Person">In Person</option>
          <option value="Online">Online</option>
        </select></h4>
        {errs.type && <p className="err">{errs.type}</p>}
      </div>
      <div>
        <h4>Is this group private or public?
        <select
          placeholder="(select one)"
          value={isPrivate}
          onChange={(e) => setPrivate(e.target.value)}
          className="border ml-6"
        >
          <option>(select one)</option>
          <option value="true">Private</option>
          <option value="false">Public</option>
        </select></h4>
        {errs.private && <p className="err">{errs.private}</p>}
      </div>
      <div className="w-auto h-auto">
        <h4>Please add an image url for your group below:</h4>
        <input
          type="text"
          placeholder="Image Url"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
      {errs.img && <p className="err">{errs.img}</p>}
      </div>
      <hr />
      <button className="w-48 m-auto mt-4 mb-8 bg-blue-950 text-white hover:border hover:border-black hover:bg-white hover:text-black" type="submit">Create Group</button>
    </form>
  );
};

export default GroupFormPage;
