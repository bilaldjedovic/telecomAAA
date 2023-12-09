import React from "react";

const InvoiceDetails = ({ invoices }) => {
  return (
    <div>
      <h2>Invoice Details</h2>
      {invoices.map((invoice) => (
        <div key={invoice.id}>
          <h3>Invoice {invoice.id}</h3>
          <table>
            <tbody>
              <tr>
                <th>Customer Name</th>
                <td>{`${invoice.customerSubscription.customer.firstName} ${invoice.customerSubscription.customer.lastName}`}</td>
              </tr>
              <tr>
                <th>Invoice Date</th>
                <td>
                  {new Date(invoice.invoiceDate).toLocaleDateString("en-GB")}
                </td>
              </tr>
              <tr>
                <th>Due Date</th>
                <td>{new Date(invoice.dueDate).toLocaleDateString("en-GB")}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{invoice.status}</td>
              </tr>
              <tr>
                <th>Total Cost</th>
                <td>{`${invoice.totalCost} $`}</td>
              </tr>
              {/* Add more fields as needed */}
            </tbody>
          </table>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default InvoiceDetails;
