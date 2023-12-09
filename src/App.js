// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import CustomersTable from "./components/customers/CustomerTable";
import CustomerDetails from "./components/customers/CustomerDetails";
import CustomersSubscriptionTable from "./components/customerSubscription/CustomerSubscriptionTable";
import CustomerSubscriptionDetails from "./components/customerSubscription/CustomerSubscriptionDetails";
import Devices from "./components/devices/Devices";
import DeviceDetails from "./components/devices/DeviceDetails";
import Plan from "./components/plans/Plan";
import PlanDetails from "./components/plans/PlanDetails";
import InvoiceTable from "./components/invoice/InvoiceTable";
import InvoiceDetails from "./components/invoice/CustomerSubscriptionDetails";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/customers" element={<CustomersTable />} />
          <Route path="/customer/edit" element={<CustomerDetails />} />
          <Route
            path="/subscriptions"
            element={<CustomersSubscriptionTable />}
          />

          <Route
            path="/subscriptions/details"
            element={<CustomerSubscriptionDetails />}
          />

          <Route path="/devices" element={<Devices />} />
          <Route path="/devices/:deviceId" element={<DeviceDetails />} />
          <Route path="/plans" element={<Plan />} />
          <Route path="/plans/:planId" element={<PlanDetails />} />
          <Route path="/invoices" element={<InvoiceTable />} />
          <Route path="/invoices/details" element={<InvoiceDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
