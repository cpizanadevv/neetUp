import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/group";
import { useModal } from "../../context/Modal";

function DeleteModal() {
  const dispatch = useDispatch();
  const [decision, setDecision] = useState(false);
  const [setErrs] = useState({});
  const group = useSelector((state) => state.group.group);
  
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (decision === true) {
      if (group.id > -1) {
        console.log("dispatching delete")
        return dispatch(groupActions.deleteCurrentGroup(group.id))
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
          <h3>Are you sure you want to remove this group?</h3>
          <div>
            <button
              id="delete"
              type="submit"
              value={decision}
              onClick={() => setDecision(true)}
            >
              Yes (Delete Group)
            </button>
            <button
              id="keep"
              type="submit"
              value={decision}
              onClick={() => setDecision(false)}
            >
              No (Keep Group)
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteModal;
