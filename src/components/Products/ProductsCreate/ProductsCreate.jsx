import * as React from "react";
import { connect } from "react-redux";
import { createNewProduct } from "../../../actions/productsActions";

class ProductsCreate extends React.Component {
  state = {
    name: "",
    price: ""
  };

  render() {
    const { close } = this.props;

    return (
      <div>
        <form onSubmit={this.createProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product name..."
            onChange={this.changeInput}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Product price..."
            onChange={this.changeInput}
            required
          />
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

  createProduct = e => {
    e.preventDefault();
    const { name, price } = this.state;
    const { products } = this.props;
    const newProduct = {};

    // get next id
    const id = products[products.length - 1].id + 1;

    // create customer
    newProduct.id = id;
    newProduct.name = name;
    newProduct.price = price;

    this.props.createNewProduct(newProduct);
  };
}

export default connect(
  null,
  {
    createNewProduct
  }
)(ProductsCreate);
