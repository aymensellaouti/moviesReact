import React, { useEffect } from "react";
import { logout } from "../services/authService";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location = "/";
  });
  return <div></div>;
};

export default Logout;
