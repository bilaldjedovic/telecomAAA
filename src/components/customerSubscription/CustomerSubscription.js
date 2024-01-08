import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useAuth } from "../login/AuthContext";

const CustomerSubscription = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authenticated, role, customerId } = useAuth();
  const [customer, setCustomer] = useState(null);

  const [deviceInfo, setDeviceInfo] = useState(null);
  const [plan, setPlans] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionData = await axios.get(
          `http://localhost:8080/customerSubscription/findCustomerSubscriptionWithCustomerByCustomerId/${customerId}`
        );
        console.log("SubscriptionData Response data:", subscriptionData.data);
        setSubscription(subscriptionData.data);

        if (subscriptionData.data && subscriptionData.data.customerId) {
          const customerResponse = await axios.get(
            `http://localhost:8080/customer/getCustomerById/${subscriptionData.data.customerId}`
          );
          console.log("DeviceInfo Response data:", customerResponse.data);
          setCustomer(customerResponse.data);
        }

        if (subscriptionData.data && subscriptionData.data.deviceInfoId) {
          const deviceInfoResponse = await axios.get(
            `http://localhost:8080/customerSubscriptionDeviceInfo/getCustomerSubscriptionDeviceInfoById/${subscriptionData.data.deviceInfoId}`
          );
          console.log("DeviceInfo Response data:", deviceInfoResponse.data);
          setDeviceInfo(deviceInfoResponse.data);
        }

        if (subscriptionData.data && subscriptionData.data.planId) {
          const planInfoResponse = await axios.get(
            `http://localhost:8080/plan/getPlanById/${subscriptionData.data.planId}`
          );
          console.log("DeviceInfo Response data:", planInfoResponse.data);
          setPlans(planInfoResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId]);

  if (!subscription) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subscription-details-container" style={{ margin: "60px" }}>
      <Typography variant="h4" gutterBottom style={{ color: "#2196f3" }}>
        My subscription
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow></TableRow>
            {customer && (
              <>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Customer Name
                  </TableCell>
                  <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Customer Address
                  </TableCell>
                  <TableCell>{`${customer.address}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Customer Location
                  </TableCell>
                  <TableCell>{`${customer.city} ${customer.district}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Customer Occupation
                  </TableCell>
                  <TableCell>{`${customer.occupationName}`}</TableCell>
                </TableRow>
              </>
            )}
            {deviceInfo && (
              <>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Device info
                  </TableCell>
                  <TableCell>{`${deviceInfo.device.make} ${deviceInfo.device.model}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Device cost
                  </TableCell>
                  <TableCell>{`${deviceInfo.device.cost} $`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Device number of months
                  </TableCell>
                  <TableCell>
                    {deviceInfo.onNumberOfMonths === null
                      ? "N/A"
                      : `${deviceInfo.onNumberOfMonths} months`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Device active
                  </TableCell>
                  <TableCell>{deviceInfo.isActive ? "Yes" : "No"}</TableCell>
                </TableRow>
              </>
            )}
            <TableRow>
              <TableCell component="th" scope="row">
                Plan
              </TableCell>
              <TableCell>
                {subscription.customPlan ? "Custom Plan" : "Telecom plan"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Plan cost
              </TableCell>
              <TableCell>{`${plan?.costPerMonth} $`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Plan length
              </TableCell>
              <TableCell>{`${plan?.minimumContractLength} months`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Start date of Subscription
              </TableCell>
              <TableCell>
                {new Date(subscription.startDate).toLocaleDateString("en-GB")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Telephone Number
              </TableCell>
              <TableCell>{subscription.telephoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Contract Length
              </TableCell>
              <TableCell>{subscription.contractLength}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerSubscription;
