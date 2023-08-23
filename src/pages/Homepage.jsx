import { useState } from "react";
import AddInputComp from "../components/AddInputComp";
import Header from "../components/Header";
import PaginationComp from "../components/PaginationComp";
import UpadeInputComp from "../components/UpadeInputComp";
import FilterSortComponent from "../components/Filter&SortComponent";
import { useSelector } from "react-redux";

export default function Homepage() {
  const [isEdited, setIsEdited] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [editElm, setEditElm] = useState({});
  const [sort, setSort] = useState("DESC");
  const [refreshpage, setrefreshpage] = useState(1);

  const bookList = useSelector((state) => {
    return state.getSlice.BookList;
  });
  const isLoading = useSelector((state) => {
    return state.getSlice.isLoading;
  });

  return (
    <div style={{ width: "100vw" }}>
      <Header />
      <FilterSortComponent
        setIsAdded={setIsAdded}
        setSort={setSort}
        setIsFiltered={setIsFiltered}
        isFiltered={isFiltered}
      />
      <div className="sortedby">
        Sorted by: {sort !== "DESC" ? "Ascending" : "Descending"}
      </div>
      <PaginationComp
        sort={sort}
        bookList={bookList}
        setEdited={setIsEdited}
        setEditElm={setEditElm}
        isLoading={isLoading}
        isFiltered={isFiltered}
        setrefreshpage={setrefreshpage}
      />
      {isAdded ? (
        <AddInputComp
          setIsAdded={setIsAdded}
          refreshpage={refreshpage}
          sort={sort}
        />
      ) : null}
      {isEdited ? (
        <UpadeInputComp
          editElm={editElm}
          setEditElm={setEditElm}
          setIsEdited={setIsEdited}
          sort={sort}
          refreshpage={refreshpage}
        />
      ) : null}
    </div>
  );
}
