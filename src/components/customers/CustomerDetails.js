import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const EditCustomerModal = ({ customer, onClose, onUpdate }) => {
  const [editedCustomer, setEditedCustomer] = useState({ ...customer });
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
      setEditedCustomer((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: {
          ...prevCustomer[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      setEditedCustomer((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/customer/updateCustomer/${editedCustomer.id}`,
        editedCustomer
      );

      onUpdate(editedCustomer);
      onClose();
    } catch (error) {
      console.error("Error updating customer: ", error);
    }
  };

  return (
    <div>
      <h2>Edit Customer</h2>
      <form>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={editedCustomer.firstName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={editedCustomer.lastName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Location:
          <select
            name="location.city"
            value={editedCustomer.location.city}
            onChange={handleInputChange}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.city}>
                {location.city}, {location.district}
              </option>
            ))}
          </select>
        </label>

        <label>
          Occupation:
          <select
            name="occupation.occupationName"
            value={editedCustomer.occupation.occupationName}
            onChange={handleInputChange}
          >
            <option value="">Select Occupation</option>
            {occupations.map((occupation) => (
              <option key={occupation.id} value={occupation.occupationName}>
                {occupation.occupationName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Gender:
          <select
            name="gender.gender"
            value={editedCustomer.gender.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.gender}>
                {gender.gender}
              </option>
            ))}
          </select>
        </label>

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={editedCustomer.address}
            onChange={handleInputChange}
          />
        </label>

        <button type="button" onClick={handleUpdate}>
          Save Changes
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { state } = useLocation();
  const { custId } = state;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/getCustomerById/${custId}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer details: ", error);
      });
  }, [custId]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer Details</h2>

      <Link to={"/customers"}>
        <Button>Back</Button>
      </Link>

      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{customer.id}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>{customer.firstName}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{customer.lastName}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>{customer.gender.gender}</td>
          </tr>
          <tr>
            <th>Occupation</th>
            <td>{customer.occupation.occupationName}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{customer.address}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{customer.location.city}</td>
          </tr>
          <tr>
            <th>District</th>
            <td>{customer.location.district}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleEdit}>Edit</button>
      {showEditModal && (
        <EditCustomerModal
          customer={customer}
          onClose={handleEditModalClose}
          onUpdate={handleUpdateCustomer}
        />
      )}
    </div>
  );
};

export default CustomerDetails;
