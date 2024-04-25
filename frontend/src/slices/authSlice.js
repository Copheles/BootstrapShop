import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isSocketConnected: false,
  notiCount: 0
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    setNotiCount: (state, action)=> {
      state.notiCount = action.payload
      localStorage.setItem("notiCount", JSON.stringify(action.payload))
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

export const { setCredentials, logout, setSocketConnected, setNotiCount } = authSlice.actions;

export default authSlice.reducer;
