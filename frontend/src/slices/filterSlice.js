import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rating: "",
  brands: "",// Apple,Amamzon,Google
  soldAmount: "",
  countInStock: "",
  category: [],
  pageNumber: "",
  keyword: ""
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.rating = action.payload;
      state.pageNumber = 1
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload
      state.pageNumber = 1
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
      state.pageNumber = 1
    },
    clearAll: (state) => {
      state.brands = "";
      state.rating = "";
      state.keyword = ""
    },
  },
});

export const { setRating, setBrands, setKeyword, setPageNumber, clearAll } = filterSlice.actions;

export default filterSlice.reducer;
