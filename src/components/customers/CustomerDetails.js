import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#FF4081",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  backButton: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  editButton: {
    marginLeft: theme.spacing(1),
  },
}));

const EditCustomerModal = ({ customer, onClose, onUpdate }) => {
  const [editedCustomer, setEditedCustomer] = useState({
    ...customer,
    location: { city: "", district: "", id: "" },
    occupation: { occupationName: "", id: "" },
  });
  const [locations, setLocations] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get(
          "http://localhost:8080/location/getAllLocations"
        );
        const occupationsResponse = await axios.get(
          "http://localhost:8080/occupation/getAllOccupations"
        );

        setLocations(locationsResponse.data);
        setOccupations(occupationsResponse.data);
      } catch (error) {
        console.error("Error fetching select field data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (parentName, nestedName, value, id) => {
    setEditedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [parentName]: {
        ...prevCustomer[parentName],
        [nestedName]: value,
        id: id,
      },
    }));
  };

  const handleUpdate = async () => {
    if (customer) {
      const customerToSend = {
        id: customer.id,
        locationId: editedCustomer.location.id,
        occupationId: editedCustomer.occupation.id,
        address: editedCustomer.address,
        lastName: editedCustomer.lastName,
        firstName: editedCustomer.firstName,
        genderId: editedCustomer.genderId,
      };
      try {
        await axios.put(
          `http://localhost:8080/customer/updateCustomer/${editedCustomer.id}`,
          customerToSend
        );

        console.log("After update - editedCustomer:", customerToSend);

        onUpdate(customerToSend);
        onClose();
        window.location.reload();
      } catch (error) {
        console.error("Error updating customer: ", error);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Typography variant="h5">Edit Customer</Typography>
        <form className={classes.form}>
          <TextField
            label="First Name"
            name="firstName"
            value={editedCustomer.firstName}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={editedCustomer.lastName}
            onChange={handleInputChange}
          />

          <FormControl>
            <InputLabel>Location</InputLabel>
            <Select
              name="location.city"
              value={editedCustomer.location.city}
              onChange={(e) =>
                handleNestedInputChange(
                  "location",
                  "city",
                  e.target.value,
                  locations.find((location) => location.city === e.target.value)
                    ?.id
                )
              }
            >
              <MenuItem value="">Select Location</MenuItem>
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.city}>
                  {location.city}, {location.district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Occupation</InputLabel>
            <Select
              name="occupation.occupationName"
              value={editedCustomer.occupation.occupationName}
              onChange={(e) =>
                handleNestedInputChange(
                  "occupation",
                  "occupationName",
                  e.target.value,
                  occupations.find(
                    (occupation) => occupation.occupationName === e.target.value
                  )?.id
                )
              }
            >
              <MenuItem value="">Select Occupation</MenuItem>
              {occupations.map((occupation) => (
                <MenuItem key={occupation.id} value={occupation.occupationName}>
                  {occupation.occupationName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Address"
            name="address"
            value={editedCustomer.address}
            onChange={handleInputChange}
          />

          <div className={classes.buttonContainer}>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              Save Changes
            </Button>
            <Button
              onClick={onClose}
              variant="contained"
              color="secondary"
              className={classes.editButton}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
};

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const { state } = useLocation();
  const { custId } = state;
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await axios.get(
          `http://localhost:8080/customer/getCustomerById/${custId}`
        );
        console.log("Customer Response data:", customerResponse.data);
        setCustomer(customerResponse.data);

        const customerId = customerResponse.data.id;

        const userResponse = await axios.get(
          `http://localhost:8080/customerSubscription/getCustomerSubscriptionByCustomerId/${customerId}`
        );
        console.log("User Response data:", userResponse.data);
        setUser(userResponse.data);

        if (userResponse.data && userResponse.data.deviceInfoId) {
          const deviceInfoResponse = await axios.get(
            `http://localhost:8080/customerSubscriptionDeviceInfo/getCustomerSubscriptionDeviceInfoById/${userResponse.data.deviceInfoId}`
          );
          console.log("DeviceInfo Response data:", deviceInfoResponse.data);
          setDeviceInfo(deviceInfoResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
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
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <Typography variant="h5">Customer Details</Typography>
        <Link to={"/customers"} className={classes.backButton}>
          <Button variant="outlined" color="primary">
            Back
          </Button>
        </Link>

        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{customer.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>{customer.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>{customer.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gender</TableCell>
                <TableCell>{customer.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Occupation</TableCell>
                <TableCell>{customer.occupationName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>{customer.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>{customer.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>District</TableCell>
                <TableCell>{customer.district}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div className={classes.buttonContainer}>
          <Button
            onClick={handleEdit}
            variant="contained"
            color="primary"
            className={classes.editButton}
          >
            Edit
          </Button>
        </div>

        {showEditModal && (
          <EditCustomerModal
            customer={customer}
            onClose={handleEditModalClose}
            onUpdate={handleUpdateCustomer}
          />
        )}

        {user ? (
          <div className={classes.container}>
            <Typography variant="h5">Customer Subscription Details</Typography>
            {deviceInfo ? (
              <TableContainer
                component={Paper}
                className={classes.tableContainer}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Device info</TableCell>
                      <TableCell>Device number of months</TableCell>
                      <TableCell>Device active</TableCell>
                      <TableCell>Plan</TableCell>
                      <TableCell>Start date of Subscription</TableCell>
                      <TableCell>Telephone Number</TableCell>
                      <TableCell>Contract Length</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>
                        {deviceInfo &&
                          deviceInfo.device &&
                          deviceInfo.device.make +
                            " " +
                            deviceInfo.device.model}
                      </TableCell>
                      <TableCell>
                        {deviceInfo &&
                        deviceInfo.onNumberOfMonths !== null &&
                        deviceInfo.onNumberOfMonths !== undefined
                          ? deviceInfo.onNumberOfMonths
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {deviceInfo &&
                        deviceInfo.isActive !== null &&
                        deviceInfo.isActive !== undefined
                          ? deviceInfo.isActive
                            ? "Yes"
                            : "No"
                          : "Unknown"}
                      </TableCell>
                      <TableCell>
                        {user.customPlanId ? "Custom Plan" : "Existing Plan"}
                      </TableCell>
                      <TableCell>
                        {new Date(user.startDate).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>{user.telephoneNumber}</TableCell>
                      <TableCell>{user.contractLength}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1">
                Customer does not have a created subscription.
              </Typography>
            )}
          </div>
        ) : (
          <Typography variant="body1">
            User does not have a subscription.
          </Typography>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CustomerDetails;
