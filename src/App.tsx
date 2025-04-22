import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import CreateEventPage from './pages/CreateEventPage';
import AdminDashboard from './pages/AdminDashboard';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/previous" element={<div>Previous Events</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/create" element={<CreateEventPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events/:id" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
