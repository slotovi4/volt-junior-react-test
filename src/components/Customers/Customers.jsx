import * as React from "react";
import { connect } from "react-redux";
import {
  getAllCustomers,
  deteleCustomer
} from "../../actions/customersActions";

// components
import CustomersCreate from "./CustomersCreate/CustomersCreate";
import CustomersChange from "./CustomersChange/CustomersChange";

class Customers extends React.Component {
  state = {
    createCust: false,
    deleteCust: false,
    deleteCustomerId: null,
    changedCust: null
  };

  // get customers
  async componentWillMount() {
    await this.props.getAllCustomers();

    document.title = "Customers";
  }

  render() {
    const {
      createCust,
      deleteCust,
      deleteCustomerId,
      changedCust
    } = this.state;
    const { customers } = this.props;

    return (
      <div className="container">
        <div>
          <h1>
            Customer list{" "}
            <span
              className="btn btn-default"
              onClick={() => this.setState({ createCust: true })}
            >
              Create
            </span>
          </h1>
        </div>
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
                        className="btn btn-default"
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
                        className="btn btn-default"
                        onClick={() =>
                          this.setState({
                            deleteCust: true,
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

        {createCust ? (
          <CustomersCreate
            close={() => this.setState({ createCust: false })}
            customers={customers}
          />
        ) : null}

        {deleteCust && deleteCustomerId ? (
          <div>
            <span>Delete?</span>
            <span
              onClick={async () => {
                await this.props.deteleCustomer(deleteCustomerId);
                this.setState({
                  deleteCust: false,
                  deleteCustomerId: null
                });
              }}
            >
              yes
            </span>
            <span
              onClick={() =>
                this.setState({ deleteCust: false, deleteCustomerId: null })
              }
            >
              no
            </span>
          </div>
        ) : null}

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
    getAllCustomers,
    deteleCustomer
  }
)(Customers);
