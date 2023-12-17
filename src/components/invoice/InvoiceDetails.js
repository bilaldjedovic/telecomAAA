import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";

import logoImage from "./bbHTelecom.png";

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

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { state } = useLocation();
  const { invoId } = state;

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
      <Link to={"/invoices"} className="back-button">
        <Button>Back</Button>
      </Link>

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
        </div>
      </div>
    </StyledContainer>
  );
};

export default InvoiceDetails;
