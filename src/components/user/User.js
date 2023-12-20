import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../login/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#FF4081",
    },
  },
});

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { userId } = useAuth();
  const [customerInfo, setCustomerInfo] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getUserById/${userId}`
        );
        setUser(response.data);
        setEditedUser({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
        });

        if (response.data.customerId) {
          const customerInfos = await axios.get(
            `http://localhost:8080/customer/getCustomerById/${response.data.customerId}`
          );
          console.log("Customer Response data:", customerInfos.data);
          setCustomerInfo(customerInfos.data);
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    fetchUserDetails();
  }, [userId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setShowPassword(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/user/updateUser/${user.id}`,
        editedUser
      );

      setUser((prevUser) => ({ ...prevUser, ...editedUser }));

      handleModalClose();
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>
        <Card elevation={3} style={{ padding: 20 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  <strong>First name:</strong> {customerInfo.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Last name:</strong> {customerInfo.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Address:</strong> {customerInfo.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Username:</strong> {user.username}
                </Typography>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Password:</strong>{" "}
                    {showPassword ? editedUser.password : "*********"}
                  </Typography>
                </Grid>
                <Grid item style={{ textAlign: "right" }}>
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModalOpen}
                  style={{ marginTop: 20 }}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Card style={{ padding: 20, maxWidth: 300, margin: "auto" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Edit Profile
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              label="Username"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
            />
            <FormControl variant="outlined" fullWidth style={{ marginTop: 10 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={editedUser.password}
                name="password"
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              style={{ marginTop: 10 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              style={{ marginTop: 20 }}
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </ThemeProvider>
  );
};

export default UserProfile;
