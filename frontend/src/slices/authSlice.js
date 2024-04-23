import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : localStorage.getItem("userInfo") === undefined ? null : null,
  isSocketConnected: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log('setCredential called ', action.payload);
      if(action.payload === undefined){
        action.payload = null
      }
      state.userInfo = action.payload;
      
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setSocketConnected(state, action) {
      state.isSocketConnected = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout, setSocketConnected } = authSlice.actions;

export default authSlice.reducer;
