import * as React from "react";
import { connect } from "react-redux";
import { changeCustomer } from "../../../actions/customersActions";

class CustomersChange extends React.Component {
  state = {
    name: "",
    address: "",
    phone: ""
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.customer.name,
      address: nextProps.customer.address,
      phone: nextProps.customer.phone
    });
  }

  render() {
    const { name, address, phone } = this.state;

    return (
      <div className="modal fade" id="changeCustomerModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="centerChangeCustomerModal">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <h4 className="modal-title">Change customer</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.change}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Customer name..."
                    onChange={this.changeInput}
                    required
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    placeholder="Customer address..."
                    onChange={this.changeInput}
                    required
                    value={address}
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
                    required
                    value={phone}
                  />
                </div>

                <button className="btn btn-primary" type="submit">
                  Change
                </button>
              </form>
            </div>
          </div>
        </div>
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
