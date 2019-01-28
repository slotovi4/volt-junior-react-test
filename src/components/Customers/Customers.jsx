import * as React from "react";
import { connect } from "react-redux";
import { getAllCustomers } from "../../actions/customersActions";

class Customers extends React.Component {
  // get customers
  componentWillMount() {
    this.props.getAllCustomers();
  }

  render() {
    const { customers } = this.props;

    return (
      <div>
        <h1>Customers list</h1>
        <span>Create</span>
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {customers && customers.length > 0
              ? customers.map((customer, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customers: state.customer.customers
});

export default connect(
  mapStateToProps,
  {
    getAllCustomers
  }
)(Customers);
