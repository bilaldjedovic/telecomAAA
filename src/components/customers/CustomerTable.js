import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

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

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const handleEdit = (customerId) => {
    navigate("/customer/edit", { state: { custId: customerId } });
  };

  const handleDelete = async (customerId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${customerId} customer?`
      )
    ) {
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
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Customer List</h2>
      <Link to={"/createCustomers"}>
        <Button>Add new customer</Button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.address}</td>
              <td>
                <Button onClick={() => handleEdit(customer.id)}>View</Button>

                <Button onClick={() => handleDelete(customer.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
