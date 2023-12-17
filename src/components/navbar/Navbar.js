import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, useLocation } from "react-router-dom";

import logoImage from "./bbHTelecom.png";
import Logout from "../login/Logout";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "#ffffff",
  },
  Toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuLink: {
    color: "#2196f3",
    textDecoration: "none",
    marginLeft: "15px",
    fontSize: "11px",
  },
  activeTab: {
    textDecoration: "underline",
  },
  logo: {
    width: 90,
    height: 90,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const paths = [
    "/",
    "/customers",
    "/subscriptions",
    "/devices",
    "/plans",
    "/invoices",
    "/addData",
    "/feedback",
    "/feedbacks",
    "/pollForm",
    "/pollAnswers",
    "/customerInvoices",
  ];

  const getCurrentTabIndex = () => {
    const currentPath = location.pathname;
    const index = paths.indexOf(currentPath);
    return index !== -1 ? index : 0;
  };

  return (
    <div>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar className={classes.Toolbar}>
          <img alt="logo" src={logoImage} className={classes.logo} />
          <Tabs
            value={getCurrentTabIndex()}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label="Home"
              component={Link}
              to="/"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 0 ? classes.activeTab : ""
              }`}
            />
            <Tab
              label="Customers"
              component={Link}
              to="/customers"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 1 ? classes.activeTab : ""
              }`}
            />
            <Tab
              label="Customers Subscription"
              component={Link}
              to="/subscriptions"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 2 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Devices"
              component={Link}
              to="/devices"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 3 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Plans"
              component={Link}
              to="/plans"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 4 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Invoices"
              component={Link}
              to="/invoices"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 5 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Add Data"
              component={Link}
              to="/addData"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 6 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Feedback"
              component={Link}
              to="/feedback"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 7 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Feedbacks"
              component={Link}
              to="/feedbacks"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 8 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Poll Form"
              component={Link}
              to="/pollForm"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 9 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Poll Answers"
              component={Link}
              to="/pollAnswers"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 10 ? classes.activeTab : ""
              }`}
            />

            <Tab
              label="Customer Invoices"
              component={Link}
              to="/customerInvoices"
              className={`${classes.menuLink} ${
                getCurrentTabIndex() === 10 ? classes.activeTab : ""
              }`}
            />

            <Logout />
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
