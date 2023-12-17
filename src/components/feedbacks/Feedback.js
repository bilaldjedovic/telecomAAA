import React, { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { FaStar } from "react-icons/fa";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import "./Feedbacks.css";

const StarRating = ({ rating }) => {
  const stars = Array(5).fill(0);

  return (
    <div>
      {stars.map((_, index) => (
        <FaStar
          key={index}
          size={24}
          color={index < rating ? "#FFBA5A" : "#a9a9a9"}
        />
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 10,
  },
  filterInput: {
    marginBottom: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    marginRight: 10,
  },
  tableContainer: {
    marginTop: 20,
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  tableCell: {
    border: `1px solid ${theme.palette.grey[400]}`,
    textAlign: "left",
    padding: 12,
  },
  actionsCell: {
    display: "flex",
    gap: 8,
  },
  editButton: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },

  sortIcon: {
    fontSize: 18,
  },
}));

const FeedbacksTable = () => {
  const classes = useStyles();
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackData = await axios.get(
          `http://localhost:8080/feedback/getAllFeedbacks`
        );
        setFeedback(feedbackData.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortByRating = (a, b) => {
    if (sortOrder === "asc") {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  };

  const sortedFeedback = [...feedback].sort(sortByRating);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={classes.container}>
      <h2>Feedback List</h2>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Feedback text</TableCell>
              <TableCell>
                Rating{" "}
                <IconButton onClick={toggleSortOrder}>
                  {sortOrder === "asc" ? (
                    <ArrowUpwardIcon className={classes.sortIcon} />
                  ) : (
                    <ArrowDownwardIcon className={classes.sortIcon} />
                  )}
                </IconButton>
              </TableCell>
              <TableCell>Feedback date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedFeedback.map((feedbackItem, index) => (
              <TableRow
                key={feedbackItem.id}
                className={index % 2 === 0 ? classes.evenRow : classes.oddRow}
              >
                <TableCell className={classes.tableCell}>
                  {feedbackItem.id}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {feedbackItem.firstName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {feedbackItem.lastName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {feedbackItem.feedbackText}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <StarRating rating={feedbackItem.rating} />
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {feedbackItem.feedbackDate
                    ? new Date(feedbackItem.feedbackDate).toLocaleDateString(
                        "en-GB"
                      )
                    : "N/A"}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FeedbacksTable;
