import { csrfFetch } from "./csrf";

//*  ACTIONS
export const getAllGroups = (groups) => ({
  type: "GET_ALL_GROUPS",
  groups,
});

export const getGroup = (group) => ({
  type: "GET_GROUP",
  group,
});

export const createNewGroup = (group) => ({
  type: "CREATE_GROUP",
  group,
});

export const updatedGroup = (group) => ({
  type: "UPDATE_GROUP",
  group,
});

export const deleteGroup = () => ({
  type: "DELETE_GROUP",
});
export const addGroupImg = (img) => ({
  type: "ADD_IMG",
  group
});



// * THUNK

export const getGroups = () => async (dispatch) => {
    const res = await csrfFetch('/api/groups');
    // console.log(res)
    if (res.ok) {
        const groups = await res.json();
        // console.log("THIS IS GROUPS insode thunk",groups)
        dispatch(getAllGroups(groups))
        return groups
    }
}

export const getGroupById = (groupId) => async (dispatch) => {
    const res = await csrfFetch(`/api/groups/${groupId}`);
    // console.log("RES IN THUNK", res)
    if (res.ok) {
      const group = await res.json();
      dispatch(getGroup(group));
      return group;
    }
}

export const createGroup = (group) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/groups", {
      method: 'POST',
      body: JSON.stringify(group),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log("THiS RES IN THINK" , res)
    if(res.ok) {
      const newGroup = await res.json();
      dispatch(createNewGroup(newGroup))
    }
    
  } catch (error) {
    const errors = await error.json()
    console.log("THIS IS ERRORS: ",errors.errors)
      return { errors }
  }
    
}

export const deleteCurrentGroup = (group,id) => async (dispatch) => {
  const res = await csrfFetch(`api/groups/${id}`,{
    method: 'DELETE'
  })
  if(res.ok){
    const deletedGroup = await res.json();
    dispatch(deleteGroup(deletedGroup))
  }
}

export const updateGroup = (group) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/groups", {
      method: 'PUT',
      body: JSON.stringify(group),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(res.ok) {
      const updated = await res.json();
      dispatch(updatedGroup(updated))
    }
  } catch (error) {
    const errors = await error.json()
    return { errors }
  }
}

export const createImg = (img) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/groups/:${img.groupId}/images`, {
      method: 'POST',
      body: JSON.stringify(img),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(res.ok) {
      const img = await res.json();
      dispatch(addGroupImg(img))
    }
  } catch (error) {
    const errors = await error.json()
    return { errors }
  }
}


// * Reducer
const initialState = {
  groups: [],
  group: {}
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_GROUPS":
      return {
        ...state,
        groups: action.groups,
      };
    case "GET_GROUP":
      return {
        ...state,
        group: action.group,
      };
    case "CREATE_GROUP":
      return {
        ...state,
        group: action.group,
      };
    case "UPDATE_GROUP":
      return {
        ...state,
        group: action.group,
      };
    case "ADD_IMG":
      return {
        ...state,
        group: action.group,
      };
    case "DELETE_GROUP":
      return {
        ...state,
        group: null,
      };
    default:
      return state;
  }
};

export default groupReducer;
