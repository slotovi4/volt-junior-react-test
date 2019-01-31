import * as React from "react";
import { connect } from "react-redux";
import {
  getInvoiceItems,
  changeInvoice,
  changeInvoiceItems,
  setInvoiceItem,
  deleteInvoiceItem,
  getInvoice
} from "../../../actions/invoicesActions";
import { getAllProducts } from "../../../actions/productsActions";
import { getAllCustomers } from "../../../actions/customersActions";

class InvoicesChange extends React.Component {
  state = {
    discount: 0,
    customerId: "",
    productId: "",
    custProducts: [],
    addedProducts: [],
    notFoundProducts: [],
    oldTotal: null,
    total: 0
  };

  async componentWillMount() {
    const { id } = this.props.match.params;

    if (id) {
      await this.props.getInvoice(parseInt(id));
      await this.props.getInvoiceItems(parseInt(id));
      await this.props.getAllCustomers();
      await this.props.getAllProducts();

      // set state
      this.setState({
        discount: parseFloat(this.props.invoice.discount),
        customerId: this.props.invoice.customer_id,
        custProducts: this.props.invoiceItems,
        total: this.props.invoice.total,
        oldTotal: null,
        notFoundProducts: []
      });

      // convert products
      this.convertCustProduct();
    }
  }

  render() {
    const { invoice, products } = this.props;
    const {
      discount,
      customerId,
      total,
      addedProducts,
      notFoundProducts,
      oldTotal
    } = this.state;
    const customer = this.getCustomer();

    return invoice ? (
      <div className="container">
        <h1>Edit invoice</h1>
        <form onSubmit={this.saveChanges}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <h5>Discount (%)</h5>
                <input
                  type="number"
                  name="discount"
                  placeholder="Invoice discount..."
                  value={discount}
                  onChange={this.changeInput}
                  className="form-control"
                  min={0}
                  max={100}
                  required
                />
              </div>
              {customer ? (
                <div className="form-group">
                  <h5>Customer</h5>
                  <select
                    name="customerId"
                    value={customerId}
                    onChange={this.changeInput}
                    disabled
                    required
                    className="form-control"
                  >
                    <option key={customer.id + "_customer"} value={customer.id}>
                      {customer.name}
                    </option>
                    )
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
                    required
                    onChange={this.changeInput}
                    style={{ width: "auto", float: "left" }}
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
                  <span className="btn btn-default" onClick={this.addProduct}>
                    Add
                  </span>
                </div>
              ) : null}

              <div className="form-group">
                {notFoundProducts && notFoundProducts.length > 0
                  ? notFoundProducts.map(notFoundProductId => (
                      <h5 key={notFoundProductId}>
                        Products deleted(id): {notFoundProductId}
                      </h5>
                    ))
                  : null}
              </div>
            </div>
          </div>

          {addedProducts && addedProducts.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                </tr>
              </thead>

              <tbody>
                {addedProducts.map((addedProduct, index) => {
                  return (
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
                          onClick={() => this.deleteProduct(index)}
                        >
                          x
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}

          <h1>
            {oldTotal
              ? `Old total: ${oldTotal}, New total: ${total}`
              : `Total: ${total}`}
          </h1>
          <button className="btn btn-primary" type="submit">
            Change
          </button>
        </form>
      </div>
    ) : null;
  }

  saveChanges = async e => {
    e.preventDefault();

    const { invoice, invoiceItems } = this.props;
    const {
      customerId,
      discount,
      total,
      addedProducts,
      notFoundProducts,
      custProducts
    } = this.state;
    const invoiceId = parseInt(invoice.id);

    // create new invoice
    const changedInvoice = {};
    changedInvoice.id = invoiceId;
    changedInvoice.customer_id = customerId;
    changedInvoice.discount = discount;
    changedInvoice.total = total;

    await this.props.changeInvoice(changedInvoice);

    // create new invoice items
    const prodLength = addedProducts.length;
    for (let i = 0; i < prodLength; i++) {
      const item = {};

      item.id = addedProducts[i].id;
      item.invoice_id = invoiceId;
      item.product_id = addedProducts[i].product_id;
      item.quantity = addedProducts[i].qty;

      let has = false;
      const itemsLength = invoiceItems.length;
      for (let j = 0; j < itemsLength; j++) {
        if (invoiceItems[j].product_id === item.product_id) {
          has = true;
          break;
        }
      }

      if (has) {
        // if item present -> change item
        await this.props.changeInvoiceItems(invoiceId, item);
      } else {
        // else -> set item
        await this.props.setInvoiceItem(invoiceId, item);
      }
    }

    // delete not found items
    const ntLength = notFoundProducts.length;
    const ctLength = custProducts.length;

    for (let i = 0; i < ntLength; i++) {
      for (let j = 0; j < ctLength; j++) {
        if (custProducts[j].product_id === notFoundProducts[i]) {
          await this.props.deleteInvoiceItem(invoiceId, custProducts[j].id);
        }
      }
    }

    this.setState({ notFoundProducts: [], oldTotal: null });

    this.props.history.push("/");
  };

  getCustomer = () => {
    const { customers, invoice } = this.props;

    if (customers && invoice) {
      const custLength = customers.length;

      for (let i = 0; i < custLength; i++) {
        if (customers[i].id === invoice.customer_id) {
          return customers[i];
        }
      }
    }
  };

  changeInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value }, () => {
      this.calcTotal();
    });
  };

  convertCustProduct = () => {
    const addedProducts = [];
    const { custProducts, notFoundProducts } = this.state;
    const { products } = this.props;

    if (custProducts && custProducts.length > 0) {
      const length = custProducts.length;
      const prodLength = products.length;

      end: for (let i = 0; i < length; i++) {
        // get product info
        for (let j = 0; j < prodLength; j++) {
          if (products[j].id === custProducts[i].product_id) {
            const product = {};
            product.id = custProducts[i].id;
            product.product_id = custProducts[i].product_id;
            product.qty = custProducts[i].quantity;
            product.name = products[j].name;
            product.price = products[j].price;

            addedProducts.push(product);
            continue end;
          } else if (
            j === prodLength - 1 &&
            notFoundProducts.indexOf(custProducts[i].product_id) === -1
          ) {
            notFoundProducts.push(custProducts[i].product_id);
          }
        }
      }
    }

    this.setState({ addedProducts, notFoundProducts });

    this.calcTotal();
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

    if (parseInt(discount)) {
      total = (total / 100) * (100 - parseInt(discount));
    }

    total = parseFloat(total.toFixed(2));

    if (this.props.invoice.total !== total) {
      this.setState({ oldTotal: this.props.invoice.total });
    } else {
      this.setState({ oldTotal: null });
    }

    this.setState({ total });
  };

  deleteProduct = async index => {
    const { addedProducts } = this.state;
    const { invoice } = this.props;
    const id = addedProducts[index].id;
    const invoiceId = invoice.id;

    // delete product
    addedProducts.splice(index, 1);

    if (id && invoiceId) {
      await this.props.deleteInvoiceItem(invoiceId, id);
    }

    // set state
    this.setState({ addedProducts });
    this.calcTotal();
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
        if (addedProducts[i].product_id === productId) {
          addedProducts[i].qty += 1;

          this.setState({ addedProducts });
          this.calcTotal();
          return;
        }
      }

      // if new product
      for (let i = 0; i < length; i++) {
        if (productId === products[i].id) {
          // set product qty
          const product = {};
          product.product_id = products[i].id;
          product.price = products[i].price;
          product.name = products[i].name;
          product.qty = 1;

          addedProducts.push(product);

          // set state & calc total
          this.setState({ addedProducts });
          this.calcTotal();
          return;
        }
      }
    }
  };
}

const mapStateToProps = state => ({
  invoiceItems: state.invoice.invoiceItems,
  invoices: state.invoice.invoices,
  invoice: state.invoice.invoice,
  customers: state.customer.customers,
  products: state.product.products
});

export default connect(
  mapStateToProps,
  {
    getInvoiceItems,
    getAllProducts,
    changeInvoice,
    changeInvoiceItems,
    setInvoiceItem,
    deleteInvoiceItem,
    getInvoice,
    getAllCustomers
  }
)(InvoicesChange);
