import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Plans.css";

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
      <h2>Plan List</h2>
      <div className="plan-list">
        {plans.map((plan) => (
          <Link
            key={plan.id}
            to={`/plans/${plan.id}`}
            className="plan-card-link"
          >
            <div className="plan-card">
              <p>{`${plan.name}`}</p>
              <p>{`Cost per month: ${plan.costPerMonth}`}</p>
              <p>{`Minimum contract length: ${plan.minimumContractLength}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Plan;
