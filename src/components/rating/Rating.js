import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import "./Rating.css";
import { useAuth } from "../login/AuthContext";

import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Rating = () => {
  const {  customerId } = useAuth();

  const [review, setReview] = useState({
    customerId: customerId,
    feedbackDate: new Date().toISOString().split("T")[0],
    rating: 0,
    feedbackText: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
    setReview((prevReview) => ({
      ...prevReview,
      rating: value,
    }));
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 20,
    },
    star: {
      fontSize: 24,
      marginRight: 10,
      cursor: "pointer",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
  };

  const handleMessageChange = (e) => {
    setReview((prevReview) => ({
      ...prevReview,
      feedbackText: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log(review);

    fetch("http://localhost:8080/feedback/createFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((response) => {
        if (response.ok) {
          setReview({
            ...review,
            rating: 0,
            feedbackText: "",
          });

          setIsSuccess(true);

          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
        } else {
          console.error("Failed to submit feedback");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: 20 }}>
        <h1>Customer Feedback</h1>
        {isSuccess && (
          <Alert variant="success">Feedback sent successfully!</Alert>
        )}
      </div>

      <div style={styles.stars}>
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={
              (hoverValue || currentValue) > index ? colors.orange : colors.grey
            }
            style={styles.star}
          />
        ))}
      </div>

      <textarea
        value={review.feedbackText}
        onChange={handleMessageChange}
        placeholder="Your feedback..."
        style={styles.textarea}
      />

      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={review.feedbackText === "" || review.rating === 0}
        style={styles.button}
      >
        Submit Feedback
      </Button>
    </div>
  );
};

export default Rating;
