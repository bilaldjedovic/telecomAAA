import React, { useState, useEffect } from "react";
import "./Rating.css";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState({
    customerId: 1,
    feedbackDate: new Date().toISOString().split("T")[0], // Set default date to today
    rating: 0,
    feedbackText: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRatingChange = (e) => {
    let newRating = parseInt(e.target.value);

    setReview((prevReview) => ({
      ...prevReview,
      rating: newRating,
    }));
  };

  const handleMessageChange = (e) => {
    let message = e.target.value;

    setReview((prevReview) => ({
      ...prevReview,
      feedbackText: message,
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
          setRating(0);
          setReview({
            ...review,
            rating: 0,
            feedbackText: "",
          });

          setMessage("");
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
    <>
      <div className="feedback-container">
        <div className="feedback-box">
          <h1>Customer Feedback</h1>
          {isSuccess && (
            <p className="success-message">Feedback sent successfully!</p>
          )}
          <div>
            <label>Rate our service:</label>
            <select value={review.rating} onChange={handleRatingChange}>
              <option value="0">Select rating</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
          </div>
          <div>
            <label>Leave a short message:</label>
            <textarea
              value={review.feedbackText}
              onChange={handleMessageChange}
              placeholder="Your feedback..."
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            disabled={review.feedbackText === "" || review.rating === 0}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </>
  );
};

export default Rating;
