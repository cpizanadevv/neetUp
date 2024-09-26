import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as eventActions from "../../store/event";
import { useModal } from "../../context/Modal";

function DeleteEventModal() {
  const dispatch = useDispatch();
  const [decision, setDecision] = useState(false);
  const [setErrs] = useState({});
  const event = useSelector((state) => state.event.event);
  
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (decision === true) {
      if (event.id > -1) {
        console.log("dispatching delete")
        return dispatch(eventActions.deleteCurrentEvent(event.id))
          .then(() => {
            console.log("delete fulfilled")
            closeModal();
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
              setErrs(data.errors);
            }
          });
      }
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {" "}
          <h3>Are you sure you want to remove this event?</h3>
          <div>
            <button
              id="delete"
              type="submit"
              value={decision}
              onClick={() => setDecision(true)}
            >
              Yes (Delete Event)
            </button>
            <button
              id="keep"
              type="submit"
              value={decision}
              onClick={() => setDecision(false)}
            >
              No (Keep Event)
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteEventModal;
