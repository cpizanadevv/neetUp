import { csrfFetch } from "./csrf";

//*  ACTIONS
export const setSessionUser = (user) => ({
  type: "SET_SESSION_USER",
  payload: user,
});

export const deleteSessionUser = (user) => ({
  type: "DELETE_SESSION_USER",
  payload: user,
});

// * THUNK
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  if (res.ok) {
    const session = await res.json();
    dispatch(setSessionUser(session.user));
    return res;
  }
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
  const session = await res.json();
  dispatch(setSessionUser(session.user));
  return res;
};

// * Reducer
const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SESSION_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "DELETE_SESSION_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default sessionReducer;
