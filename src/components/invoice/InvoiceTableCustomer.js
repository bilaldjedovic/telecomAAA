import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { useAuth } from "../login/AuthContext";

const StyledContainer = styled.div`
  margin: 20px;

  h2 {
    margin-bottom: 10px;
  }

  .filterInputs {
    margin-bottom: 10px;

    & > div {
      margin-right: 10px;
    }
  }

  .status-Paid {
    color: green;
  }

  .status-Pending {
    color: orange;
  }

  .status-Overdue {
    color: red;
  }
`;

const InvoiceCustomerTable = () => {
  const [invoices, setInvoice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { authenticated, role, customerId } = useAuth();

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/invoice/getInvoicesByCustomerId/${customerId}`
      )
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
    navigate("/invoice/details", { state: { invoId: invoice.invoiceId } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <StyledContainer>
      <h2>Invoice List</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Address</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoiceId}>
                <TableCell>{invoice.invoiceId}</TableCell>
                <TableCell>{`${invoice.customerFirstName} ${invoice.customerLastName}`}</TableCell>
                <TableCell>{invoice.customerAddress}</TableCell>
                <TableCell>{invoice.totalCost}</TableCell>
                <TableCell>
                  {invoice.dueDate &&
                    new Date(invoice.dueDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  {invoice.invoiceDate &&
                    new Date(invoice.invoiceDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell
                  className={`status-${(
                    invoice.invoiceStatus || ""
                  ).toLowerCase()}`}
                >
                  {invoice.invoiceStatus}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(invoice)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
};

export default InvoiceCustomerTable;
