import { createSlice } from "@reduxjs/toolkit";
import { formatMultipleSelectInput } from "../utils/formatMultipleSelectInput";

const initialState = {
  rating: "",
  brands: "", // Apple,Amamzon,Google
  soldAmount: "",
  countInStock: "",
  category: "",
  pageNumber: "",
  keyword: "",
  sort: "-createdAt",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
      state.pageNumber = 1;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
      state.pageNumber = 1;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
      state.pageNumber = 1;
    },
    setBrands: (state, action) => {
      state.brands = formatMultipleSelectInput(state.brands, action.payload);
      state.pageNumber = 1;
    },
    setCategories: (state, action) => {
      state.category = formatMultipleSelectInput(
        state.category,
        action.payload
      );
      state.pageNumber = 1;
    },
    clearAll: (state) => {
      state.brands = "";
      state.rating = "";
      state.keyword = "";
    },
  },
});

export const {
  setSort,
  setRating,
  setBrands,
  setCategories,
  setKeyword,
  setPageNumber,
  clearAll,
} = filterSlice.actions;

export default filterSlice.reducer;
