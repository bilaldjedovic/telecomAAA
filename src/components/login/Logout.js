import React from "react";

const Logout = () => {
  const handleLogout = () => {
    document.cookie = "role=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    document.cookie =
      "customerId=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
