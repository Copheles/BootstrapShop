import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rating: null,
  brands: "",// Apple,Amamzon,Google
  soldAmount: "",
  countInStock: "",
  category: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setBrands: (state, action) => {
      if (state.brands.length === 0) {
        state.brands = action.payload;
      } else {
        let brands = state.brands.split(',');
        if(brands.includes(action.payload)){
          const filterBrands = brands.filter((brand) => brand !== action.payload)
          brands = filterBrands
        }else{
          brands.push(action.payload)
        }
        state.brands = brands.join(",")
      }
    },
    clearAll: (state) => {
      state.brands = "";
      state.rating = 0;
    },
  },
});

export const { setRating, setBrands, clearAll } = filterSlice.actions;

export default filterSlice.reducer;
