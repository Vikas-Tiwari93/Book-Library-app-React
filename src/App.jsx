import "./App.css";
import Homepage from "./pages/Homepage";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./components/Styles/filterandsort.style.css";
import "./components/Styles/header.style.css";
import "./components/Styles/inputfields.style.css";
import "./components/Styles/pagination.style.css";
import "./components/Styles/mediaquery.style.css";
function App() {
  return (
    <>
      <Provider store={store}>
        <Homepage />
      </Provider>
    </>
  );
}

export default App;
