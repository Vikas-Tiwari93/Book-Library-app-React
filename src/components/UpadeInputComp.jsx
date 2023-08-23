import { useDispatch, useSelector } from "react-redux";
import { putfetch } from "../redux/putSlice";
import { getFilterfetch } from "../redux/getSlice";

export default function UpadeInputComp({
  editElm,
  setEditElm,
  setIsEdited,
  sort,
  refreshpage,
}) {
  const dispatch = useDispatch();
  const inputupdatechangefn = (e) => {
    const newEditElm = { ...editElm };
    const { name, value } = e.target;
    newEditElm[name] = value;
    setEditElm(newEditElm);
  };
  const title = useSelector((state) => state.getSlice.title);
  const status = useSelector((state) => state.putSlice.status);
  const handleUpdateClick = async () => {
    await dispatch(putfetch({ updatedData: editElm, id: editElm.id }));
    await dispatch(
      getFilterfetch({ title: title, sort: sort, page: refreshpage })
    );
    await setIsEdited(false);
    status.status === 200
      ? alert("Updated successfully")
      : alert("Update failed");
  };
  const handleEmptyClick = () => {
    setEditElm({
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
  return (
    <div className="updateroot">
      <div className="addHead">Add / Update a book</div>
      <div className="closebtn" onClick={() => setIsEdited(false)}>
        X
      </div>
      <div className="updatediv">
        {Object.keys(editElm).map((elm, index) => {
          return (
            <div key={index} className="inputfield">
              <label>{elm}</label>
              <input
                type="text"
                name={elm}
                value={editElm[elm]}
                onChange={inputupdatechangefn}
              />
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handleUpdateClick}>Update the book</button>
        <button onClick={handleEmptyClick}>Empty the fields</button>
      </div>
    </div>
  );
}
