import * as React from "react";
import { connect } from "react-redux";
import { deteleInvoice } from "../../../actions/invoicesActions";

class InvoicesDelete extends React.Component {
  render() {
    const { invoiceId } = this.props;

    return (
      <div className="modal fade" id="deleteInvoiceModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" id="centerDeleteInvoiceModal">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>

              <h4 className="modal-title">Delete customer ?</h4>
            </div>
            <div className="modal-body">
              <span
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={async () => {
                  await this.props.deteleInvoice(invoiceId);
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
  { deteleInvoice }
)(InvoicesDelete);
