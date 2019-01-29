import * as React from "react";
import { connect } from "react-redux";
import { getInvoiceItems } from "../../../actions/invoicesActions";

class InvoicesChange extends React.Component {
  async componentWillMount() {
    const { invoice } = this.props;
    await this.props.getInvoiceItems(invoice.id);
  }

  render() {
    const { invoiceItems } = this.props;

    console.log(invoiceItems);

    return <div>123</div>;
  }
}

const mapStateToProps = state => ({
  invoiceItems: state.invoice.invoiceItems
});

export default connect(
  mapStateToProps,
  {
    getInvoiceItems
  }
)(InvoicesChange);
