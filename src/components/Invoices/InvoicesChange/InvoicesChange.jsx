import * as React from "react";
import { connect } from "react-redux";
import { getInvoiceItems } from "../../../actions/invoicesActions";

class InvoicesChange extends React.Component {
  async componentWillMount() {
    const { invoice } = this.props;
    await this.props.getInvoiceItems(invoice.id);
  }

  render() {
    const { invoice, invoiceItems } = this.props;

    console.log(invoiceItems);

    return (
      <div>
        <h1>Edit invoice</h1>
        <form onSubmit={this.createInvoice}>
          <span>Discount (%)</span>
          <input
            type="text"
            name="discount"
            placeholder="Invoice discount..."
            defaultValue={invoice.discount}
            onChange={this.changeInput}
          />

          {invoices && invoices.length > 0 ? (
            <div>
              <span>Customer</span>
              <select
                name="customerId"
                placeholder="Invoice customer..."
                onChange={this.changeInput}
                defaultValue="hide"
                required
              >
                <option value="hide" disabled hidden>
                  Choose here
                </option>
                {customers.map(customer => {
                  const find = false;

                  // прохожу по всем invoices
                  // прохожу по всем customer и если id совпал вывожу название и id

                  return (
                    <option key={customer.id + "_customer"} value={customer.id}>
                      {customer.name}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}

          {products && products.length > 0 ? (
            <div>
              <span>Add product</span>
              <select
                name="productId"
                placeholder="Invoice product..."
                onChange={this.changeInput}
                defaultValue="hide"
                required
              >
                <option value="hide" disabled hidden>
                  Choose here
                </option>
                {products.map(product => (
                  <option key={product.id + "_product"} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <span onClick={this.addProduct}>Add</span>
            </div>
          ) : null}

          {addedProducts && addedProducts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                </tr>
              </thead>

              <tbody>
                {addedProducts.map((addedProduct, index) => (
                  <tr key={index + "_addedProduct"}>
                    <td>{addedProduct.name}</td>
                    <td>{addedProduct.price}</td>
                    <td>
                      <input
                        type="number"
                        placeholder="qty..."
                        defaultValue={1}
                        min={1}
                        onChange={e => this.changeQty(e, addedProduct)}
                      />
                    </td>
                    <td>
                      <span onClick={index => this.deleteProduct(index)}>
                        x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          <h1>Total: {total}</h1>

          <input type="submit" value="Create" />
        </form>
        <span onClick={() => close()}>Close</span>
      </div>
    );
  }

  changeInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };
}

const mapStateToProps = state => ({
  invoiceItems: state.invoice.invoiceItems,
  invoices: state.invoice.invoices,
  customers: state.customer.customers
});

export default connect(
  mapStateToProps,
  {
    getInvoiceItems
  }
)(InvoicesChange);
