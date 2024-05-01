import { createSlice } from "@reduxjs/toolkit";

// Retrieve notiCount from localStorage
const storedNotiCount = localStorage.getItem("notiCount");

// Initialize state object with notiCount
// const initialState = storedNotiCount
//   ? { notiCount: JSON.parse(storedNotiCount) } // Parse the stored value
//   : { notiCount: 0 }; // Default value if not found

const initialState = {
  notiCount: storedNotiCount ? JSON.parse(storedNotiCount) : 0
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotiCount1: (state, action) => {
      state.notiCount = action.payload;
      localStorage.setItem("notiCount", JSON.stringify(state.notiCount)); // Store the updated value
    },
  },
});

export const { setNotiCount1 } = notificationSlice.actions;

export default notificationSlice.reducer;
