import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Devices.css";

const DeviceList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1200px;
  margin: 20px auto;
`;

const DeviceCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  p {
    margin-top: 10px;
    font-weight: bold;
  }
`;

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
      <DeviceList>
        {devices.map((device) => (
          <DeviceCard
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
          </DeviceCard>
        ))}
      </DeviceList>
    </div>
  );
};

export default Devices;
