import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  logoutButton: {
    color: "#2196f3",
    textDecoration: "none",
    marginLeft: "15px",
    fontSize: "11px",
    "&.Mui-selected": {
      textDecoration: "underline",
    },
  },
}));

const Logout = () => {
  const classes = useStyles();

  const handleLogout = () => {
    document.cookie = "role=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    document.cookie =
      "customerId=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    document.cookie = "userId=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    window.location.href = "/login";
  };

  return (
    <Button
      variant="text"
      className={classes.logoutButton}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
