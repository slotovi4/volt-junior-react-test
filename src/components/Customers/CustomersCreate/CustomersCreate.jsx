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
    const { name, address, phone } = this.state;

    return (
      <div className="modal fade" id="createCustomerModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="createChangeCustomerModal">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <h4 className="modal-title">Create customer</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.createCustomer}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Customer name..."
                    onChange={this.changeInput}
                    value={name}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    placeholder="Customer address..."
                    onChange={this.changeInput}
                    value={address}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="tel"
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="Customer phone xxx-xxx-xxxx"
                    onChange={this.changeInput}
                    value={phone}
                    required
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
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

    // get next id
    const id = customers[customers.length - 1].id + 1;

    // create customer
    newCustomer.id = id;
    newCustomer.name = name;
    newCustomer.address = address;
    newCustomer.phone = phone;

    this.props.createNewCustomer(newCustomer);

    // clear state
    this.setState({ name: "", address: "", phone: "" });
  };
}

export default connect(
  null,
  { createNewCustomer }
)(CustomersCreate);
