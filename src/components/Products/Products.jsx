import * as React from "react";
import { connect } from "react-redux";
import { getAllProducts, deteleProduct } from "../../actions/productsActions";

// components
import ProductsCreate from "./ProductsCreate/ProductsCreate";
import ProductsChange from "./ProductsChange/ProductsChange";

class Products extends React.Component {
  state = {
    deleteProd: false,
    deleteProductId: null,
    changeProd: false,
    changedProd: null
  };

  // get products
  async componentWillMount() {
    await this.props.getAllProducts();

    document.title = "Products";
  }

  render() {
    const { deleteProd, deleteProductId, changeProd, changedProd } = this.state;
    const { products } = this.props;

    return (
      <div className="container">
        <div>
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
        </div>
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
                          this.setState({
                            changeProd: true,
                            changedProd: product
                          });
                        }}
                      >
                        Change
                      </span>
                    </td>
                    <td>
                      <span
                        className="btn-default"
                        onClick={() =>
                          this.setState({
                            deleteProd: true,
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

        {deleteProd && deleteProductId ? (
          <div>
            <span>Delete?</span>
            <span
              onClick={async () => {
                await this.props.deteleProduct(deleteProductId);
                this.setState({
                  deleteProd: false,
                  deleteProductId: null
                });
              }}
            >
              yes
            </span>
            <span
              onClick={() =>
                this.setState({ deleteProd: false, deleteProductId: null })
              }
            >
              no
            </span>
          </div>
        ) : null}

        {changeProd && changedProd ? (
          <ProductsChange
            close={() =>
              this.setState({ changeProd: false, changedProd: null })
            }
            product={changedProd}
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
  { getAllProducts, deteleProduct }
)(Products);
