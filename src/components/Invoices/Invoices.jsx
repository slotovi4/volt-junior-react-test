import * as React from "react";
import { connect } from "react-redux";
import { getAllInvoices, deteleInvoice } from "../../actions/invoicesActions";
import { getAllCustomers } from "../../actions/customersActions";

//components
import InvoicesCreate from "./InvoicesCreate/InvoicesCreate";
import InvoicesChange from "./InvoicesChange/InvoicesChange";

class Invoices extends React.Component {
  state = {
    createInv: false,
    deleteInv: false,
    deleteInvoiceId: null,
    changeInv: false,
    changedInv: null
  };

  // get invoices
  async componentWillMount() {
    await this.props.getAllInvoices();
    await this.props.getAllCustomers();
  }

  render() {
    const { createInv, changeInv, changedInv } = this.state;
    const { invoices, customers } = this.props;

    return (
      <div>
        <h1>Invoice list</h1>
        <span
          className="btn-default"
          onClick={() => this.setState({ createInv: true })}
        >
          Create
        </span>
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Customer</td>
              <td>Discount</td>
              <td>Total</td>
            </tr>
          </thead>
          <tbody>
            {invoices && customers && invoices.length > 0
              ? invoices.map((invoice, index) => {
                  const { customer_id, discount, total, id } = invoice;

                  const customer = customers.filter(
                    customer => customer.id === customer_id
                  );

                  // if has customer
                  if (customer && customer.length > 0) {
                    return (
                      <tr key={id}>
                        <td>{index}</td>
                        <td>{customer[0].name}</td>
                        <td>{discount}</td>
                        <td>{total}</td>
                        <td>
                          <span
                            className="btn-default"
                            onClick={() =>
                              this.setState({
                                changeInv: true,
                                changedInv: invoice
                              })
                            }
                          >
                            Change
                          </span>
                        </td>
                        <td>
                          <span
                            className="btn-default"
                            onClick={
                              () => console.log(2)
                              // this.setState({
                              //   deleteCust: true,
                              //   deleteCustomerId: customer.id
                              // })
                            }
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    );
                  }
                  // if customer deleted
                  else {
                    return false;
                  }
                })
              : null}
          </tbody>
        </table>

        {createInv ? (
          <InvoicesCreate
            close={() => this.setState({ createInv: false })}
            invoices={invoices}
          />
        ) : null}

        {changeInv ? (
          <InvoicesChange
            invoice={changedInv}
            close={() => this.setState({ changeInv: false })}
            changeInvoiceOnSelect={customerId => {
              const length = invoices.length;

              for (let i = 0; i < length; i++) {
                if (invoices[i].customer_id === parseInt(customerId)) {
                  this.setState({ changedInv: invoices[i] });
                  return;
                }
              }
            }}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  invoices: state.invoice.invoices,
  customers: state.customer.customers
});

export default connect(
  mapStateToProps,
  {
    getAllInvoices,
    deteleInvoice,
    getAllCustomers
  }
)(Invoices);
