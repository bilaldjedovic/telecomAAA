import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Devices.css";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/device/getAllDevices")
      .then((response) => {
        setDevices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Phone List</h2>
      <div className="device-list">
        {devices.map((device) => (
          <Link
            key={device.id}
            to={`/devices/${device.id}`}
            className="device-card-link"
          >
            <div className="device-card">
              <img
                src={
                  "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg"
                }
                alt={`${device.make} ${device.model}`}
              />
              <p>{`${device.make} ${device.model}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Devices;
