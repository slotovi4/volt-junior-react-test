import * as React from "react";
import { connect } from "react-redux";
import { getAllCustomers } from "../../../actions/customersActions";
import { getAllProducts } from "../../../actions/productsActions";
import {
  createNewInvoice,
  setInvoiceItem,
  getAllInvoices
} from "../../../actions/invoicesActions";

class InvoicesCreate extends React.Component {
  state = {
    discount: 0,
    customerId: null,
    productId: null,
    discount: null,
    addedProducts: [],
    total: 0
  };

  // get customers & products
  async componentWillMount() {
    await this.props.getAllInvoices();
    await this.props.getAllCustomers();
    await this.props.getAllProducts();
  }

  render() {
    const { addedProducts, total } = this.state;
    const { customers, products, invoices } = this.props;

    return (
      <div className="container">
        <h1>Create invoice</h1>
        <form onSubmit={this.createInvoice}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <h5>Discount (%)</h5>
                <input
                  type="number"
                  name="discount"
                  placeholder="Invoice discount..."
                  onChange={this.changeInput}
                  className="form-control"
                  min={0}
                  max={100}
                  required
                />
              </div>

              {customers && customers.length > 0 ? (
                <div className="form-group">
                  <h5>Customer</h5>
                  <select
                    name="customerId"
                    defaultValue="hide"
                    className="form-control"
                    onChange={this.changeInput}
                    required
                  >
                    <option value="hide" hidden>
                      Choose customer
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
                <div className="form-group">
                  <h5>Add product</h5>
                  <select
                    name="productId"
                    placeholder="Invoice product..."
                    defaultValue="hide"
                    className="form-control"
                    style={{ width: "auto", float: "left" }}
                    onChange={this.changeInput}
                    required
                  >
                    <option value="hide" hidden>
                      Choose product
                    </option>
                    {products.map(product => (
                      <option key={product.id + "_product"} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <span className="btn btn-default" onClick={this.addProduct}>
                    Add
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {addedProducts && addedProducts.length > 0 ? (
            <div className="row">
              <div className="col-md-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
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
                          <span
                            className="btn btn-default btn-sm"
                            onClick={index => this.deleteProduct(index)}
                          >
                            x
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <h2>Total: {total}</h2>

          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </form>
      </div>
    );
  }

  changeInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value }, () => {
      this.calcTotal();
    });
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
    const { addedProducts, discount } = this.state;
    const length = addedProducts.length;
    let total = 0;

    for (let i = 0; i < length; i++) {
      total += addedProducts[i].price * addedProducts[i].qty;
    }

    if (discount) {
      total = (total / 100) * (100 - discount);
    }

    total = parseFloat(total.toFixed(2));

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

  createInvoice = async e => {
    e.preventDefault();
    // const { invoices } = this.props;
    const { addedProducts, discount, total } = this.state;
    const customerId = parseInt(this.state.customerId);

    if (discount && discount !== "" && customerId) {
      // create new invoice
      const newInvoice = {};
      newInvoice.customer_id = customerId;
      newInvoice.discount = parseInt(discount);
      newInvoice.total = total;

      // put new invoice
      await this.props.createNewInvoice(newInvoice);

      const { invoices } = this.props;
      const invLength = invoices.length;
      let invoiceId = null;

      for (let i = 0; i < invLength; i++) {
        if (invoices[i].customer_id === customerId) {
          invoiceId = invoices[i].id;
        }
      }

      // put invoice items
      if (invoiceId) {
        const prodLength = addedProducts.length;
        for (let i = 0; i < prodLength; i++) {
          const item = {};

          item.invoice_id = invoiceId;
          item.product_id = addedProducts[i].id;
          item.quantity = addedProducts[i].qty;

          await this.props.setInvoiceItem(invoiceId, item);
        }
      }
    }

    this.props.history.push("/");
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
    setInvoiceItem,
    getAllInvoices
  }
)(InvoicesCreate);
