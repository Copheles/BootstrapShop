import { createSlice } from "@reduxjs/toolkit";

// Retrieve notiCount from localStorage
const storedNotiCount = localStorage.getItem("notiCount");

// Initialize state object with notiCount
const initialState = storedNotiCount
  ? { notiCount: JSON.parse(storedNotiCount) } // Parse the stored value
  : { notiCount: 0 }; // Default value if not found

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotiCount: (state, action) => {
      state.notiCount = action.payload;
      localStorage.setItem("notiCount", JSON.stringify(state.notiCount)); // Store the updated value
    },
  },
});

export const { setNotiCount } = notificationSlice.actions;

export default notificationSlice.reducer;
