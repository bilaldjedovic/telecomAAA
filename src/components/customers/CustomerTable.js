import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

const AddCustomer = ({ onClose, onUpdate }) => {
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    location: { id: 0, city: "", district: "" },
    occupation: { occupationName: "", id: 0 },
    gender: { gender: "", id: 0 },
    address: "",
  });

  const [locations, setLocations] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get(
          "http://localhost:8080/location/getAllLocations"
        );
        const occupationsResponse = await axios.get(
          "http://localhost:8080/occupation/getAllOccupations"
        );
        const gendersResponse = await axios.get(
          "http://localhost:8080/gender/getAllGenders"
        );

        setLocations(locationsResponse.data);
        setOccupations(occupationsResponse.data);
        setGenders(gendersResponse.data);
      } catch (error) {
        console.error("Error fetching select field data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [fieldName, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      setNewCustomer((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: {
          ...prevCustomer[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      setNewCustomer((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: value,
      }));
    }
  };

  const handleCreation = async () => {
    try {
      await axios.post(
        "http://localhost:8080/customer/createCustomer",
        newCustomer
      );

      onUpdate(newCustomer);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating customer: ", error);
    }
  };

  return (
    <div>
      <h2>Add Customer</h2>
      <form>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={newCustomer.firstName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={newCustomer.lastName}
            onChange={handleInputChange}
          />
        </label>

        <select
          name="location.id"
          value={newCustomer.location.id}
          onChange={handleInputChange}
        >
          <option value="">Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.city}, {location.district}
            </option>
          ))}
        </select>

        <select
          name="occupation.id"
          value={newCustomer.occupation.id}
          onChange={handleInputChange}
        >
          <option value="">Select Occupation</option>
          {occupations.map((occupation) => (
            <option key={occupation.id} value={occupation.id}>
              {occupation.occupationName}
            </option>
          ))}
        </select>

        <select
          name="gender.id"
          value={newCustomer.gender.id}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.gender}
            </option>
          ))}
        </select>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
          />
        </label>

        <button type="button" onClick={handleCreation}>
          Create Customer
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};
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
      <button onClick={handleAdd}>Add new customer</button>
      {showAddModal && (
        <AddCustomer
          onClose={handleAddModalClose}
          onUpdate={handleAddCustomer}
        />
      )}
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

                <button onClick={() => handleDelete(customer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
