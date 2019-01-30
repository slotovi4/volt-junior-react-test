import * as React from "react";
import { connect } from "react-redux";
import { deteleProduct } from "../../../actions/productsActions";

class ProductsDelete extends React.Component {
  render() {
    const { productId, close } = this.props;

    return (
      <div className="modal fade" id="deleteProductModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="deleteProductCenterModal">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <h4 className="modal-title">Delete product ?</h4>
            </div>
            <div className="modal-body">
              <span
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={async () => {
                  await this.props.deteleProduct(productId);
                  close();
                }}
              >
                yes
              </span>
              <span
                className="btn btn-default"
                data-dismiss="modal"
                onClick={close}
              >
                no
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { deteleProduct }
)(ProductsDelete);
