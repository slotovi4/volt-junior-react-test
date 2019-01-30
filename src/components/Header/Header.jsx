import * as React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <span className="navbar-brand">Invoice App</span>
          <ul className="navbar-nav nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Invoices
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/customers"} className="nav-link">
                Customers
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
