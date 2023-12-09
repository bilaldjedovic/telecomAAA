import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./InvoiceTable.css";

const InvoiceTable = () => {
  const [invoices, setInvoice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/invoice/getAllInvoices")
      .then((response) => {
        setInvoice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (invoice) => {
    navigate("/invoice/details", { state: { invoId: invoice } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Invoice List</h2>
      <div>
        <label htmlFor="filterName">Filter by Name:</label>
        <input
          type="text"
          id="filterName"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="filterLastName">Filter by Last Name:</label>
        <input
          type="text"
          id="filterLastName"
          value={filterLastName}
          onChange={(e) => setFilterLastName(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Cost</th>
            <th>Due Date</th>
            <th>Invoice Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>
                {`${invoice.customerSubscription.customer.firstName} ${invoice.customerSubscription.customer.lastName}`}
              </td>
              <td>
                {`${invoice.customerSubscription.customer.address}, ${invoice.customerSubscription.customer.location.city}, ${invoice.customerSubscription.customer.location.district}`}
              </td>

              <td>{invoice.totalCost}</td>
              <td>{new Date(invoice.dueDate).toLocaleDateString("en-GB")}</td>
              <td>
                {new Date(invoice.invoiceDate).toLocaleDateString("en-GB")}
              </td>
              <td className={`status-${invoice.status.toLowerCase()}`}>
                {invoice.status}
              </td>
              <td>
                <Button onClick={() => handleEdit(invoice.id)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
