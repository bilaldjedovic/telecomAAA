// DeviceDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PlanDetails.css";

const PlanDetails = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { planId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/plan/getPlanById/${planId}`)
      .then((response) => {
        setPlan(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [planId]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="device-details-container">
      <div className="device-image">
        <img
          src={"https://w3f.uk/wp-content/uploads/2020/05/planBasic.png"}
          alt={`planStandard`}
        />
      </div>
      <div className="device-text">
        <h2 className="device-details-heading">Plan Details Details</h2>
        <p>{`Plan name: ${plan.name}`}</p>
        <p>{`Model: ${plan.costPerMonth}`}</p>
        <p>{`Cost: $${plan.minimumContractLength}`}</p>
        <p>
          <pre>
            {`Description: 
    Key Features:

    Voice Calls: Provides a set number of minutes for making voice calls to other mobile numbers or landlines.
    Text Messaging: Includes a certain allotment of text messages (SMS) that can be sent to other mobile users.
    Data Allowance: Offers a basic data allowance for internet usage, 
    which can be used for activities like browsing, social media, and email.
    Network Coverage: Provides coverage on a specific mobile network, ensuring connectivity in designated areas.
    Contract Length: Typically comes with a minimum contract length, which may range from one month to a couple of years.

    Cost:

    The Basic Plan is designed to be cost-effective, offering essential services at a lower monthly or prepaid cost.

    Additional Notes:

    The Basic Plan is suitable for users who prioritize essential communication services and have moderate data needs.
    Users on the Basic Plan may not have access to premium features offered by higher-tier plans, such as unlimited data or additional perks.

    It's important to note that the specific details of a "Basic Plan" can vary between mobile service providers. Users are encouraged to review the terms 
    and conditions of the plan offered by their chosen provider to understand the exact features, limitations, 
    and costs associated with the Basic Plan.`}
          </pre>
        </p>
      </div>
    </div>
  );
};

export default PlanDetails;
