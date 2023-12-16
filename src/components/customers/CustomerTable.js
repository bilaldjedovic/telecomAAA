import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TextField from "@mui/material/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import "./CustomersTable.css"; // Import CSS file for additional styling

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 10,
  },
  filterInput: {
    marginBottom: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    marginRight: 10,
  },
  tableContainer: {
    marginTop: 20,
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  tableCell: {
    border: `1px solid ${theme.palette.grey[400]}`,
    textAlign: "left",
    padding: 12,
  },
  actionsCell: {
    display: "flex",
    gap: 8,
  },
  editButton: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const CustomersTable = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterFirstName, setFilterFirstName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/customer/getAllCustomers")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (customerId) => {
    navigate("/customer/edit", { state: { custId: customerId } });
  };

  const handleDelete = async (customerId) => {
    if (window.confirm(`Are you sure you want to delete this customer?`)) {
      try {
        await axios.delete(
          `http://localhost:8080/customer/deleteCustomer/${customerId}`
        );
        const updatedCustomers = customers.filter(
          (customer) => customer.id !== customerId
        );
        setCustomers(updatedCustomers);
      } catch (error) {
        console.error("Error deleting customer: ", error);
        window.alert(`Error deleting customer, customer cannot be deleted!`);
      }
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName
        .toLowerCase()
        .includes(filterFirstName.toLowerCase()) &&
      customer.lastName.toLowerCase().includes(filterLastName.toLowerCase())
  );

  return (
    <div className={classes.container}>
      <h2>Customer List</h2>

      <div>
        <TextField
          type="text"
          label="Filter by First Name"
          value={filterFirstName}
          onChange={(e) => setFilterFirstName(e.target.value)}
          className={classes.filterInput}
        />
        <TextField
          type="text"
          label="Filter by Last Name"
          value={filterLastName}
          onChange={(e) => setFilterLastName(e.target.value)}
          className={classes.filterInput}
        />
        <Link to="/createCustomers">
          <Button className={classes.addButton}>Add new customer</Button>
        </Link>
      </div>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <TableRow
                key={customer.id}
                className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
              >
                <TableCell className={classes.tableCell}>
                  {customer.id}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {customer.firstName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {customer.lastName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {customer.address}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <div className={classes.actionsCell}>
                    <Button
                      className={classes.editButton}
                      onClick={() => handleEdit(customer.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      className={classes.deleteButton}
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomersTable;
