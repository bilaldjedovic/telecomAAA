import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Rating.css";

const Rating = () => {
  const [review, setReview] = useState({
    customerId: 1,
    feedbackDate: new Date().toISOString().split("T")[0],
    rating: 0,
    feedbackText: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRatingChange = (e) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: parseInt(e.target.value),
    }));
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
          console.log("Feedback submitted successfully!");

          // Clear rating and feedback text
          setReview({
            ...review,
            rating: 0,
            feedbackText: "",
          });

          setIsSuccess(true);

          // Reset success message after a delay
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
    <div className="feedback-container">
      <div className="feedback-box">
        <h1>Customer Feedback</h1>
        {isSuccess && (
          <Alert variant="success">Feedback sent successfully!</Alert>
        )}
        <Form>
          <Form.Group controlId="ratingSelect">
            <Form.Label>Rate our service:</Form.Label>
            <Form.Control
              as="select"
              value={review.rating}
              onChange={handleRatingChange}
            >
              <option value="0">Select rating</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="feedbackTextarea">
            <Form.Label>Leave a short message:</Form.Label>
            <Form.Control
              as="textarea"
              value={review.feedbackText}
              onChange={handleMessageChange}
              placeholder="Your feedback..."
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={review.feedbackText === "" || review.rating === 0}
          >
            Submit Feedback
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Rating;
