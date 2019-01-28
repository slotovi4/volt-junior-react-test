import * as React from "react";
import { connect } from "react-redux";
import {
  getAllCustomers,
  deteleCustomer
} from "../../actions/customersActions";
import { cn } from "@bem-react/classname";

// components
import CustomersCreate from "../CustomersCreate/CustomersCreate";

class Customers extends React.Component {
  state = {
    createCustomer: false
  };

  // get customers
  componentWillMount() {
    this.props.getAllCustomers();
  }

  render() {
    const cust = cn("Customer");
    const { createCustomer } = this.state;
    const { customers } = this.props;

    return (
      <div className={cust()}>
        <h1>Customers list</h1>
        <span
          className="btn-default"
          onClick={() => this.setState({ createCustomer: true })}
        >
          Create
        </span>
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
                  <tr key={customer.id}>
                    <td>{index}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <span className="btn-default">Change</span>
                    </td>
                    <td>
                      <span
                        className="btn-default"
                        onClick={() => this.props.deteleCustomer(customer.id)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {createCustomer ? (
          <CustomersCreate
            close={() => this.setState({ createCustomer: false })}
            customers={customers}
          />
        ) : null}
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
    getAllCustomers,
    deteleCustomer
  }
)(Customers);
