import * as React from "react";
import { connect } from "react-redux";
import { changeCustomer } from "../../../actions/customersActions";

class CustomersChange extends React.Component {
  state = {
    name: "",
    address: "",
    phone: ""
  };

  async componentDidMount() {
    const { customer } = this.props;

    this.setState({
      name: customer.name,
      address: customer.address,
      phone: customer.phone
    });
  }

  render() {
    const { close } = this.props;
    const { name, address, phone } = this.state;

    return (
      <div>
        <form onSubmit={this.change}>
          <input
            type="text"
            name="name"
            placeholder="Customer name..."
            onChange={this.changeInput}
            required
            defaultValue={name}
          />
          <input
            type="text"
            name="address"
            placeholder="Customer address..."
            onChange={this.changeInput}
            required
            defaultValue={address}
          />
          <input
            type="tel"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="Customer phone xxx-xxx-xxxx"
            onChange={this.changeInput}
            required
            defaultValue={phone}
          />
          <input type="submit" value="Change" />
        </form>
        <span onClick={() => close()}>Close</span>
      </div>
    );
  }

  change = e => {
    e.preventDefault();
    const { customer } = this.props;
    const { name, address, phone } = this.state;

    if (
      name !== customer.name ||
      address !== customer.address ||
      phone !== customer.phone
    ) {
      const currentDate = this.getCurrentDate();

      const updatedCustomer = {};

      updatedCustomer.name = name;
      updatedCustomer.address = address;
      updatedCustomer.phone = phone;
      updatedCustomer.id = customer.id;
      updatedCustomer.createdAt = customer.createdAt;
      updatedCustomer.updatedAt = currentDate;

      this.props.changeCustomer(updatedCustomer);
    }
  };

  getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getDate();
    let day = currentDate.getDay();
    let hour = currentDate.getHours();
    let min = currentDate.getMinutes();
    let sec = currentDate.getSeconds();
    const ms = currentDate.getMilliseconds();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (sec < 10) sec = "0" + sec;

    const date =
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hour +
      ":" +
      min +
      ":" +
      sec +
      "." +
      ms;

    return date;
  };

  changeInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };
}

export default connect(
  null,
  { changeCustomer }
)(CustomersChange);
