import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
import Devices from "./components/devices/Devices";
import DeviceDetails from "./components/devices/DeviceDetails";
import Plan from "./components/plans/Plan";
import PlanDetails from "./components/plans/PlanDetails";
import Home from "./components/home/Home";
import CustomerTable from "./components/customers/CustomerTable";
import CustomerDetails from "./components/customers/CustomerDetails";
import CreateCustomer from "./components/customers/CreateCustomer";
import CustomerSubscriptionDetails from "./components/customerSubscription/CustomerSubscriptionDetails";
import { useAuth } from "./components/login/AuthContext";
import CustomersSubscriptionTable from "./components/customerSubscription/CustomerSubscriptionTable";
import AddData from "./components/addData/AddData";
import FeedbacksTable from "./components/feedbacks/Feedback";
import PollForm from "./components/polls/PollForm";
import PollAnswers from "./components/polls/PollAnswers";
import InvoiceCustomerTable from "./components/invoice/InvoiceTableCustomer";
import InvoiceTable from "./components/invoice/InvoiceTable";
import InvoiceDetails from "./components/invoice/InvoiceDetails";
import Navbar from "./components/navbar/Navbar";
import Rating from "./components/rating/Rating";
import CustomerSubscription from "./components/customerSubscription/CustomerSubscription";
import User from "./components/user/User";

const App = () => {
  const { authenticated, role } = useAuth();

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/plans"
            element={
              authenticated && (role === 2 || role === 1) ? (
                <Plan />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/feedback"
            element={
              authenticated && role === 2 ? (
                <Rating />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/subscription"
            element={
              authenticated && role === 2 ? (
                <CustomerSubscription />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/plans/:planId"
            element={
              authenticated && (role === 2 || role === 1) ? (
                <PlanDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/"
            element={
              authenticated && (role === 2 || role === 1) ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/invoices"
            element={
              authenticated && role === 1 ? (
                <InvoiceTable />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/invoice/details"
            element={
              authenticated && (role === 2 || role === 1) ? (
                <InvoiceDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/addData"
            element={
              authenticated && role === 1 ? (
                <AddData />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/feedbacks"
            element={
              authenticated && role === 1 ? (
                <FeedbacksTable />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/pollForm"
            element={
              authenticated && role === 2 ? (
                <PollForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/pollAnswers"
            element={
              authenticated && role === 1 ? (
                <PollAnswers />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/customerInvoices"
            element={
              authenticated && role === 2 ? (
                <InvoiceCustomerTable />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/customers"
            element={
              authenticated && role === 1 ? (
                <CustomerTable />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/createCustomers"
            element={
              authenticated && role === 1 ? (
                <CreateCustomer />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/customer/edit"
            element={
              authenticated && role === 1 ? (
                <CustomerDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/subscriptions"
            element={
              authenticated && role === 1 ? (
                <CustomersSubscriptionTable />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/subscriptions/details"
            element={
              authenticated && role === 1 ? (
                <CustomerSubscriptionDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/devices"
            element={
              authenticated && (role === 2 || role === 1) ? (
                <Devices />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/devices/:deviceId"
            element={
              authenticated && (role === 2 || role === 1) ? (
                <DeviceDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/myProfile"
            element={
              authenticated && role === 2 ? <User /> : <Navigate to="/login" />
            }
          />

          <Route path="/logout" element={<Logout />} />
          <Route
            path="*"
            element={
              authenticated ? (
                role === 1 ? (
                  <Navigate to="/adminPage" />
                ) : (
                  <Navigate to="/userPage" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
