import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  BookList: [],
  title: "",
  Searched: false,
  isLoading: false,
};

export const getfetch = createAsyncThunk("getfetch", async ({ page, sort }) => {
  const fetchData = await axios.get(
    `http://68.178.162.203:8080/application-test-v1.1/books?page=${page}&DIR=${sort}`
  );
  console.log("get response", fetchData.data);
  return fetchData.data;
});
export const getFilterfetch = createAsyncThunk(
  "getFilterfetch",
  async ({ title, sort, page }) => {
    const fetchData = await axios.get(
      `http://68.178.162.203:8080/application-test-v1.1/books?page=${page}&title=${title}&DIR=${sort}`
    );
    console.log("get response", fetchData.data);
    return fetchData.data;
  }
);

const getSlice = createSlice({
  name: "getSlice",
  initialState,
  reducers: {
    addtitle: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getfetch.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getfetch.fulfilled, (state, action) => {
        state.BookList = [...action.payload.data];
        state.isLoading = false;
      }),
      builder.addCase(getfetch.rejected, (state) => {
        state.isLoading = false;
        console.log("getfetch API failed");
      }),
      builder.addCase(getFilterfetch.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(getFilterfetch.fulfilled, (state, action) => {
        state.BookList = [...action.payload.data];
        state.isLoading = false;
      }),
      builder.addCase(getFilterfetch.rejected, (state) => {
        state.isLoading = false;
        console.log("getFilterfetch API failed");
      });
  },
});

export default getSlice.reducer;
export const { addtitle } = getSlice.actions;
