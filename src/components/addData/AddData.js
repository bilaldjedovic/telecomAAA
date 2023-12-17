import React, { useState } from "react";
import { Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import "./AddData.css";
import "./AddRoleComponent.css";

const AddData = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="add-data-container">
      <Typography variant="h4" gutterBottom>
        ADD DATA
      </Typography>

      <div className="button-container">
        {!activeModal && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal("role")}
          >
            Add Role
          </Button>
        )}
        {activeModal === "role" && <AddRoleComponent onClose={closeModal} />}

        {!activeModal && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal("occupation")}
          >
            Add Occupation
          </Button>
        )}
        {activeModal === "occupation" && (
          <AddOccupationComponent onClose={closeModal} />
        )}

        {!activeModal && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal("location")}
          >
            Add Location
          </Button>
        )}
        {activeModal === "location" && (
          <AddLocationComponent onClose={closeModal} />
        )}

        {!activeModal && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal("service")}
          >
            Add Service
          </Button>
        )}
        {activeModal === "service" && (
          <AddServiceComponent onClose={closeModal} />
        )}

        {!activeModal && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal("device")}
          >
            Add Device
          </Button>
        )}
        {activeModal === "device" && (
          <AddDeviceComponent onClose={closeModal} />
        )}

        {!activeModal && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal("plan")}
          >
            Add Plan
          </Button>
        )}
        {activeModal === "plan" && <AddPlanComponent onClose={closeModal} />}
      </div>
    </div>
  );
};

const AddRoleComponent = ({ onClose }) => {
  const [newRole, setNewRole] = useState({
    roleName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
  };

  const handleCreation = async () => {
    try {
      await axios.post("http://localhost:8080/role/createRole", newRole);
      onClose();
    } catch (error) {
      console.error("Error creating role: ", error);
    }
  };
  return (
    <div className="modal-container">
      <Typography variant="h6" gutterBottom>
        Add Role
      </Typography>

      <form className="form-container">
        <TextField
          label="Role Name"
          variant="outlined"
          name="roleName"
          value={newRole.roleName}
          onChange={handleInputChange}
        />

        <div className="form-buttons">
          <Button variant="contained" color="primary" onClick={handleCreation}>
            Create Role
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

const AddOccupationComponent = ({ onClose, onUpdate }) => {
  const [newOccupation, setOccupation] = useState({
    occupationName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOccupation((prevOccupation) => ({ ...prevOccupation, [name]: value }));
  };

  const handleCreation = async () => {
    try {
      await axios.post(
        "http://localhost:8080/occupation/createOccupation",
        newOccupation
      );

      onClose();
    } catch (error) {
      console.error("Error creating occupation: ", error);
    }
  };

  return (
    <div className="modal-container">
      <Typography variant="h6" gutterBottom>
        Add Occupation
      </Typography>

      <form>
        <TextField
          label="Occupation Name"
          variant="outlined"
          name="occupationName"
          value={newOccupation.occupationName}
          onChange={handleInputChange}
        />

        <Button variant="contained" color="primary" onClick={handleCreation}>
          Create Occupation
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

const AddLocationComponent = ({ onClose, onUpdate }) => {
  const [newLocation, setLocation] = useState({
    city: "",
    district: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({ ...prevLocation, [name]: value }));
  };

  const handleCreation = async () => {
    try {
      await axios.post(
        "http://localhost:8080/location/createLocation",
        newLocation
      );

      onClose();
    } catch (error) {
      console.error("Error creating location: ", error);
    }
  };

  return (
    <div className="modal-container">
      <Typography variant="h6" gutterBottom>
        Add Location
      </Typography>

      <form>
        <TextField
          label="City"
          variant="outlined"
          name="city"
          value={newLocation.city}
          onChange={handleInputChange}
        />

        <TextField
          label="District"
          variant="outlined"
          name="district"
          value={newLocation.district}
          onChange={handleInputChange}
        />

        <Button variant="contained" color="primary" onClick={handleCreation}>
          Create Location
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

const AddServiceComponent = ({ onClose }) => {
  const [newService, setService] = useState({
    serviceName: "",
    description: "",
    costPerMonth: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({ ...prevService, [name]: value }));
  };

  const handleCreation = async () => {
    try {
      delete newService.name;

      const serviceToSent = {
        serviceName: newService.serviceName,
        description: newService.description,
        costPerMonth: parseInt(newService.costPerMonth),
      };
      await axios.post(
        "http://localhost:8080/service/createService",
        serviceToSent
      );

      onClose();
    } catch (error) {
      console.error("Error creating service: ", error);
    }
  };

  return (
    <div className="modal-container">
      <Typography variant="h6" gutterBottom>
        Add Service
      </Typography>

      <form>
        <TextField
          label="Service Name"
          variant="outlined"
          name="serviceName"
          value={newService.serviceName}
          onChange={handleInputChange}
        />

        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={newService.description}
          onChange={handleInputChange}
        />

        <TextField
          label="Cost Per Month"
          variant="outlined"
          name="costPerMonth"
          type="number"
          value={newService.costPerMonth}
          onChange={handleInputChange}
        />

        <Button variant="contained" color="primary" onClick={handleCreation}>
          Create Service
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

const AddDeviceComponent = ({ onClose, onUpdate }) => {
  const [newDevice, setDevice] = useState({
    make: "",
    model: "",
    cost: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDevice((prevDevice) => ({ ...prevDevice, [name]: value }));
  };

  const handleCreation = async () => {
    try {
      delete newDevice.name;

      const deviceToSent = {
        make: newDevice.make,
        model: newDevice.model,
        cost: parseFloat(newDevice.cost),
      };
      await axios.post(
        "http://localhost:8080/device/createDevice",
        deviceToSent
      );

      onClose();
    } catch (error) {
      console.error("Error creating device: ", error);
    }
  };

  return (
    <div className="modal-container">
      <Typography variant="h6" gutterBottom>
        Add Device
      </Typography>

      <form>
        <TextField
          label="Make"
          variant="outlined"
          name="make"
          value={newDevice.make}
          onChange={handleInputChange}
        />

        <TextField
          label="Model"
          variant="outlined"
          name="model"
          value={newDevice.model}
          onChange={handleInputChange}
        />

        <TextField
          label="Cost"
          variant="outlined"
          name="cost"
          type="number"
          value={newDevice.cost}
          onChange={handleInputChange}
        />

        <Button variant="contained" color="primary" onClick={handleCreation}>
          Create Device
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

const AddPlanComponent = ({ onClose }) => {
  const [newPlan, setPlan] = useState({
    name: "",
    costPerMonth: "",
    minimumContractLength: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlan((prevPlan) => ({ ...prevPlan, [name]: value }));
  };

  const handleCreation = async () => {
    try {
      const planToSent = {
        name: newPlan.name,
        costPerMonth: parseInt(newPlan.costPerMonth),
        minimumContractLength: parseInt(newPlan.minimumContractLength),
      };
      await axios.post("http://localhost:8080/plan/createPlan", planToSent);

      onClose();
    } catch (error) {
      console.error("Error creating plan: ", error);
    }
  };

  return (
    <div className="modal-container">
      <Typography variant="h6" gutterBottom>
        Add Plan
      </Typography>

      <form>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={newPlan.name}
          onChange={handleInputChange}
        />

        <TextField
          label="Cost Per Month"
          variant="outlined"
          name="costPerMonth"
          type="number"
          value={newPlan.costPerMonth}
          onChange={handleInputChange}
        />

        <TextField
          label="Minimum Contract Length(in months)"
          variant="outlined"
          name="minimumContractLength"
          type="number"
          value={newPlan.minimumContractLength}
          onChange={handleInputChange}
        />

        <Button variant="contained" color="primary" onClick={handleCreation}>
          Create Plan
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default AddData;
