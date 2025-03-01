import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import WardenDashboard from './pages/WardenDashboard';
import WardenLoginPage from './pages/WardenLoginPage';
import WardenRegisterPage from './pages/WardenRegisterPage';

// Helper function to check if the user is authenticated
const useAuth = () => {
  // This should be updated based on your authentication logic
  const token = localStorage.getItem('token');
  return Boolean(token); // Returns true if token exists, false otherwise
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/warden-login" element={<WardenLoginPage />} />
          <Route path="/warden-register" element={<WardenRegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-dashboard" element={<ProtectedRoute element={<StudentDashboard />} />} />
          <Route path="/warden-dashboard" element={<ProtectedRoute element={<WardenDashboard />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

