import * as React from "react";
import { connect } from "react-redux";
import { createNewCustomer } from "../../../actions/customersActions";

class CustomersCreate extends React.Component {
  state = {
    name: "",
    address: "",
    phone: ""
  };

  render() {
    const { close } = this.props;

    return (
      <div>
        <form onSubmit={this.createCustomer}>
          <input
            type="text"
            name="name"
            placeholder="Customer name..."
            onChange={this.changeInput}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Customer address..."
            onChange={this.changeInput}
            required
          />
          <input
            type="tel"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="Customer phone xxx-xxx-xxxx"
            onChange={this.changeInput}
            required
          />
          <input type="submit" value="Create" />
        </form>
        <span onClick={() => close()}>Close</span>
      </div>
    );
  }

  changeInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };

  createCustomer = e => {
    e.preventDefault();
    const { name, address, phone } = this.state;
    const { customers } = this.props;
    const newCustomer = {};

    // get current date
    const createDate = this.getCurrentDate();

    // get next id
    const id = customers[customers.length - 1].id + 1;

    // create customer
    newCustomer.id = id;
    newCustomer.name = name;
    newCustomer.address = address;
    newCustomer.phone = phone;
    newCustomer.createdAt = createDate;
    newCustomer.updatedAt = "";

    this.props.createNewCustomer(newCustomer);
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
}

export default connect(
  null,
  { createNewCustomer }
)(CustomersCreate);
