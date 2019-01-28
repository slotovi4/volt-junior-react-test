import * as React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import Header from "../Header/Header";
import Customers from "../Customers/Customers";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Customers} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
