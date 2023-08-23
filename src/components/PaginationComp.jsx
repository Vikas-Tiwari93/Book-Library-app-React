import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerDotted } from "spinners-react";
import { getfetch } from "../redux/getSlice";
import { getFilterfetch } from "../redux/getSlice";

export default function PaginationComp({
  bookList,
  setEdited,
  setEditElm,
  isLoading,
  sort,
  isFiltered,
  setrefreshpage,
}) {
  const [page, setpage] = useState(1);
  const [pageIncrease, setPageIncrease] = useState(0);
  const dispatch = useDispatch();
  const title = useSelector((state) => {
    return state.getSlice.title;
  });

  const changepagefn = (i) => {
    if (page !== i + 1) {
      setpage(i + 1);
      setrefreshpage(i + 1);
    }
  };

  const decreasebtn = () => {
    console.log(page, pageIncrease);
    if (pageIncrease > 5) {
      setPageIncrease(pageIncrease - 6);
    }
  };

  const increasebtn = () => {
    console.log(pageIncrease);
    if (page < 54) {
      setPageIncrease(pageIncrease + 6);
    }
  };

  useEffect(() => {
    !title
      ? dispatch(getfetch({ page: String(page), sort: sort }))
      : dispatch(
          getFilterfetch({ title: title, sort: sort, page: String(page) })
        );

    window.scrollTo({ top: 0, behaviour: "smooth" });
  }, [page, isFiltered, sort]);

  const editFunction = async (element) => {
    await setEditElm(element);
    await setEdited(true);
    window.scrollTo({ top: 0, behaviour: "smooth" });
  };
  return (
    <div>
      {isLoading ? (
        <div className="spinner">
          <SpinnerDotted size="150" thickness="100" сolor="red" />
        </div>
      ) : (
        <div className="paginationRoot">
          <div className="cardRoot">
            {bookList.map((elm, index) => {
              return (
                <div key={elm.id} className="eachbook">
                  <span className="id">
                    ID: <span>{elm.id}</span>
                  </span>
                  <span className="title">
                    Title: <span>{elm.title}</span>
                  </span>
                  <span className="author">
                    Author: <span> {elm.author}</span>
                  </span>
                  <span className="language">
                    Language: <span> {elm.language}</span>
                  </span>
                  <span className="year">
                    Year: <span>{elm.year}</span>{" "}
                  </span>
                  <span className="editbook" onClick={() => editFunction(elm)}>
                    {" "}
                    Edited
                  </span>
                </div>
              );
            })}
          </div>
          <div className="pageno">Page no: {page}</div>
          <div className="pagesButton">
            <button onClick={decreasebtn}>Previous</button>
            {[...Array(6)].map((_, i) => {
              return (
                <button key={i} onClick={() => changepagefn(pageIncrease + i)}>
                  {pageIncrease + i + 1}
                </button>
              );
            })}
            <button onClick={increasebtn}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
