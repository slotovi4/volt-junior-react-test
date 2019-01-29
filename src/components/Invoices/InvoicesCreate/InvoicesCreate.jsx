import * as React from "react";
import { connect } from "react-redux";
import { getAllCustomers } from "../../../actions/customersActions";
import { getAllProducts } from "../../../actions/productsActions";
import {
  createNewInvoice,
  setInvoiceItem
} from "../../../actions/invoicesActions";

class InvoicesCreate extends React.Component {
  state = {
    customerId: null,
    productId: null,
    discount: null,
    addedProducts: [],
    total: 0
  };

  // get customers & products
  async componentWillMount() {
    await this.props.getAllCustomers();
    await this.props.getAllProducts();
  }

  render() {
    const { addedProducts, total } = this.state;
    const { close, customers, products, invoices } = this.props;

    return (
      <div>
        <h1>Create invoice</h1>
        <form onSubmit={this.createInvoice}>
          <span>Discount (%)</span>
          <input
            type="text"
            name="discount"
            placeholder="Invoice discount..."
            onChange={this.changeInput}
          />

          {customers && customers.length > 0 ? (
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
                  // check added invoice
                  const invLength = invoices.length;
                  let hasInvoice = false;
                  for (let i = 0; i < invLength; i++) {
                    if (invoices[i].customer_id === customer.id) {
                      hasInvoice = true;
                    }
                  }

                  if (hasInvoice) {
                    return null;
                  } else {
                    return (
                      <option
                        key={customer.id + "_customer"}
                        value={customer.id}
                      >
                        {customer.name}
                      </option>
                    );
                  }
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
                        value={addedProduct.qty}
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

  changeQty = (e, addedProduct) => {
    // check empty value
    if (e.target.value === "") {
      e.target.value = 1;
    }

    // add qty
    addedProduct.qty = parseInt(e.target.value);

    this.calcTotal();
  };

  calcTotal = () => {
    const { addedProducts } = this.state;
    const length = addedProducts.length;
    let total = 0;

    for (let i = 0; i < length; i++) {
      total += addedProducts[i].price * addedProducts[i].qty;
    }

    this.setState({ total });
  };

  addProduct = () => {
    const productId = parseInt(this.state.productId);
    const { addedProducts } = this.state;
    const { products } = this.props;
    const length = products.length;

    if (productId) {
      // check dublicate
      const addLength = addedProducts.length;
      for (let i = 0; i < addLength; i++) {
        if (addedProducts[i].id === productId) {
          addedProducts[i].qty += 1;

          this.setState({ addedProducts });
          this.calcTotal();
          return;
        }
      }

      for (let i = 0; i < length; i++) {
        if (productId === products[i].id) {
          // set product qty
          products[i].qty = 1;
          addedProducts.push(products[i]);

          // set state & calc total
          this.setState({ addedProducts });
          this.calcTotal();
          return;
        }
      }
    }
  };

  deleteProduct = index => {
    const { addedProducts } = this.state;

    // delete product
    addedProducts.splice(index, 1);

    // set state
    this.setState({ addedProducts });
    this.calcTotal();
  };

  createInvoice = e => {
    e.preventDefault();
    const { invoices } = this.props;
    const { addedProducts, discount, customerId, total } = this.state;

    if (discount && discount !== "" && customerId && customerId !== "") {
      // create new invoice
      const newInvoice = {};
      const id =
        invoices && invoices.length > 0
          ? invoices[invoices.length - 1].id + 1
          : 0;

      newInvoice.id = id;
      newInvoice.customer_id = parseInt(customerId);
      newInvoice.discount = discount;
      newInvoice.total = total;

      // put new invoice
      this.props.createNewInvoice(newInvoice);

      // put invoice items
      const prodLength = addedProducts.length;
      for (let i = 0; i < prodLength; i++) {
        const item = {};

        item.invoice_id = id;
        item.product_id = addedProducts[i].id;
        item.quantity = addedProducts[i].qty;

        this.props.setInvoiceItem(id, item);
      }
    }
  };
}

const mapStateToProps = state => ({
  customers: state.customer.customers,
  products: state.product.products,
  invoices: state.invoice.invoices
});

export default connect(
  mapStateToProps,
  {
    getAllCustomers,
    getAllProducts,
    createNewInvoice,
    setInvoiceItem
  }
)(InvoicesCreate);
