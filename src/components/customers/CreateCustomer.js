import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const CreateCustomers = ({ onClose, onUpdate }) => {
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
  const [successMessage, setSuccessMessage] = useState("");
  const [customerId, setCustomerId] = useState(null);

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
      const customerToSend = {
        firstName: newCustomer.firstName,
        lastName: newCustomer.lastName,
        locationId: parseInt(newCustomer.location.id),
        occupationId: parseInt(newCustomer.occupation.id),
        genderId: parseInt(newCustomer.gender.id),
        address: newCustomer.address,
      };
      const response = await axios.post(
        "http://localhost:8080/customer/createCustomer",
        customerToSend
      );

      const createdCustomerId = response.data.id;

      if (onUpdate && typeof onUpdate === "function") {
        onUpdate(newCustomer);
      }

      setSuccessMessage("Customer created successfully!");
      setCustomerId(createdCustomerId);
    } catch (error) {
      console.error("Error creating customer: ", error);
    }
  };

  return (
    <div className="modal-container">
      {customerId ? (
        <CreateUser
          customerId={customerId}
          customer={newCustomer}
          onClose={onClose}
        />
      ) : (
        <>
          <h2>Add Customer</h2>
          <form>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              value={newCustomer.firstName}
              onChange={handleInputChange}
              className="form-input"
            />

            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              value={newCustomer.lastName}
              onChange={handleInputChange}
              className="form-input"
            />

            <FormControl>
              <InputLabel>Select Location</InputLabel>
              <Select
                name="location.id"
                value={newCustomer.location.id}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Location</MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.city}, {location.district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Select Occupation</InputLabel>
              <Select
                name="occupation.id"
                value={newCustomer.occupation.id}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Occupation</MenuItem>
                {occupations.map((occupation) => (
                  <MenuItem key={occupation.id} value={occupation.id}>
                    {occupation.occupationName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Select Gender</InputLabel>
              <Select
                name="gender.id"
                value={newCustomer.gender.id}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Gender</MenuItem>
                {genders.map((gender) => (
                  <MenuItem key={gender.id} value={gender.id}>
                    {gender.gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Address"
              type="text"
              name="address"
              value={newCustomer.address}
              onChange={handleInputChange}
              className="form-input"
            />

            <Button type="button" onClick={handleCreation}>
              Create Customer
            </Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </form>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </>
      )}
    </div>
  );
};

const CreateUser = ({ onClose, onUpdate, customerId }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    roleId: 2,
    customerId: customerId,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [fieldName, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      setNewUser((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: {
          ...prevCustomer[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      setNewUser((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: value,
      }));
    }
  };

  const handleCreation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/createUser",
        newUser
      );

      const createdUserId = response.data.id;

      setUserId(createdUserId);

      setSuccessMessage("Customer created successfully!");
    } catch (error) {
      console.error("Error creating customer: ", error);
    }
  };

  return (
    <div className="modal-container">
      {userId ? (
        <SubscriptionForm customerId={customerId} onClose={onClose} />
      ) : (
        <>
          <h2>Add User</h2>
          <form>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              className="form-input"
            />

            <TextField
              label="Password"
              type="text"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="form-input"
            />

            <TextField
              label="Email"
              type="text"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="form-input"
            />

            <Button type="button" onClick={handleCreation}>
              Create User
            </Button>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
          </form>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </>
      )}
    </div>
  );
};

const SubscriptionForm = ({ customerId, customer, onClose }) => {
  const [subscriptionData, setSubscriptionData] = useState({
    customPlanId: 0,
    planId: 0,
    deviceInfoId: 0,
    telephoneNumber: "",
    contractLength: 12,
    startDate: "",
    customer: customerId,
    planType: "existing",
    selectedPlanId: "",
    customPlan: {
      costPerMonth: 0,
      minimumContractLength: 0,
    },
    selectedServiceId: "",
    deviceInfo: {
      confirm: "no",
      deviceId: "",
      onNumberOfMonths: 0,
      startDate: "",
      isActive: "yes",
    },
  });

  const [plans, setPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [customPlan, setCustomPlan] = useState(null);
  const [subscriptionSuccessMessage, setSubscriptionSuccessMessage] =
    useState("");

  useEffect(() => {
    const fetchDataSubscription = async () => {
      try {
        const planResponse = await axios.get(
          "http://localhost:8080/plan/getAllPlans"
        );

        const servicesResponse = await axios.get(
          "http://localhost:8080/service/getAllServices"
        );

        const deviceResponse = await axios.get(
          "http://localhost:8080/device/getAllDevices"
        );

        setDevices(deviceResponse.data);
        setPlans(planResponse.data);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Error fetching select field data: ", error);
      }
    };

    fetchDataSubscription();
  }, []);

  const handleSubscriptionInputChange = (e) => {
    const { name, value } = e.target;

    setSubscriptionData((prevState) => {
      if (name === "deviceInfo.confirm") {
        return {
          ...prevState,
          deviceInfo:
            value === "yes"
              ? {
                  confirm: "yes",
                  deviceId: "",
                  onNumberOfMonths: 0,
                  startDate: "",
                  isActive: "yes",
                }
              : null,
        };
      }

      const nestedField = name.split(".");
      if (nestedField.length === 2) {
        const [fieldName, nestedFieldName] = nestedField;
        return {
          ...prevState,
          [fieldName]: {
            ...prevState[fieldName],
            [nestedFieldName]: value,
          },
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      try {
        const response = await axios.post(
          "http://localhost:8080/customPlan/createCustomPlan",
          subscriptionData.customPlan
        );
        setCustomPlan(response.data);

        setSubscriptionData((prevData) => ({
          ...prevData,
          customPlanId: response.data.id,
        }));

        setCurrentStep((prevStep) => prevStep + 1);
      } catch (error) {
        console.error("Error creating custom plan: ", error);
      }
    } else if (currentStep === 2 && subscriptionData.planType === "custom") {
      try {
        const customPlanServiceData = {
          service: {
            id: subscriptionData.selectedServiceId,
            serviceName: "",
            description: "",
            costPerMonth: 0,
          },
          customPlan: {
            id: customPlan.id,
            costPerMonth: customPlan.costPerMonth,
            minimumContractLength: customPlan.minimumContractLength,
          },
        };

        await axios.post(
          "http://localhost:8080/customPlanService/createCustomPlanService",
          customPlanServiceData
        );

        setCurrentStep((prevStep) => prevStep + 1);
      } catch (error) {
        console.error("Error creating custom plan service: ", error);
      }
    } else if (currentStep === 3) {
      try {
        if (subscriptionData.deviceInfo.confirm === "no") {
          setSubscriptionData((prevData) => ({
            ...prevData,
            deviceInfoId: null,
          }));
        } else if (subscriptionData.deviceInfo.confirm === "yes") {
          const deviceInfoData = {
            device: {
              id: subscriptionData.deviceInfo.deviceId,
              make: "",
              model: "",
              cost: 0,
            },
            onNumberOfMonths: subscriptionData.deviceInfo.onNumberOfMonths,
            isActive: true,
          };

          const response = await axios.post(
            "http://localhost:8080/customerSubscriptionDeviceInfo/createCustomerSubscriptionDeviceInfo",
            deviceInfoData
          );

          setSubscriptionData((prevData) => ({
            ...prevData,
            deviceInfoId: response.data.id,
          }));
        } else {
          setSubscriptionData((prevData) => ({
            ...prevData,
            deviceInfo: null,
          }));
        }

        setCurrentStep((prevStep) => prevStep + 1);
      } catch (error) {
        console.error(
          "Error creating customer subscription device info: ",
          error
        );
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubscriptionCreation = async () => {
    try {
      const {
        planType,
        selectedPlanId,
        customPlanId,
        deviceInfoId,
        telephoneNumber,
        contractLength,
        startDate,
      } = subscriptionData;

      let planId = null;
      let customPlanIdToSend = null;

      if (planType === "existing") {
        planId = parseInt(selectedPlanId);
      } else {
        customPlanIdToSend = customPlanId;
      }

      await axios.post(
        "http://localhost:8080/customerSubscription/createCustomerSubscription",
        {
          customerId: customerId,
          planId: planId,
          customPlanId: customPlanIdToSend,
          deviceInfoId: deviceInfoId,
          telephoneNumber: telephoneNumber,
          contractLength: contractLength,
          startDate: startDate,
        }
      );
      setSubscriptionSuccessMessage("Subscription created successfully!");

      onClose();
    } catch (error) {
      console.error("Error creating subscription: ", error);
    }
  };

  return (
    <div className="modal-container">
      <h2>Create Subscription - Step {currentStep}</h2>
      <form>
        {currentStep === 1 && (
          <>
            <FormControl>
              <InputLabel>Plan Type</InputLabel>
              <Select
                name="planType"
                value={subscriptionData.planType}
                onChange={handleSubscriptionInputChange}
              >
                <MenuItem value="existing">Select Existing Plan</MenuItem>
                <MenuItem value="custom">Create Custom Plan</MenuItem>
              </Select>
            </FormControl>

            {subscriptionData.planType === "existing" && (
              <FormControl>
                <InputLabel>Select Plan</InputLabel>
                <Select
                  name="selectedPlanId"
                  value={subscriptionData.selectedPlanId}
                  onChange={handleSubscriptionInputChange}
                >
                  <MenuItem value="">Select Plan</MenuItem>
                  {plans.map((plan) => (
                    <MenuItem key={plan.id} value={plan.id}>
                      {plan.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {subscriptionData.planType === "custom" && (
              <div>
                <TextField
                  label="Custom Plan Cost Per Month"
                  type="number"
                  name="customPlan.costPerMonth"
                  value={subscriptionData.customPlan.costPerMonth}
                  onChange={handleSubscriptionInputChange}
                />

                <TextField
                  label="Custom Plan Minimum Contract Length (months)"
                  type="number"
                  name="customPlan.minimumContractLength"
                  value={subscriptionData.customPlan.minimumContractLength}
                  onChange={handleSubscriptionInputChange}
                />
              </div>
            )}
          </>
        )}

        {currentStep === 2 && subscriptionData.planType === "custom" && (
          <div>
            <FormControl>
              <InputLabel>Select Service</InputLabel>
              <Select
                name="selectedServiceId"
                value={subscriptionData.selectedServiceId}
                onChange={handleSubscriptionInputChange}
              >
                <MenuItem value="">Select Service</MenuItem>
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}, {service.description},{" "}
                    {service.costPerMonth}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <FormControl>
              <InputLabel>Do you want to add device?</InputLabel>
              <Select
                name="deviceInfo.confirm"
                value={subscriptionData.deviceInfo.confirm}
                onChange={handleSubscriptionInputChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
            </FormControl>

            {subscriptionData.deviceInfo.confirm === "yes" && (
              <div>
                <FormControl>
                  <InputLabel>Select Device</InputLabel>
                  <Select
                    name="deviceInfo.deviceId"
                    value={subscriptionData.deviceInfo.deviceId}
                    onChange={handleSubscriptionInputChange}
                  >
                    <MenuItem value="">Select Device</MenuItem>
                    {devices.map((device) => (
                      <MenuItem key={device.id} value={device.id}>
                        {device.make}, {device.model}, {device.cost}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="On number of months"
                  type="number"
                  name="deviceInfo.onNumberOfMonths"
                  value={subscriptionData.deviceInfo.onNumberOfMonths}
                  onChange={handleSubscriptionInputChange}
                />

                <TextField
                  label="Start date"
                  type="date"
                  name="deviceInfo.startDate"
                  value={subscriptionData.deviceInfo.startDate}
                  onChange={handleSubscriptionInputChange}
                />

                <FormControl>
                  <InputLabel>Is Active</InputLabel>
                  <Select
                    name="deviceInfo.isActive"
                    value={subscriptionData.deviceInfo.isActive}
                    onChange={handleSubscriptionInputChange}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <TextField
              label="Telephone Number"
              type="text"
              name="telephoneNumber"
              value={subscriptionData.telephoneNumber}
              onChange={handleSubscriptionInputChange}
            />

            <TextField
              label="Contract Length"
              type="number"
              name="contractLength"
              value={subscriptionData.contractLength}
              onChange={handleSubscriptionInputChange}
            />

            <TextField
              label="Start date of subscription"
              type="date"
              name="startDate"
              value={subscriptionData.startDate}
              onChange={handleSubscriptionInputChange}
            />
          </div>
        )}

        {subscriptionSuccessMessage && (
          <div className="success-message">{subscriptionSuccessMessage}</div>
        )}

        {currentStep > 1 && (
          <Button type="button" onClick={handlePreviousStep}>
            Previous
          </Button>
        )}

        {currentStep < 4 ? (
          <Button type="button" onClick={handleNextStep}>
            Next
          </Button>
        ) : (
          <Button type="button" onClick={handleSubscriptionCreation}>
            Create Subscription
          </Button>
        )}

        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default CreateCustomers;
