import { csrfFetch } from "./csrf";

//*  ACTIONS
export const getAllGroups = (groups) => ({
  type: "GET_ALL_GROUPS",
  payload: groups,
});

export const getGroup = (group) => ({
  type: "GET_GROUP",
  payload: group,
});

export const deleteGroup = () => ({
  type: "DELETE_GROUP",
});



// * THUNK

export const getGroups = () => async (dispatch) => {
    console.log("INSIDE THE THUNK")
    const res = await csrfFetch('/api/groups');
    console.log(res)
    if (res.ok) {
        const groups = await res.json();
        // console.log("THIS IS GROUPS insode thunk",groups)
        dispatch(getAllGroups(groups))
        return groups
    }
}

export const getGroupById = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}`);

    if (res.ok) {
        const group = await res.json();
        dispatch(getGroup(group))
        return group
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
        groups: action.payload,
      };
    case "GET_GROUP":
      return {
        ...state,
        group: action.payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default groupReducer;
