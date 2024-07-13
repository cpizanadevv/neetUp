import { csrfFetch } from "./csrf";

//*  ACTIONS
export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const deleteSessionUser = (user) => ({
  type: "DELETE_USER",
  payload: user,
});

// export const signUpUser = (user) => ({
//   type: "SIGN_UP_USER",
//   payload: user
// })

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
    dispatch(setUser(session.user));
    return res;
  }
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
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
