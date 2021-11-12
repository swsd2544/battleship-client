import ReactDOM from "react-dom";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";

function Index() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
