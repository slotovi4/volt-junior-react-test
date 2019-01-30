import * as React from "react";
import { connect } from "react-redux";
import { changeProduct } from "../../../actions/productsActions";

class ProductsChange extends React.Component {
  state = {
    name: "",
    price: ""
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.product.name,
      price: nextProps.product.price
    });
  }

  render() {
    const { name, price } = this.state;

    return (
      <div className="modal fade" id="changeProductModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="changeProductCenterModal">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <h4 className="modal-title">Change product</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.change}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product name..."
                    onChange={this.changeInput}
                    required
                    className="form-control"
                    value={name}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    name="price"
                    placeholder="Product price..."
                    onChange={this.changeInput}
                    required
                    className="form-control"
                    value={price}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Change
                </button>
              </form>
            </div>
          </div>
        </div>
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
