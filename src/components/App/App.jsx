import * as React from "react";
import { Provider } from "react-redux";
import store from "../../store";

// components
import Header from "../Header/Header";
import Customers from "../Customers/Customers";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <React.Fragment>
            <Header />
            <Customers />
          </React.Fragment>
        </div>
      </Provider>
    );
  }
}

export default App;
