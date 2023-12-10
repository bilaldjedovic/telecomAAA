import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ModalForm.css";
import "./CreateCustomer.css";

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
      const response = await axios.post(
        "http://localhost:8080/customer/createCustomer",
        newCustomer
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
      <h2>Add Customer</h2>
      <form>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={newCustomer.firstName}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={newCustomer.lastName}
            onChange={handleInputChange}
            className="form-input"
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
            className="form-input"
          />
        </label>

        <button type="button" onClick={handleCreation}>
          Create Customer
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {customerId && (
        <SubscriptionForm
          customerId={customerId}
          customer={newCustomer}
          onClose={onClose}
        />
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

    const [fieldName, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      setSubscriptionData((prevData) => ({
        ...prevData,
        [fieldName]: {
          ...prevData[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      setSubscriptionData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1 && subscriptionData.planType === "custom") {
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
    } else if (currentStep === 2) {
      try {
        const customPlanServiceData = {
          service: {
            id: subscriptionData.selectedServiceId,
            serviceName: "", // Fill in the details based on your service selection
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
        if (subscriptionData.deviceInfo.confirm === "yes") {
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
        planId = selectedPlanId;
      } else {
        customPlanIdToSend = customPlanId;
      }

      // Send the correct data to the server
      const response = await axios.post(
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
            <label>
              Plan Type:
              <select
                name="planType"
                value={subscriptionData.planType}
                onChange={handleSubscriptionInputChange}
              >
                <option value="existing">Select Existing Plan</option>
                <option value="custom">Create Custom Plan</option>
              </select>
            </label>

            {subscriptionData.planType === "existing" && (
              <select
                name="selectedPlanId"
                value={subscriptionData.selectedPlanId}
                onChange={handleSubscriptionInputChange}
              >
                <option value="">Select Plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            )}

            {subscriptionData.planType === "custom" && (
              <div>
                <label>
                  Custom Plan Cost Per Month:
                  <input
                    type="number"
                    name="customPlan.costPerMonth"
                    value={subscriptionData.customPlan.costPerMonth}
                    onChange={handleSubscriptionInputChange}
                  />
                </label>
                <label>
                  Custom Plan Minimum Contract Length (months):
                  <input
                    type="number"
                    name="customPlan.minimumContractLength"
                    value={subscriptionData.customPlan.minimumContractLength}
                    onChange={handleSubscriptionInputChange}
                  />
                </label>
              </div>
            )}
          </>
        )}

        {currentStep === 2 && subscriptionData.planType === "custom" && (
          <div>
            <select
              name="selectedServiceId"
              value={subscriptionData.selectedServiceId}
              onChange={handleSubscriptionInputChange}
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}, {service.description}, {service.costPerMonth}
                </option>
              ))}
            </select>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <label>
              Do you want to add device?
              <select
                name="deviceInfo.confirm"
                value={subscriptionData.deviceInfo.confirm}
                onChange={handleSubscriptionInputChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

            {subscriptionData.deviceInfo.confirm === "yes" && (
              <div>
                <select
                  name="deviceInfo.deviceId"
                  value={subscriptionData.deviceInfo.deviceId}
                  onChange={handleSubscriptionInputChange}
                >
                  <option value="">Select Device</option>
                  {devices.map((device) => (
                    <option key={device.id} value={device.id}>
                      {device.make}, {device.model}, {device.cost}
                    </option>
                  ))}
                </select>

                <label>
                  On number of months:
                  <input
                    type="number"
                    name="deviceInfo.onNumberOfMonths"
                    value={subscriptionData.deviceInfo.onNumberOfMonths}
                    onChange={handleSubscriptionInputChange}
                  />
                </label>

                <label>
                  Start date:
                  <input
                    type="date"
                    name="deviceInfo.startDate"
                    value={subscriptionData.deviceInfo.startDate}
                    onChange={handleSubscriptionInputChange}
                  />
                </label>

                <label>
                  Is Active:
                  <select
                    name="deviceInfo.isActive"
                    value={subscriptionData.deviceInfo.isActive}
                    onChange={handleSubscriptionInputChange}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </label>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <label>
              Telephone Number:
              <input
                type="text"
                name="telephoneNumber"
                value={subscriptionData.telephoneNumber}
                onChange={handleSubscriptionInputChange}
              />
            </label>

            <label>
              Contract Length:
              <input
                type="number"
                name="contractLength"
                value={subscriptionData.contractLength}
                onChange={handleSubscriptionInputChange}
              />
            </label>

            <label>
              Start date of subscription:
              <input
                type="date"
                name="startDate"
                value={subscriptionData.startDate}
                onChange={handleSubscriptionInputChange}
              />
            </label>
          </div>
        )}

        {currentStep > 1 && (
          <button type="button" onClick={handlePreviousStep}>
            Previous
          </button>
        )}

        {currentStep < 4 ? (
          <button type="button" onClick={handleNextStep}>
            Next
          </button>
        ) : (
          <button type="button" onClick={handleSubscriptionCreation}>
            Create Subscription
          </button>
        )}

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCustomers;
