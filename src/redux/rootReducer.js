import { combineReducers } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import putSlice from "./putSlice";
import getSlice from "./getSlice";

const rootReducer = combineReducers({
  getSlice: getSlice,
  postSlice: postSlice,
  putSlice: putSlice,
});

export default rootReducer;
