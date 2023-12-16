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
import { makeStyles } from "@material-ui/core/styles";
import "./CustomerSubTable.css";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 20,
    padding: 20,
  },
  filterInput: {
    marginBottom: 10,
    marginRight: 10,
  },
  table: {
    width: "100%",
    marginTop: 20,
  },

  tableCell: {
    border: `1px solid ${theme.palette.grey[400]}`,
    textAlign: "left",
    padding: 10,
  },
  oddRow: {
    backgroundColor: theme.palette.grey[100],
  },
  evenRow: {
    backgroundColor: theme.palette.common.white,
  },
  viewButton: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
}));

const CustomersSubscriptionTable = () => {
  const classes = useStyles();

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");
  const navigate = useNavigate();
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptionData = await axios.get(
          "http://localhost:8080/customerSubscription/findCustomerSubscriptionsWithCustomers"
        );
        console.log("SubscriptionData Response data:", subscriptionData.data);
        setSubscriptions(subscriptionData.data);

        if (
          subscriptionData.data &&
          subscriptionData.data.length > 0 &&
          subscriptionData.data[0].deviceInfoId
        ) {
          const deviceInfoResponse = await axios.get(
            `http://localhost:8080/customerSubscriptionDeviceInfo/getCustomerSubscriptionDeviceInfoById/${subscriptionData.data[0].deviceInfoId}`
          );
          console.log("DeviceInfo Response data:", deviceInfoResponse.data);
          setDeviceInfo(deviceInfoResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.firstName.toLowerCase().includes(filterName.toLowerCase()) &&
      subscription.lastName.toLowerCase().includes(filterLastName.toLowerCase())
  );

  const handleEdit = (subscription) => {
    if (subscription && subscription.customerSubscriptionId) {
      navigate("/subscriptions/details", {
        state: { subId: subscription.customerSubscriptionId },
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.container}>
      <h2>Subscription List</h2>
      <div>
        <TextField
          label="Filter by Name"
          type="text"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className={classes.filterInput}
        />
        <TextField
          label="Filter by Last Name"
          type="text"
          value={filterLastName}
          onChange={(e) => setFilterLastName(e.target.value)}
          className={classes.filterInput}
        />
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>ID</TableCell>
              <TableCell className={classes.tableHeader}>
                Customer Name
              </TableCell>
              <TableCell className={classes.tableHeader}>Device info</TableCell>
              <TableCell className={classes.tableHeader}>
                Device number of months
              </TableCell>
              <TableCell className={classes.tableHeader}>
                Device active
              </TableCell>
              <TableCell className={classes.tableHeader}>Plan</TableCell>
              <TableCell className={classes.tableHeader}>
                Start date of Subscription
              </TableCell>
              <TableCell className={classes.tableHeader}>
                Telephone Number
              </TableCell>
              <TableCell className={classes.tableHeader}>
                Contract Length
              </TableCell>
              <TableCell className={classes.tableHeader}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubscriptions.map((subscription, index) => (
              <TableRow
                key={subscription.customerSubscriptionId}
                className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
              >
                <TableCell className={classes.tableCell}>
                  {subscription.customerSubscriptionId}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {subscription.firstName + " " + subscription.lastName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {deviceInfo.device.make + " " + deviceInfo.device.model}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {subscription.onNumberOfMonths}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {deviceInfo && deviceInfo.device && deviceInfo.isActive
                    ? "Yes"
                    : "No"}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {subscription.customPlanId ? "Custom Plan" : "Telecom Plan"}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {new Date(subscription.startDate).toLocaleDateString("en-GB")}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {subscription.telephoneNumber}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {subscription.contractLength}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Button
                    variant="contained"
                    className={classes.viewButton}
                    onClick={() => handleEdit(subscription)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomersSubscriptionTable;
