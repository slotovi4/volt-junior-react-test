import * as React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  componentWillMount() {
    document.title = "NotFound";
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          {" "}
          Page NotFound. Go to <Link to="/">HOME</Link>?
        </h1>
      </div>
    );
  }
}

export default NotFound;
