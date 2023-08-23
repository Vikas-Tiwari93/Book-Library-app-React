import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postfetch } from "../redux/postSlice";
import { getFilterfetch } from "../redux/getSlice";

export default function AddInputComp({
  setIsAdded,
  setEditElm,
  sort,
  refreshpage,
}) {
  const [inputdata, setinputdata] = useState({
    author: "",
    country: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
    id: "",
  });

  const handleEmptyClick = () => {
    setinputdata({
      author: "",
      country: "",
      language: "",
      link: "",
      pages: "",
      title: "",
      year: "",
      id: "",
    });
  };
  const status = useSelector((state) => state.postSlice.status);
  const title = useSelector((state) => state.getSlice.title);
  const dispatch = useDispatch();
  const inputchangefn = (e) => {
    const { name, value } = e.target;
    const newinputdata = { ...inputdata };
    newinputdata[name] = value;
    setinputdata(newinputdata);
  };
  const handleClick = async () => {
    await dispatch(postfetch(inputdata));
    await dispatch(
      getFilterfetch({ title: title, sort: sort, page: refreshpage })
    );
    status.status === 200
      ? alert("Updated successfully")
      : alert("Update failed");
    setIsAdded(false);
  };

  console.log(inputdata);
  return (
    <div className="updateroot">
      <div className="addHead">Add a Book</div>
      <div className="closebtn" onClick={() => setIsAdded(false)}>
        X
      </div>
      <div className="updatediv">
        {Object.keys(inputdata).map((elm, index) => {
          return (
            <div key={index} className="inputfield">
              <label>{elm}</label>
              <input
                type="text"
                name={elm}
                value={inputdata[elm]}
                onChange={inputchangefn}
              />
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handleClick}>Add to Original list</button>
        <button onClick={handleEmptyClick}>Empty input feilds</button>
      </div>
    </div>
  );
}
