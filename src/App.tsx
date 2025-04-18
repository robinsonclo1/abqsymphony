import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Homepage';
import CreateEventPage from './pages/CreateEventPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/previous" element={<div>Previous Events</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/create" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
