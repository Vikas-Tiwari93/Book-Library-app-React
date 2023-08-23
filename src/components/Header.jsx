import React from "react";
import { useDispatch } from "react-redux";
import { getfetch } from "../redux/getSlice";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <div className="headerRoot">
      <span className="logo">Book library</span>
      <span>
        <button>All Book List</button>
      </span>
    </div>
  );
}
