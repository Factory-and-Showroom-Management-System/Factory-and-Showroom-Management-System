// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   user: null,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: '',
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginUserStart(state) {
//       state.isLoading = true;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = '';
//     },
//     loginUserSuccess(state, action) {
//       state.user = action.payload;
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.isError = false;
//       state.message = 'Authentication successful';
//     },
//     loginUserFailure(state, action) {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = true;
//       state.message = action.payload;
//     },
//     reset(state) {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = '';
//     },
//   },
// });

// export const { loginUserStart, loginUserSuccess, loginUserFailure, reset } = authSlice.actions;

// export const loginUser = ({ username, password }) => async (dispatch) => {
//   dispatch(loginUserStart());
//   try {
//     const response = await axios.post('http://localhost:3000/users/login', {
//       username,
//       password,
//     });
//     const token = response.data.token;
//     // Store the token in local storage or cookies for subsequent requests
//     localStorage.setItem('token', token);
//     dispatch(loginUserSuccess(response.data));
//   } catch (error) {
//     dispatch(loginUserFailure(error.response.data.message));
//   }
// };

// export default authSlice.reducer;
