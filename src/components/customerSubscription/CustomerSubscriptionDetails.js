import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const CustomerSubscriptionDetails = () => {
  const [subscription, setSubscription] = useState(null);
  const { state } = useLocation();
  const { subId } = state;

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/customerSubscription/getCustomerSubscriptionById/${subId}`
      )
      .then((response) => {
        console.log("Response data:", response.data);
        setSubscription(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subscription details: ", error);
      });
  }, [subId]);

  if (!subscription) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Subscription Details</h2>
      <Link to={"/subscriptions"}>
        <Button>Back</Button>
      </Link>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{subscription.id}</td>
          </tr>
          <tr>
            <th>Customer Name</th>
            <td>{`${subscription.customer.firstName} ${subscription.customer.lastName}`}</td>
          </tr>
          <tr>
            <th>Customer Address</th>
            <td>{`${subscription.customer.address}`}</td>
          </tr>
          <tr>
            <th>Customer Location</th>
            <td>{`${subscription.customer.location.city} ${subscription.customer.location.district}`}</td>
          </tr>
          <tr>
            <th>Customer Occupation</th>
            <td>{`${subscription.customer.occupation.occupationName}`}</td>
          </tr>
          <tr>
            <th>Device info</th>
            <td>{`${subscription.deviceInfo.device.make} ${subscription.deviceInfo.device.model}`}</td>
          </tr>
          <tr>
            <th>Device cost</th>
            <td>{`${subscription.deviceInfo.device.cost} $`}</td>
          </tr>
          <tr>
            <th>Device number of months</th>
            <td>
              {subscription.deviceInfo.onNumberOfMonths === null
                ? "N/A"
                : `${subscription.deviceInfo.onNumberOfMonths} months`}
            </td>
          </tr>
          <tr>
            <th>Device active</th>
            <td>{subscription.deviceInfo.isActive ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <th>Plan</th>
            <td>
              {subscription.customPlan ? "Custom Plan" : subscription.plan.name}
            </td>
          </tr>
          <tr>
            <th>Plan cost</th>
            <td>{`${subscription.plan?.costPerMonth} $`}</td>
          </tr>
          <tr>
            <th>Plan length</th>
            <td>{`${subscription.plan?.minimumContractLength} months`}</td>
          </tr>
          <tr>
            <th>Start date of Subscription</th>
            <td>
              {new Date(subscription.startDate).toLocaleDateString("en-GB")}
            </td>
          </tr>
          <tr>
            <th>Telephone Number</th>
            <td>{subscription.telephoneNumber}</td>
          </tr>
          <tr>
            <th>Contract Length</th>
            <td>{subscription.contractLength}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerSubscriptionDetails;
