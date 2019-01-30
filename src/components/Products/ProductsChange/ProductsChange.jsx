import * as React from "react";
import { connect } from "react-redux";
import { changeProduct } from "../../../actions/productsActions";

class ProductsChange extends React.Component {
  state = {
    name: "",
    price: ""
  };

  componentDidMount() {
    const { product } = this.props;

    this.setState({
      name: product.name,
      price: product.price
    });
  }

  render() {
    const { close } = this.props;
    const { name, price } = this.state;

    return (
      <div>
        <form onSubmit={this.change}>
          <input
            type="text"
            name="name"
            placeholder="Product name..."
            onChange={this.changeInput}
            required
            defaultValue={name}
          />
          <input
            type="number"
            name="price"
            placeholder="Product price..."
            onChange={this.changeInput}
            required
            defaultValue={price}
          />
          <input type="submit" value="Change" />
        </form>
        <span onClick={() => close()}>Close</span>
      </div>
    );
  }

  change = e => {
    e.preventDefault();
    const { product } = this.props;
    const { name, price } = this.state;

    if (name !== product.name || price !== product.price) {
      const updatedProduct = {};

      updatedProduct.name = name;
      updatedProduct.price = price;
      updatedProduct.id = product.id;

      this.props.changeProduct(updatedProduct);
    }
  };

  changeInput = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };
}

export default connect(
  null,
  { changeProduct }
)(ProductsChange);
