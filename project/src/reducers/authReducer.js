// reducers/authReducer.js
const initialState = {
    role: null,
    // Other auth-related state properties...
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          role: action.payload.role,
          // Update other auth-related state properties...
        };
      // Other cases...
      default:
        return state;
    }
  };
  
  export default authReducer;
  