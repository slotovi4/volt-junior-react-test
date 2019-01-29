import * as React from "react";
import { connect } from "react-redux";
import { getAllInvoices, deteleInvoice } from "../../actions/invoicesActions";

//components
import InvoicesCreate from "./InvoicesCreate/InvoicesCreate";

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
  }

  render() {
    const { createInv } = this.state;
    const { invoices } = this.props;

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
            {invoices && invoices.length > 0
              ? invoices.map((invoice, index) => (
                  <tr key={invoice.id}>
                    <td>{index}</td>
                    <td>{invoice.customer_id}</td>
                    <td>{invoice.discount}</td>
                    <td>{invoice.total}</td>
                    <td>
                      <span
                        className="btn-default"
                        onClick={
                          () => console.log(1)
                          // this.setState({
                          //   changeCust: true,
                          //   changedCust: customer
                          // });
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
                ))
              : null}
          </tbody>
        </table>

        {createInv ? (
          <InvoicesCreate
            close={() => this.setState({ createInv: false })}
            invoices={invoices}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  invoices: state.invoice.invoices
});

export default connect(
  mapStateToProps,
  {
    getAllInvoices,
    deteleInvoice
  }
)(Invoices);
