import * as React from "react";
import { cn } from "@bem-react/classname";
import { Link } from "react-router-dom";

// styles
import "./Header.css";

class Header extends React.Component {
  render() {
    const header = cn("Header");

    return (
      <div className={header()}>
        <div className={header("Container")}>
          <span className={header("Logo")}>Invoice App</span>
          <menu className={header("Menu")}>
            <Link to={"/invoices"} className={header("Link")}>
              Invoices
            </Link>
            <Link to={"/products"} className={header("Link")}>
              Products
            </Link>
            <Link to={"/customers"} className={header("Link")}>
              Customers
            </Link>
          </menu>
        </div>
      </div>
    );
  }
}

export default Header;
