import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Modal from "react-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
} from "@mui/material";

const PollAnswers = () => {
  const [pollAnswers, setPollAnswers] = useState([]);
  const [answersData, setAnswersData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/poll/getAllPolls")
      .then((response) => response.json())
      .then((data) => {
        setPollAnswers(data);

        const answerCounts = data.reduce((acc, answer) => {
          const question = answer.question;
          acc[question] = (acc[question] || 0) + 1;
          return acc;
        }, {});

        const answerArray = Object.values(answerCounts);
        setAnswersData(answerArray);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const questions = [
    "How would you rate our network coverage?",
    "How satisfied are you with our customer service?",
    "What additional services would you like to see?",
    "Do you find our pricing plans reasonable?",
    "How likely are you to recommend our services to others?",
  ];

  const chartOptions = {
    labels: questions,
    chart: {
      height: 200,
      toolbar: {
        show: false,
      },
    },
  };

  const chartSeries = answersData;

  const openModal = (answer) => {
    setSelectedAnswer(answer);
  };

  const closeModal = () => {
    setSelectedAnswer(null);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
    setPage(0);
  };

  const filteredAnswers = pollAnswers.filter(
    (answer) =>
      answer.question.toLowerCase().includes(filter) ||
      answer.answer.toLowerCase().includes(filter)
  );

  return (
    <div>
      <h2>Poll Answers</h2>

      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="50%"
      />

      <TextField
        label="Filter by Question or Answer"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: 16 }}
      />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAnswers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((answer) => (
                <TableRow key={answer.id} onClick={() => openModal(answer)}>
                  <TableCell>{answer.customerId}</TableCell>
                  <TableCell>{answer.question}</TableCell>
                  <TableCell>{answer.answer}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredAnswers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 15, 25]}
      />

      <Modal
        isOpen={selectedAnswer !== null}
        onRequestClose={closeModal}
        contentLabel="Answer Modal"
      >
        <h2>Question and Answer</h2>
        {selectedAnswer && (
          <div>
            <p>
              <strong>Question:</strong> {selectedAnswer.question}
            </p>
            <p>
              <strong>Answer:</strong> {selectedAnswer.answer}
            </p>
          </div>
        )}
        <Button variant="contained" onClick={closeModal}>
          Close
        </Button>
      </Modal>
    </div>
  );
};

export default PollAnswers;
