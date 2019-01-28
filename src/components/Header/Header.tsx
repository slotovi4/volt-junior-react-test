import * as React from "react";
import { cn } from "@bem-react/classname";

// styles
import "./Header.css";

class Header extends React.Component {
  render() {
    const header = cn("Header");

    return (
      <div className={header()}>
        <span className={header("Logo")}>Invoice App</span>
        <menu>
          <li className={header("Link")}>Invoices</li>
          <li className={header("Link")}>Products</li>
          <li className={header("Link")}>Customers</li>
        </menu>
      </div>
    );
  }
}

export default Header;
