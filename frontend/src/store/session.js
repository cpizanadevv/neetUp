import { csrfFetch } from "./csrf";

//*  ACTIONS
export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const removeUser = () => ({
  type: "DELETE_USER",
});



// * THUNK
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  console.log("login thunk", credential, password)
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  console.log("dada", res)
  if (res.ok) {
    const session = await res.json();
    dispatch(setUser(session.user));
    return res;
  }
};

export const restoreUser = () => async (dispatch) => {
  console.log("restore thunk")
  const res = await csrfFetch("/api/session");
  console.log("baba", res)
  const session = await res.json();
  dispatch(setUser(session.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  if (res.ok) {
    const newUser = await res.json();
    dispatch(setUser(newUser));
    return res;
  }
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  if (res.ok) {
    const message = await res.json();
    console.log("logout res", message)
    dispatch(removeUser());
    return res;
  }
}


// * Reducer
const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
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

export default sessionReducer;
