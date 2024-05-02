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
  price: 0,
  maxPrice: 0
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
    setBrand: (state, action ) => {
      state.brands = action.payload
    },
    setCategories: (state, action) => {
      state.category = formatMultipleSelectInput(
        state.category,
        action.payload
      );
      state.pageNumber = 1;
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setPrice: (state, action) => {
      state.price = action.payload
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload
    },
    clearAll: (state) => {
      state.brands = "";
      state.rating = "";
      state.keyword = "";
      state.pageNumber = 1;
      state.category = ""
      state.price = state.maxPrice
    },
  },
});

export const {
  setSort,
  setRating,
  setBrands,
  setBrand,
  setCategories,
  setCategory,
  setPrice,
  setMaxPrice,
  setKeyword,
  setPageNumber,
  clearAll,
} = filterSlice.actions;

export default filterSlice.reducer;
