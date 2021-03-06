import * as React from "react";
import { connect } from "react-redux";
import { getAllCustomers } from "../../actions/customersActions";

// components
import CustomersCreate from "./CustomersCreate/CustomersCreate";
import CustomersChange from "./CustomersChange/CustomersChange";
import CustomersDelete from "./CustomersDelete/CustomersDelete";

class Customers extends React.Component {
  state = {
    deleteCustomerId: null,
    changedCust: null
  };

  // get customers
  async componentWillMount() {
    await this.props.getAllCustomers();

    document.title = "Customers";
  }

  render() {
    const { deleteCustomerId, changedCust } = this.state;
    const { customers } = this.props;

    return (
      <div className="container">
        <h1>
          Customer list{" "}
          <span
            className="btn btn-default"
            data-toggle="modal"
            data-target="#createCustomerModal"
            aria-labelledby="createChangeCustomerModal"
          >
            Create
          </span>
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
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
                      <span
                        className="btn btn-default btn-sm"
                        data-toggle="modal"
                        data-target="#changeCustomerModal"
                        aria-labelledby="centerChangeCustomerModal"
                        onClick={() => {
                          this.setState({
                            changedCust: customer
                          });
                        }}
                      >
                        Change
                      </span>
                    </td>
                    <td>
                      <span
                        className="btn btn-default btn-sm"
                        data-toggle="modal"
                        data-target="#deleteCustomerModal"
                        aria-labelledby="centerDeleteCustomerModal"
                        onClick={() =>
                          this.setState({
                            deleteCustomerId: customer.id
                          })
                        }
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>

        <CustomersCreate customers={customers} />

        <CustomersDelete
          customerId={deleteCustomerId}
          close={() => this.setState({ deleteCustomerId: null })}
        />

        <CustomersChange customer={changedCust} />
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
