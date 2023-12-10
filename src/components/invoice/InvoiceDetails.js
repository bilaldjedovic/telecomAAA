import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./InvoiceDetails.css";

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { state } = useLocation();
  const { invoId } = state;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/invoice/getInvoiceById/${invoId}`)
      .then((response) => {
        setInvoice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [invoId]);

  const handlePrint = () => {
    const printableContent = document.getElementById("printable-content");
    const originalContent = document.body.innerHTML;

    // Temporarily replace the body content with the printable content
    document.body.innerHTML = printableContent.innerHTML;

    // Trigger the print
    window.print();

    // Restore the original content
    document.body.innerHTML = originalContent;
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="device-details-container">
      <div className="device-text">
        <div id="printable-content">
          <h2 className="device-details-heading">Invoice Details</h2>
          <p>{`Total cost: ${invoice.totalCost}`}</p>
          <p>{`Due date: ${
            invoice.dueDate
              ? new Date(invoice.dueDate).toLocaleDateString("en-GB")
              : "N/A"
          }`}</p>
          <p>{`Invoice date: ${
            invoice.invoiceDate
              ? new Date(invoice.invoiceDate).toLocaleDateString("en-GB")
              : "N/A"
          }`}</p>
          <p>{`Status: ${invoice.status}`}</p>
        </div>
        <button onClick={handlePrint}>Print Invoice</button>
      </div>
    </div>
  );
};

export default InvoiceDetails;
