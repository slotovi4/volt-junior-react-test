import * as React from "react";
import { connect } from "react-redux";
import { createNewProduct } from "../../../actions/productsActions";

class ProductsCreate extends React.Component {
  state = {
    name: "",
    price: ""
  };

  render() {
    const { name, price } = this.state;

    return (
      <div className="modal fade" id="createProductModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="createProductCenterModal">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <h4 className="modal-title">Create product</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.createProduct}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product name..."
                    onChange={this.changeInput}
                    className="form-control"
                    value={name}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    name="price"
                    placeholder="Product price..."
                    onChange={this.changeInput}
                    className="form-control"
                    value={price}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
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

    // clear state
    this.setState({ name: "", price: "" });
  };
}

export default connect(
  null,
  {
    createNewProduct
  }
)(ProductsCreate);
