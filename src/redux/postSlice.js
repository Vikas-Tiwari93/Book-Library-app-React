import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const initialState = {
  status: {},
  isLoading: false,
};

export const postfetch = createAsyncThunk(
  "postfetch",
  async (reqBody, action) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("action", reqBody, action);

    const fetchData = await axios.post(
      "http://68.178.162.203:8080/application-test-v1.1/books",
      { ...reqBody },
      header
    );
    console.log("post response:", fetchData.data);

    return fetchData.data;
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    isSearchedReducer: (state, action) => {
      state.Searched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postfetch.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(postfetch.fulfilled, (state, action) => {
        state.status = action.payload;
        state.isLoading = false;
      }),
      builder.addCase(postfetch.rejected, (state) => {
        state.isLoading = false;
        console.log("postfetch API failed");
      });
  },
});

export default postSlice.reducer;
