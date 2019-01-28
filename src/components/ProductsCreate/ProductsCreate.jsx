import * as React from "react";
import { connect } from "react-redux";
import { createNewProduct } from "../../actions/productsActions";

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
            type="text"
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

    // get current date
    const createDate = this.getCurrentDate();

    // get next id
    const id = products[products.length - 1].id + 1;

    // create customer
    newProduct.id = id;
    newProduct.name = name;
    newProduct.price = price;
    newProduct.createdAt = createDate;
    newProduct.updatedAt = "";

    this.props.createNewProduct(newProduct);
  };

  getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getDate();
    let day = currentDate.getDay();
    let hour = currentDate.getHours();
    let min = currentDate.getMinutes();
    let sec = currentDate.getSeconds();
    const ms = currentDate.getMilliseconds();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hour < 10) hour = "0" + hour;
    if (sec < 10) sec = "0" + sec;

    const date =
      year +
      "-" +
      month +
      "-" +
      day +
      "T" +
      hour +
      ":" +
      min +
      ":" +
      sec +
      "." +
      ms;

    return date;
  };
}

export default connect(
  null,
  {
    createNewProduct
  }
)(ProductsCreate);
