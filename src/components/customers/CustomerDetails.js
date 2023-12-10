import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { BounceLoader } from "react-spinners";

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
      window.location.reload();
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
  const [user, setUser] = useState(null);
  const { state } = useLocation();
  const { custId } = state;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/getCustomerById/${custId}`)
      .then((response) => {
        console.log("Response data:", response.data);
        setCustomer(response.data);

        const customerId = response.data.id;
        axios
          .get(
            `http://localhost:8080/customerSubscription/getCustomerSubscriptionByCustomerId/${customerId}`
          )
          .then((userResponse) => {
            console.log("User Response data:", userResponse.data);
            setUser(userResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching user details: ", error);
          });
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

  if ((!customer, !user)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!customer && !user ? (
        <div className="loader">
          <BounceLoader
            size={30}
            color={"rgb(220,53,69)"}
            loading={customer && user}
          />
        </div>
      ) : (
        <div>
          {customer && (
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
          )}

          {user && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer Name</th>
                  <th>Device info</th>
                  <th>Device number of months</th>
                  <th>Device active</th>
                  <th>Plan</th>
                  <th>Start date of Subscription</th>
                  <th>Telephone Number</th>
                  <th>Contract Length</th>
                </tr>
              </thead>
              <tbody>
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.customer.firstName + " " + user.customer.lastName}
                  </td>
                  <td>
                    {user.deviceInfo.device.make +
                      " " +
                      user.deviceInfo.device.model}
                  </td>
                  <td>
                    {user.deviceInfo.onNumberOfMonths === null
                      ? "N/A"
                      : user.deviceInfo.onNumberOfMonths > 0
                      ? ` ${user.deviceInfo.onNumberOfMonths}`
                      : "Invalid number of months"}
                  </td>
                  <td>
                    {user.deviceInfo.isActive === true
                      ? "Yes"
                      : user.deviceInfo.isActive === false
                      ? "No"
                      : "Unknown"}
                  </td>

                  <td>{user.customPlan ? "Custom Plan" : user.plan.name}</td>
                  <td>
                    {new Date(user.startDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>{user.telephoneNumber}</td>
                  <td>{user.contractLength}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;
