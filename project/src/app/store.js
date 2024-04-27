// store.js
import { createStore, combineReducers } from 'redux';
import authReducer from '../reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Other reducers...
});

const store = createStore(rootReducer);

export default store; // Exporting the store as the default export
