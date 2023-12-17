import React, { useState } from "react";
import "./PollForm.css";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Adjust as needed */
`;

const PollFormContainer = styled.div`
  max-width: 600px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const QuestionStep = styled.div`
  font-size: 14px;
  color: #555;
`;

const QuestionText = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

const AnswerInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ThankYouMessage = styled.p`
  font-size: 18px;
  color: #4caf50;
  text-align: center;
`;

const PollForm = () => {
  const [customerId, setCustomerId] = useState("");
  const [questions, setQuestions] = useState([
    "How would you rate our network coverage?",
    "How satisfied are you with our customer service?",
    "What additional services would you like to see?",
    "Do you find our pricing plans reasonable?",
    "How likely are you to recommend our services to others?",
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleInputChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const submitAnswer = () => {
    fetch("http://localhost:8080/poll/createPoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: 2,
        question: questions[currentQuestionIndex],
        answer: currentAnswer,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Response for question ${currentQuestionIndex + 1}:`, data);

        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setCurrentAnswer("");
        } else {
          setShowThankYou(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <CenteredContainer>
      <PollFormContainer>
        {showThankYou ? (
          <ThankYouMessage>Thank you for answering our form!</ThankYouMessage>
        ) : (
          <>
            <QuestionContainer>
              <QuestionStep>
                {currentQuestionIndex + 1}/{questions.length}
              </QuestionStep>
              <QuestionText>{questions[currentQuestionIndex]}</QuestionText>
            </QuestionContainer>

            <AnswerInput
              type="text"
              value={currentAnswer}
              onChange={handleInputChange}
              placeholder="Your answer..."
            />
            <br />

            <SubmitButton onClick={submitAnswer}>
              {currentQuestionIndex < questions.length - 1
                ? "Next"
                : "Final Submit"}
            </SubmitButton>
          </>
        )}
      </PollFormContainer>
    </CenteredContainer>
  );
};

export default PollForm;
