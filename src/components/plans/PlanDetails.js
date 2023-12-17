import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";

const PlanDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const PlanImage = styled.div`
  margin-top: 20px;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const PlanText = styled.div`
  margin-top: 20px;
  text-align: left;

  .plan-details-heading {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .plan-info {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .plan-description {
    margin-top: 20px;
    font-size: 16px;
  }
`;

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
    <PlanDetailsContainer>
      <Link to={"/plans"}>
        <Button>Back</Button>
      </Link>
      <PlanImage>
        <img
          src={"https://w3f.uk/wp-content/uploads/2020/05/planBasic.png"}
          alt={`planStandard`}
        />
      </PlanImage>
      <PlanText>
        <h2 className="plan-details-heading">Plan Details</h2>
        <p className="plan-info">{`Plan name: ${plan.name}`}</p>
        <p className="plan-info">{`Contract Length: ${plan.minimumContractLength} months`}</p>
        <p className="plan-info">{`Cost Per Month: $${plan.costPerMonth}`}</p>
        <div className="plan-description">
          <p>
            <strong>Description:</strong>
          </p>
          <pre>
            {`Key Features:

Voice Calls: Provides a set number of minutes for making voice calls to other mobile numbers or landlines.
Text Messaging: Includes a certain allotment of text messages (SMS) that can be sent to other mobile users.
Data Allowance: Offers a basic data allowance for internet usage, which can be used for activities like browsing, social media, and email.
Network Coverage: Provides coverage on a specific mobile network, ensuring connectivity in designated areas.
Contract Length: Typically comes with a minimum contract length, which may range from one month to a couple of years.

Cost:

The Basic Plan is designed to be cost-effective, offering essential services at a lower monthly or prepaid cost.

Additional Notes:

The Basic Plan is suitable for users who prioritize essential communication services and have moderate data needs.
Users on the Basic Plan may not have access to premium features offered by higher-tier plans, such as unlimited data or additional perks.

It's important to note that the specific details of a "Basic Plan" can vary between mobile service providers. 
Users are encouraged to review the terms and conditions of the plan offered by their chosen provider to understand the exact features, limitations, 
and costs associated with the Basic Plan.`}
          </pre>
        </div>
      </PlanText>
    </PlanDetailsContainer>
  );
};

export default PlanDetails;
