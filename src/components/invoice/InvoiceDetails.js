import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { Button, Modal, TextField } from "@mui/material";
import logoImage from "./bbHTelecom.png";
import ReactModal from "react-modal";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;

  h1 {
    margin-bottom: 20px;
  }

  .back-button {
    margin-bottom: 20px;
  }

  .printable-content {
    width: 100%;
    max-width: 600px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;

    h2 {
      margin-top: 20px;
    }

    p {
      margin: 10px 0;
    }

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .logo {
        object-fit: contain;
        margin-right: 20px;
      }

      .address {
        flex: 1;

        p {
          margin: 0;
        }
      }
    }
  }

  .button-container {
    margin-top: 20px;
  }

  .footer {
    margin-top: 20px;
    text-align: center;
    font-size: 12px;
  }
`;

const PaymentModalContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
  }

  .form-field {
    margin-bottom: 20px;
  }

  /* New styles for brighter fields */
  .bright-input {
    background-color: #f0f0f0;
    color: #333;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 10px;
    }
  }
`;

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [validationError, setValidationError] = useState("");

  const { state } = useLocation();
  const { invoId } = state;

  const handlePay = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    // Validate credit card information
    if (!cardNumber || cardNumber.length !== 16) {
      setValidationError("Please enter a valid 16-digit card number.");
      return;
    }

    if (!expirationDate.match(/^\d{4}\/\d{2}$/)) {
      setValidationError("Please enter a valid expiration date (YYYY/MM).");
      return;
    }

    if (!cvv || cvv.length !== 3) {
      setValidationError("Please enter a valid 3-digit CVV number.");
      return;
    }

    // If all validations pass, close the modal and simulate a successful payment
    setValidationError("");
    setIsModalOpen(false);
    setPaymentSuccess(true);

    // Update the invoice status to "Pending"
    axios
      .put(`http://localhost:8080/invoice/updateInvoice/${invoId}`, {
        invoiceStatus: "Pending",
      })
      .then((response) => {
        console.log("Invoice status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating invoice status:", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/invoice/getInvoiceWithUsageDataByInvoiceId/${invoId}`
      )
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

    document.body.innerHTML = printableContent.innerHTML;

    window.print();

    document.body.innerHTML = originalContent;
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <StyledContainer>
      <div className="device-text">
        <h1 className="device-details-heading">Invoice Details</h1>

        <div className="printable-content" id="printable-content">
          <div className="header">
            <img
              alt="logo"
              src={logoImage}
              className="logo"
              width={150}
              height={150}
            />
            <div className="address">
              <p>
                Dionicko drustvo BB Telecom Sarajevo Ulica Izmisljena 65,
                Sarajevo, ID PDV BROJ: 2232323232
              </p>
              <p>Direkcija Sarajevo, Ulica Izmisljena 55, Sarajevo</p>
            </div>
          </div>

          <h2>{`${invoice[0].customerFirstName} ${invoice[0].customerLastName}`}</h2>
          <p>{`Telephone number: +${invoice[0].customerSubscriptionTelephoneNumber}`}</p>

          <h2>{`Subscription info`}</h2>
          <p>{`Start date: ${
            invoice[0].customerSubscriptionStartDate
              ? new Date(
                  invoice[0].customerSubscriptionStartDate
                ).toLocaleDateString("en-GB")
              : "N/A"
          }`}</p>
          <p>{`Contract Length: ${invoice[0].customerSubscriptionContractLength}`}</p>

          <h2>{`Data usage info`}</h2>
          <p>{`Minutes: ${invoice[0].callMinutes} minutes`}</p>
          <p>{`Data usage: ${invoice[0].dataUsage} MB`}</p>

          <h2>{`Invoice status`}</h2>
          <p>{`Due date: ${
            invoice[0].dueDate
              ? new Date(invoice[0].dueDate).toLocaleDateString("en-GB")
              : "N/A"
          }`}</p>
          <p>{`Invoice date: ${
            invoice[0].invoiceDate
              ? new Date(invoice[0].invoiceDate).toLocaleDateString("en-GB")
              : "N/A"
          }`}</p>

          <p>{`Status: ${invoice[0].totalCost} KM`}</p>
          <p>{`Status: ${invoice[0].invoiceStatus}`}</p>

          <div className="footer">
            <p>Thank you for choosing BB Telecom!</p>
          </div>
        </div>

        <div className="button-container">
          <Button onClick={handlePrint}>Print Invoice</Button>
          {!paymentSuccess && <Button onClick={handlePay}>Pay Invoice</Button>}
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          setValidationError("");
        }}
        contentLabel="Payment Modal"
      >
        <PaymentModalContainer>
          <h2>Enter Payment Information</h2>

          {validationError && (
            <p style={{ color: "red", textAlign: "center" }}>
              {validationError}
            </p>
          )}

          <TextField
            label="Customer First Name"
            className={`form-field bright-input`}
            value={invoice[0].customerFirstName}
            disabled
          />

          <TextField
            label="Customer Last Name"
            className={`form-field bright-input`}
            value={invoice[0].customerLastName}
            disabled
          />

          <TextField
            label="Customer Address"
            className={`form-field black-input`}
            value={invoice[0].customerAddress}
            disabled
          />

          <TextField
            label="Card Number"
            className="form-field"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />

          <TextField
            label="Expiration Date (YYYY/MM)"
            className="form-field"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />

          <TextField
            label="CVV"
            className="form-field"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />

          <div className="button-container">
            <Button
              onClick={handleModalClose}
              variant="contained"
              color="primary"
            >
              Confirm Payment
            </Button>
          </div>
        </PaymentModalContainer>
      </ReactModal>
    </StyledContainer>
  );
};

export default InvoiceDetails;
