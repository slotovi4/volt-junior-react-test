import * as React from "react";
import { connect } from "react-redux";
import { changeCustomer } from "../../../actions/customersActions";

class CustomersChange extends React.Component {
  state = {
    name: "",
    address: "",
    phone: ""
  };

  componentDidMount() {
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
      const updatedCustomer = {};

      updatedCustomer.name = name;
      updatedCustomer.address = address;
      updatedCustomer.phone = phone;
      updatedCustomer.id = customer.id;

      this.props.changeCustomer(updatedCustomer);
    }
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
