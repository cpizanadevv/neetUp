import { csrfFetch } from "./csrf";

//*  ACTIONS
export const getAllEvents = (events) => ({
  type: "GET_ALL_EVENTS",
  events,
});

export const eventsOfGroup = (events) => ({
  type: "GET_GROUP_EVENTS",
  events,
});

export const getEvent = (event) => ({
  type: "GET_EVENT",
  event,
});

export const createNewEvent = (event) => ({
  type: "CREATE_EVENT",
  event,
});

export const addEventImg = (img) => ({
  type: "ADD_IMG",
  img,
});

export const deleteEvent = () => ({
  type: "DELETE_EVENT",
});


// * THUNK

export const getEvents = () => async (dispatch) => {
  const res = await csrfFetch("/api/events");
  if (res.ok) {
    const eventsObj = await res.json();
    dispatch(getAllEvents(eventsObj.Events));
  }
};

export const getEventById = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`);
  console.log("THIS IS RES IN THUNK", res.body);
  if (res.ok) {
    const event = await res.json();
    dispatch(getEvent(event.Events));
    return event;
  }
};

export const createEvent = (event, groupId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/groups/${groupId}/events`, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const newEvent = await res.json();
      if (!newEvent.Group) {
        newEvent.Group = {
          Organizer: {
            firstName: "",
            lastName: "",
          },
        };
      }
      dispatch(createNewEvent(newEvent));
      return newEvent;
    }
  } catch (error) {
    const errors = await error.json();
    // console.log("THIS IS ERRORS: ",errors.errors)
    return { errors };
  }
};

export const getGroupEvents = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}/events`);
  console.log("res", res);
  if (res.ok) {
    const events = await res.json();
    console.log("thunk", events);
    dispatch(eventsOfGroup(events));
  }
};

export const createImg = (img) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/events/:${img.eventId}/images`, {
      method: "POST",
      body: JSON.stringify(img),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const image = await res.json();
      dispatch(addEventImg(image));
    }
  } catch (error) {
    const errors = await error.json();
    return { errors };
  }
};

export const deleteCurrentEvent = (eventId) => async (dispatch) => {
  // console.log("delete thunk");
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });
  // console.log("delete thunk res", res);
  if (res.ok) {
    dispatch(deleteEvent());
  }
};

// * Reducer
const initialState = {
  events: [],
  event: {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    price: 0,
    type: "",
    Group: {
      Organizer: {
        firstName: "",
        lastName: "",
      },
    },
    previewImage: "",
  },
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_EVENTS":
      return {
        ...state,
        events: action.events,
      };
    case "GET_GROUP_EVENTS":
      return {
        ...state,
        events: action.events,
      };
    case "GET_EVENT":
      return {
        ...state,
        event: action.event,
      };
    case "CREATE_EVENT":
      return {
        ...state,
        event: action.event,
      };
    case "ADD_IMG":
      return {
        ...state,
        event: action.event,
      };
    case "DELETE_EVENT":
      return {
        ...state,
        event: { delete: true },
      };
    default:
      return state;
  }
};

export default eventReducer;
