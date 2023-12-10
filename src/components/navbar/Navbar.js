import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  // Add the new styles
  AppBar: {
    backgroundColor: "#2196f3",
  },
  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuLink: {
    color: "white",
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "16px",
  },
  menuLinkHover: {
    textDecoration: "underline",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar className={classes.Toolbar}>
          <Typography variant="h6" className={classes.title}>
            TELECOM
          </Typography>
          <Link to="/home" className={classes.menuLink}>
            Home
          </Link>
          <Link to="/customers" className={classes.menuLink}>
            Customers
          </Link>
          <Link to="/subscriptions" className={classes.menuLink}>
            Customers Subscription
          </Link>
          <Link to="/devices" className={classes.menuLink}>
            Devices
          </Link>
          <Link to="/plans" className={classes.menuLink}>
            Plans
          </Link>
          <Link to="/invoices" className={classes.menuLink}>
            Invoices
          </Link>
          <Link to="/createCustomers" className={classes.menuLink}>
            Create Customers
          </Link>

          <Link to="/addData" className={classes.menuLink}>
            Add Data
          </Link>
          <Link to="/feedback" className={classes.menuLink}>
            Rating
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
