import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { AppState } from "../types";
import AdminDashboard from "../components/Dashboards/AdminDashboard";
import UserDashboard from "../components/Dashboards/UserDashboard";

function Dashboard() {
  const auth = useSelector((state: AppState) => state.auth);

  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <>{auth.user.admin ? <AdminDashboard /> : <UserDashboard />}</>;
}

export default Dashboard;
