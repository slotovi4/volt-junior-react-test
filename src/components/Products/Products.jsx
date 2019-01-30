import * as React from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../../actions/productsActions";

// components
import ProductsCreate from "./ProductsCreate/ProductsCreate";
import ProductsChange from "./ProductsChange/ProductsChange";
import ProductsDelete from "./ProductsDelete/ProductsDelete";

class Products extends React.Component {
  state = {
    deleteProductId: null,
    changedProd: null
  };

  // get products
  async componentWillMount() {
    await this.props.getAllProducts();
    document.title = "Products";
  }

  render() {
    const { deleteProductId, changedProd } = this.state;
    const { products } = this.props;

    return (
      <div className="container">
        <h1>
          Product list{" "}
          <span
            className="btn btn-default"
            data-toggle="modal"
            data-target="#createProductModal"
            aria-labelledby="createProductCenterModal"
          >
            Create
          </span>
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
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
                        className="btn btn-default btn-sm"
                        data-toggle="modal"
                        data-target="#changeProductModal"
                        aria-labelledby="changeProductCenterModal"
                        onClick={() => {
                          this.setState({
                            changedProd: product
                          });
                        }}
                      >
                        Change
                      </span>
                    </td>
                    <td>
                      <span
                        className="btn btn-default btn-sm"
                        data-toggle="modal"
                        data-target="#deleteProductModal"
                        aria-labelledby="deleteProductCenterModal"
                        onClick={() =>
                          this.setState({
                            deleteProductId: product.id
                          })
                        }
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>

        <ProductsCreate products={products} />

        <ProductsDelete
          productId={deleteProductId}
          close={() => this.setState({ deleteProductId: null })}
        />

        <ProductsChange product={changedProd} />
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
