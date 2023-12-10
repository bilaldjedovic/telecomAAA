import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

const AddData = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div>
      <h1>ADD DATA</h1>
      {!activeModal && (
        <Button onClick={() => openModal("role")}>Add Role</Button>
      )}
      {activeModal === "role" && <AddRole onClose={closeModal} />}

      {!activeModal && (
        <Button onClick={() => openModal("occupation")}>Add Occupation</Button>
      )}
      {activeModal === "occupation" && <AddOccupation onClose={closeModal} />}

      {!activeModal && (
        <Button onClick={() => openModal("location")}>Add Location</Button>
      )}
      {activeModal === "location" && <AddLocation onClose={closeModal} />}

      {!activeModal && (
        <Button onClick={() => openModal("service")}>Add Service</Button>
      )}
      {activeModal === "service" && <AddService onClose={closeModal} />}

      {!activeModal && (
        <Button onClick={() => openModal("device")}>Add Device</Button>
      )}
      {activeModal === "device" && <AddDevice onClose={closeModal} />}
    </div>
  );
};

const AddRole = ({ onClose, onUpdate }) => {
  const [newRole, setNewRole] = useState({
    roleName: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [fieldName, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      setNewRole((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: {
          ...prevCustomer[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      setNewRole((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: value,
      }));
    }
  };

  const handleCreation = async () => {
    try {
      await axios.post("http://localhost:8080/role/createRole", newRole);

      onUpdate(newRole);
      onClose();
      // Optionally, update your UI state instead of reloading the page
    } catch (error) {
      console.error("Error creating role: ", error);
    }
  };

  return (
    <div>
      <h2>Add Role</h2>

      <form>
        <label>
          Role Name:
          <input
            type="text"
            name="roleName"
            value={newRole.roleName}
            onChange={handleInputChange}
          />
        </label>
        <Button type="button" onClick={handleCreation}>
          Create Role
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

const AddOccupation = ({ onClose, onUpdate }) => {
  const [newOccupation, setOccupation] = useState({
    occupationName: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [fieldName, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      setOccupation((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: {
          ...prevCustomer[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      setOccupation((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: value,
      }));
    }
  };

  const handleCreation = async () => {
    try {
      await axios.post(
        "http://localhost:8080/occupation/createOccupation",
        newOccupation
      );

      onUpdate(newOccupation);
      onClose();
      // Optionally, update your UI state instead of reloading the page
    } catch (error) {
      console.error("Error creating occupation: ", error);
    }
  };

  return (
    <div>
      <h2>Add Occupation</h2>

      <form>
        <label>
          Occupation Name:
          <input
            type="text"
            name="occupationName"
            value={newOccupation.occupationName}
            onChange={handleInputChange}
          />
        </label>
        <Button type="button" onClick={handleCreation}>
          Create Occupation
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

const AddLocation = ({ onClose, onUpdate }) => {
  const [newLocation, setLocation] = useState({
    city: "",
    district: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [fieldName, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      setLocation((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: {
          ...prevCustomer[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      setLocation((prevCustomer) => ({
        ...prevCustomer,
        [fieldName]: value,
      }));
    }
  };

  const handleCreation = async () => {
    try {
      await axios.post(
        "http://localhost:8080/location/createLocation",
        newLocation
      );

      onUpdate(newLocation);
      onClose();
      // Optionally, update your UI state instead of reloading the page
    } catch (error) {
      console.error("Error creating location: ", error);
    }
  };

  return (
    <div>
      <h2>Add Location</h2>

      <form>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={newLocation.city}
            onChange={handleInputChange}
          />
        </label>

        <label>
          District:
          <input
            type="text"
            name="district"
            value={newLocation.district}
            onChange={handleInputChange}
          />
        </label>
        <Button type="button" onClick={handleCreation}>
          Create Location
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

const AddService = ({ onClose, onUpdate }) => {
  const [newService, setService] = useState({
    serviceName: "",
    description: "",
    costPerMonth: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [fieldName, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      setService((prevService) => ({
        ...prevService,
        [fieldName]: {
          ...prevService[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      const newValue = fieldName === "costPerMonth" ? parseFloat(value) : value;

      setService((prevService) => ({
        ...prevService,
        [fieldName]: newValue,
      }));
    }
  };

  const handleCreation = async () => {
    try {
      delete newService.name;
      await axios.post(
        "http://localhost:8080/service/createService",
        newService
      );

      onUpdate(newService);
      onClose();
    } catch (error) {
      console.error("Error creating service: ", error);
    }
  };

  return (
    <div>
      <h2>Add Service</h2>

      <form>
        <label>
          Service name:
          <input
            type="text"
            name="serviceName"
            value={newService.serviceName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Service Description:
          <textarea
            name="description"
            value={newService.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Service cost per month:
          <input
            type="number"
            name="costPerMonth"
            value={newService.costPerMonth}
            onChange={handleInputChange}
          />
        </label>
        <Button type="button" onClick={handleCreation}>
          Create Service
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

const AddDevice = ({ onClose, onUpdate }) => {
  const [newDevice, setDevice] = useState({
    make: "",
    model: "",
    cost: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [fieldName, nestedFieldName] = name.split(".");

    if (nestedFieldName) {
      setDevice((prevService) => ({
        ...prevService,
        [fieldName]: {
          ...prevService[fieldName],
          [nestedFieldName]: value,
        },
      }));
    } else {
      const newValue = fieldName === "cost" ? parseFloat(value) : value;

      setDevice((prevService) => ({
        ...prevService,
        [fieldName]: newValue,
      }));
    }
  };

  const handleCreation = async () => {
    try {
      delete newDevice.name;
      await axios.post(
        "http://localhost:8080/service/createService",
        newDevice
      );

      onUpdate(newDevice);
      onClose();
    } catch (error) {
      console.error("Error creating device: ", error);
    }
  };

  return (
    <div>
      <h2>Add Device</h2>

      <form>
        <label>
          Device producer:
          <input
            type="text"
            name="make"
            value={newDevice.make}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Device model:
          <textarea
            name="model"
            value={newDevice.model}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Device cost:
          <input
            type="number"
            name="cost"
            value={newDevice.cost}
            onChange={handleInputChange}
          />
        </label>
        <Button type="button" onClick={handleCreation}>
          Create Device
        </Button>
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default AddData;
