import * as React from "react";
import { connect } from "react-redux";
import { getInvoiceItems } from "../../../actions/invoicesActions";
import { getAllProducts } from "../../../actions/productsActions";

class InvoicesChange extends React.Component {
  state = {
    discount: "",
    customerId: "",
    productId: "",
    custProducts: [],
    addedProducts: [],
    total: 0
  };

  async componentWillMount() {
    const { invoice } = this.props;

    // get items
    await this.props.getInvoiceItems(invoice.id);

    // get products
    await this.props.getAllProducts();

    // set state
    this.setState({
      discount: this.props.invoice.discount,
      customerId: this.props.invoice.customer_id,
      custProducts: this.props.invoiceItems,
      total: this.props.invoice.total
    });

    // convert products
    this.convertCustProduct();
  }

  async componentWillUpdate(nextProps, nextState) {
    const { invoice } = this.props;

    if (invoice.id !== nextProps.invoice.id) {
      // get items
      await this.props.getInvoiceItems(nextProps.invoice.id);

      // set state
      this.setState({
        discount: this.props.invoice.discount,
        customerId: this.props.invoice.customer_id,
        custProducts: this.props.invoiceItems,
        total: this.props.invoice.total
      });

      // convert products
      this.convertCustProduct();
    }
  }

  render() {
    const { invoices, customers, products, close } = this.props;
    const { discount, customerId, total, addedProducts } = this.state;

    return (
      <div>
        <h1>Edit invoice</h1>
        <form onSubmit={this.createInvoice}>
          <span>Discount (%)</span>
          <input
            type="text"
            name="discount"
            placeholder="Invoice discount..."
            defaultValue={discount}
            onChange={this.changeInput}
          />
          {invoices && invoices.length > 0 ? (
            <div>
              <span>Customer</span>
              <select
                name="customerId"
                placeholder="Invoice customer..."
                onChange={this.changeInput}
                value={customerId}
                required
              >
                {customers.map(customer => {
                  // get customer info
                  let invCustomer = null;
                  const invLength = invoices.length;

                  for (let i = 0; i < invLength; i++) {
                    if (invoices[i].customer_id === customer.id) {
                      invCustomer = customer;
                    }
                  }

                  // if customer
                  if (invCustomer !== null) {
                    return (
                      <option
                        key={invCustomer.id + "_customer"}
                        value={invCustomer.id}
                      >
                        {invCustomer.name}
                      </option>
                    );
                  } else {
                    return null;
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
                        <span onClick={index => this.deleteProduct(index)}>
                          x
                        </span>
                      </td>
                    </tr>
                  );
                })}
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

  convertCustProduct = () => {
    const addedProducts = [];
    const { custProducts } = this.state;
    const { products } = this.props;

    if (custProducts && custProducts.length > 0) {
      const length = custProducts.length;
      const prodLength = products.length;

      end: for (let i = 0; i < length; i++) {
        // get product info
        for (let j = 0; j < prodLength; j++) {
          if (products[j].id === custProducts[i].product_id) {
            products[j].qty = custProducts[i].quantity;
            addedProducts.push(products[j]);

            continue end;
          }
        }
      }
    }

    this.setState({ addedProducts });
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

      // if new prodect
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
}

const mapStateToProps = state => ({
  invoiceItems: state.invoice.invoiceItems,
  invoices: state.invoice.invoices,
  customers: state.customer.customers,
  products: state.product.products
});

export default connect(
  mapStateToProps,
  {
    getInvoiceItems,
    getAllProducts
  }
)(InvoicesChange);
