import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

const CustomersSubscriptionTable = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/customerSubscription/getAllCustomerSubscriptions"
      )
      .then((response) => {
        setSubscriptions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const fullName = `${subscription.customer.firstName} ${subscription.customer.lastName}`;
    return (
      fullName.toLowerCase().includes(filterName.toLowerCase()) &&
      subscription.customer.lastName
        .toLowerCase()
        .includes(filterLastName.toLowerCase())
    );
  });

  const handleEdit = (subscription) => {
    navigate("/subscriptions/details", { state: { subId: subscription } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Subscription List</h2>
      <div>
        <label htmlFor="filterName">Filter by Name:</label>
        <input
          type="text"
          id="filterName"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="filterLastName">Filter by Last Name:</label>
        <input
          type="text"
          id="filterLastName"
          value={filterLastName}
          onChange={(e) => setFilterLastName(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Device info</th>
            <th>Device number of months</th>
            <th>Device active</th>
            <th>Custom plan</th>
            <th>Plan</th>
            <th>Start date of Subscription</th>
            <th>Telephone Number</th>
            <th>Contract Length</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubscriptions.map((subscription) => (
            <tr key={subscription.id}>
              <td>{subscription.id}</td>
              <td>
                {subscription.customer.firstName +
                  " " +
                  subscription.customer.lastName}
              </td>
              <td>
                {subscription.deviceInfo.device.make +
                  " " +
                  subscription.deviceInfo.device.model}
              </td>
              <td>
                {subscription.deviceInfo.onNumberOfMonths === null
                  ? "N/A"
                  : subscription.deviceInfo.onNumberOfMonths > 0
                  ? `Months: ${subscription.deviceInfo.onNumberOfMonths}`
                  : "Invalid number of months"}
              </td>
              <td>
                {subscription.deviceInfo.isActive === true
                  ? "Yes"
                  : subscription.deviceInfo.isActive === false
                  ? "No"
                  : "Unknown"}
              </td>
              <td>
                {subscription.customPlan
                  ? subscription.customPlan
                  : "Telecom plan"}
              </td>
              <td>
                {subscription.plan ? subscription.plan.name : "Custom Plan"}
              </td>

              <td>
                {new Date(subscription.startDate).toLocaleDateString("en-GB")}
              </td>
              <td>{subscription.telephoneNumber}</td>
              <td>{subscription.contractLength}</td>
              <td>
                <Button onClick={() => handleEdit(subscription.id)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersSubscriptionTable;
