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
import TextField from "@mui/material/TextField";
import styled from "styled-components";

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
    <StyledContainer>
      <h2>Invoice List</h2>

      <div className="filterInputs">
        <TextField
          id="filterName"
          label="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />

        <TextField
          id="filterLastName"
          label="Filter by Last Name"
          value={filterLastName}
          onChange={(e) => setFilterLastName(e.target.value)}
        />
      </div>

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
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{`${invoice.customerSubscriptionId}`}</TableCell>
                <TableCell>{invoice.totalCost}</TableCell>
                <TableCell>
                  {new Date(invoice.dueDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell>
                  {new Date(invoice.invoiceDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className={`status-${invoice.status.toLowerCase()}`}>
                  {invoice.status}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(invoice.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
};

export default InvoiceTable;
