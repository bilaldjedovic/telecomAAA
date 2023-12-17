import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Plans.css";

import { useAuth } from "../login/AuthContext";
import { useNavigate } from "react-router-dom";

const PlanList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1200px;
  margin: 20px auto;
`;

const PlanCard = styled(Link)`
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

  p {
    margin-top: 10px;
    font-weight: bold;
  }
`;

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/plan/getAllPlans")
      .then((response) => {
        setPlans(response.data);
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
      <h2
        style={{ textAlign: "center", fontSize: "28px", marginBottom: "20px" }}
      >
        Explore Our Plans
      </h2>{" "}
      <PlanList>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            to={`/plans/${plan.id}`}
            className="plan-card-link"
          >
            <div className="plan-card">
              <p>{`${plan.name}`}</p>
              <p>{`Cost per month: ${plan.costPerMonth}`}</p>
              <p>{`Minimum contract length: ${plan.minimumContractLength}`}</p>
            </div>
          </PlanCard>
        ))}
      </PlanList>
    </div>
  );
};

export default Plan;
