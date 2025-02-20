import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from './components/DashboardLayout';
import DynamicDashboard from './components/DynamicDashboard';

const App = () => {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/users" element={<DynamicDashboard />} />
          <Route path="/products" element={<DynamicDashboard />} />
          <Route path="/categories" element={<DynamicDashboard />} />
          <Route path="/settings" element={<DynamicDashboard />} />
          <Route path="/" element={<Navigate to="/users" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;