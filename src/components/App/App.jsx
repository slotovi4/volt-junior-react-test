import * as React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { browserHistory } from "react-router";

// components
import Header from "../Header/Header";
import Customers from "../Customers/Customers";
import Products from "../Products/Products";
import Invoices from "../Invoices/Invoices";
import NotFound from "../NotFound/NotFound";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <React.Fragment>
            <Header />
            <Switch>
              <Route exact path="/customers" component={Customers} />
              <Route exact path="/products" component={Products} />
              <Route exact path="/" component={Invoices} />
              <Route path="*" component={NotFound} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
