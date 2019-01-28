import * as React from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../../actions/productsActions";

// components
import ProductsCreate from "../ProductsCreate/ProductsCreate";

class Products extends React.Component {
  state = {
    createProduct: false
  };

  // get products
  componentWillMount() {
    this.props.getAllProducts();
  }

  render() {
    const { createProduct } = this.state;
    const { products } = this.props;

    return (
      <div>
        <h1>Product list</h1>
        <span
          className="btn-default"
          onClick={() => this.setState({ createProduct: true })}
        >
          Create
        </span>
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0
              ? products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <span
                        className="btn-default"
                        onClick={() => {
                          console.log(1);
                        }}
                      >
                        Change
                      </span>
                    </td>
                    <td>
                      <span
                        className="btn-default"
                        onClick={() => console.log(2)}
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {createProduct ? (
          <ProductsCreate
            close={() => this.setState({ createProduct: false })}
            products={products}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products
});

export default connect(
  mapStateToProps,
  { getAllProducts }
)(Products);
