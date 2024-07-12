
//*  ACTIONS
export const setSessionUser = (user) => ({
  type: "SET_SESSION_USER",
  user,
});

export const deleteSessionUser = (user) => ({
    type: "DELETE_SESSION_USER",
    user
})


// * THUNK

// export const getSession = () => async (dispatch) =>{
//     const res = await fetch('/api/session')
    
//     if(res.ok){
//         const userSession = await res.json();
//         dispatch(setSessionUser(userSession))
//     }
// }

export const login = (user) => async (dispatch)=>{
    const res = await fetch('/api/session',{
        method: "POST",
        headers: {
            'ContentType': 'application/json'
        },
        body:{
            credential,
            password
        }
    })

    if (res.ok) {
        const user = res.json()
        dispatch(setSessionUser(user))
    }
}


// * Reducer
const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SESSION_USER":
      return {
        ...state,
        [action.user.id]: action.user
      };
    case "DELETE_SESSION_USER":
        {
            const newState = {...state}
            delete newState[action.userId];
            return newState;
        }
    default:
      return state;
  }
};


export default sessionReducer;