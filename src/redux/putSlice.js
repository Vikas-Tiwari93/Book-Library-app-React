import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: {},
  isLoading: false,
};

export const putfetch = createAsyncThunk(
  "putfetch",
  async ({ updatedData, id }) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchData = await axios.put(
      `http://68.178.162.203:8080/application-test-v1.1/books/${id}`,
      updatedData,
      headers
    );

    return fetchData.data;
  }
);

const putSlice = createSlice({
  name: "putSlice",
  initialState,
  reducers: {
    isSearchedReducer: (state, action) => {
      state.Searched = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(putfetch.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(putfetch.fulfilled, (state, action) => {
        state.status = action.payload;
        state.isLoading = false;
      }),
      builder.addCase(putfetch.rejected, (state) => {
        state.isLoading = false;
        console.log("putfetch API failed");
      });
  },
});

export default putSlice.reducer;
