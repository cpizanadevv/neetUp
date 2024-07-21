import { useState } from "react";
import { useDispatch } from "react-redux";
import * as groupActions from "../../store/group";
import * as eventActions from "../../store/event"
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

function DeleteModal() {
  const dispatch = useDispatch();
  const [decision, setDecision] = useState(false);
  const [errs, setErrs] = useState({});
  const { groupId, eventId } = useParams();

  const { closeModal } = useModal();

  let lCase;
  let uCase;

  if (groupId) {
    lCase = "group";
    uCase = "Group";
  }
  if (eventId) {
    lCase = "event";
    uCase = "Event";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (decision === "true") {
      if (groupId) {
        return dispatch(groupActions.deleteCurrentGroup(groupId))
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
              setErrs(data.errors);
            }
          });
      }

      if (eventId) {
        return dispatch(eventActions.deleteCurrentEvent(eventId))
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
              setErrs(data.errors);
            }
          });
      }
    }
    return errs;
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {" "}
          <h3>Are you sure you want to remove this {lCase}?</h3>
          <div>
            <button
              id="delete"
              type="submit"
              value={true}
              onClick={(e) => setDecision(e.target.value)}
            >
              Yes (Delete {uCase})
            </button>
            <button
              id="keep"
              type="submit"
              value={false}
              onClick={(e) => setDecision(e.target.value)}
            >
              No (Keep {uCase})
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteModal;
