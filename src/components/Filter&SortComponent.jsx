import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtitle } from "../redux/getSlice";

export default function FilterSortComponent({
  setIsAdded,
  setSort,
  setIsFiltered,
  isFiltered,
}) {
  const dispatch = useDispatch();
  const changefilterfn = () => {
    setIsFiltered(!isFiltered);
  };
  return (
    <div className="filterRoot">
      <div className="btnroot">
        {" "}
        <span>
          <input
            className="titleInput"
            type="text"
            onChange={(e) => dispatch(addtitle(e.target.value))}
          />
          <button onClick={changefilterfn}>Filter by Title</button>
        </span>
        <button onClick={() => setSort("ASC")}>Sort by Assending</button>
        <button onClick={() => setSort("DESC")}>Sort by Decending </button>
      </div>
      <div className="addbtn">
        <button onClick={() => setIsAdded(true)}>Add New Book to List</button>
      </div>
    </div>
  );
}
