import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, useLocation } from "react-router-dom";

import logoImage from "./bbHTelecom.png";
import Logout from "../login/Logout";
import { useAuth } from "../login/AuthContext";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "#ffffff",
  },
  Toolbar: {
    display: "flex",
    justifyContent: "center",
  },
  menuLink: {
    color: "#2196f3",
    textDecoration: "none",
    marginLeft: "15px",
    fontSize: "11px",
    "&.Mui-selected": {
      textDecoration: "underline",
    },
  },
  logo: {
    width: 90,
    height: 90,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const { authenticated, role } = useAuth();

  return (
    <div>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar className={classes.Toolbar}>
          <img alt="logo" src={logoImage} className={classes.logo} />
          <Tabs indicatorColor="primary" textColor="primary">
            {authenticated && (role === 2 || role === 1) && (
              <Tab
                label="Home"
                component={Link}
                to="/"
                className={`${classes.menuLink} ${
                  location.pathname === "/" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 1 && (
              <Tab
                label="Customers"
                component={Link}
                to="/customers"
                className={`${classes.menuLink} ${
                  location.pathname === "/customers" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 2 && (
              <Tab
                label="Subscription"
                component={Link}
                to="/subscription"
                className={`${classes.menuLink} ${
                  location.pathname === "/subscription" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 1 && (
              <Tab
                label="Customers Subscription"
                component={Link}
                to="/subscriptions"
                className={`${classes.menuLink} ${
                  location.pathname === "/subscriptions"
                    ? classes.activeTab
                    : ""
                }`}
              />
            )}
            {authenticated && (role === 2 || role === 1) && (
              <Tab
                label="Devices"
                component={Link}
                to="/devices"
                className={`${classes.menuLink} ${
                  location.pathname === "/devices" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && (role === 2 || role === 1) && (
              <Tab
                label="Plans"
                component={Link}
                to="/plans"
                className={`${classes.menuLink} ${
                  location.pathname === "/plans" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 1 && (
              <Tab
                label="Invoices"
                component={Link}
                to="/invoices"
                className={`${classes.menuLink} ${
                  location.pathname === "/invoices" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 1 && (
              <Tab
                label="Add Data"
                component={Link}
                to="/addData"
                className={`${classes.menuLink} ${
                  location.pathname === "/addData" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 2 && (
              <Tab
                label="Feedback"
                component={Link}
                to="/feedback"
                className={`${classes.menuLink} ${
                  location.pathname === "/feedback" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 1 && (
              <Tab
                label="Feedbacks"
                component={Link}
                to="/feedbacks"
                className={`${classes.menuLink} ${
                  location.pathname === "/feedbacks" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 2 && (
              <Tab
                label="Poll Form"
                component={Link}
                to="/pollForm"
                className={`${classes.menuLink} ${
                  location.pathname === "/pollForm" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 1 && (
              <Tab
                label="Poll Answers"
                component={Link}
                to="/pollAnswers"
                className={`${classes.menuLink} ${
                  location.pathname === "/pollAnswers" ? classes.activeTab : ""
                }`}
              />
            )}
            {authenticated && role === 2 && (
              <Tab
                label="Customer Invoices"
                component={Link}
                to="/customerInvoices"
                className={`${classes.menuLink} ${
                  location.pathname === "/customerInvoices"
                    ? classes.activeTab
                    : ""
                }`}
              />
            )}
            {authenticated && <Logout />}
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
