import * as React from "react";
import { Provider } from "react-redux";
import store from "../../store";

// components
import Header from "../Header/Header";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <React.Fragment>
            <Header />
          </React.Fragment>
        </div>
      </Provider>
    );
  }
}

export default App;
