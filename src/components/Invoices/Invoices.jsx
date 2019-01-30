import * as React from "react";
import { connect } from "react-redux";
import { getAllInvoices } from "../../actions/invoicesActions";
import { getAllCustomers } from "../../actions/customersActions";
import { Link } from "react-router-dom";

//components
import InvoicesDelete from "./InvoicesDelete/InvoicesDelete";

class Invoices extends React.Component {
  state = {
    delInvoiceId: null
  };

  // get invoices
  async componentWillMount() {
    await this.props.getAllInvoices();
    await this.props.getAllCustomers();

    document.title = "Invoices";
  }

  render() {
    const { invoices, customers } = this.props;
    const { delInvoiceId } = this.state;

    return (
      <div className="container">
        <div>
          <h1>
            Invoice list{" "}
            <Link to="/invoices/create">
              <span className="btn btn-default">Create</span>
            </Link>
          </h1>
        </div>

        {invoices && invoices.length > 0 && customers ? (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => {
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
                        <Link to={`/invoices/change/${id}`}>
                          <span className="btn btn-default btn-sm">Change</span>
                        </Link>
                      </td>
                      <td>
                        <span
                          className="btn btn-default btn-sm"
                          data-toggle="modal"
                          data-target="#deleteInvoiceModal"
                          aria-labelledby="centerDeleteInvoiceModal"
                          onClick={() => this.setState({ delInvoiceId: id })}
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
              })}
            </tbody>
          </table>
        ) : null}

        <InvoicesDelete invoiceId={delInvoiceId} />
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
    getAllCustomers
  }
)(Invoices);
