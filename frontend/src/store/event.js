import { csrfFetch } from "./csrf";

//*  ACTIONS
export const getAllEvents = (events) => ({
  type: "GET_ALL_EVENTS",
  events,
});

export const getEvent = (event) => ({
  type: "GET_EVENT",
  event,
});

export const deleteEvent = () => ({
  type: "DELETE_EVENT",
});



// * THUNK

export const getEvents = () => async (dispatch) => {
    const res = await csrfFetch('/api/events');
    if (res.ok) {
      const events = await res.json();
      // console.log(events)
        dispatch(getAllEvents(events))
    }
}

export const getEventById = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`);
    if (res.ok) {
      const event = await res.json();
      dispatch(getEvent(event));
      return event
    }
}


// * Reducer
const initialState = {
  event: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_EVENTS":
      return {
        ...state,
        events: action.events,
      };
    case "GET_EVENT":
      return {
        ...state,
        event: action.event,
      };
    case "DELETE_EVENT":
      return {
        ...state,
        event: null,
      };
    default:
      return state;
  }
};

export default eventReducer;