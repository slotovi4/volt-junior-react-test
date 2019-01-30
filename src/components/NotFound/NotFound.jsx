import * as React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.Component {
  componentWillMount() {
    document.title = "NotFound";
  }

  render() {
    return (
      <div>
        Page NotFound. Go to <Link to="/">home</Link>?
      </div>
    );
  }
}

export default NotFound;
