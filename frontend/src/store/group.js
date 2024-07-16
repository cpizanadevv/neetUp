import { csrfFetch } from "./csrf";

//*  ACTIONS
export const getAllGroups = (group) => ({
  type: "GET_ALL_GROUPS",
  payload: group,
});

export const getGroup = (group) => ({
  type: "GET_GROUPS",
  payload: group,
});

export const deleteGroup = () => ({
  type: "DELETE_GROUP",
});



// * THUNK

export const getGroups = () => async (dispatch) => {
    const res = await csrfFetch('/api/groups');

    if (res.ok) {
        const groups = res.json();
        dispatch(getAllGroups(groups))
        return groups
    }
}


// * Reducer
const initialState = {
  groups: null,
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_GROUPS":
      return {
        ...state,
        group: action.payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
      };
    // case 'SIGN_UP_USER'
    default:
      return state;
  }
};

export default groupReducer;
