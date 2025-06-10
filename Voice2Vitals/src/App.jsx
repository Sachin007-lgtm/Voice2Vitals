import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import ClinicalDocsLanding from './pages/landing'
import Auth from './pages/auth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClinicalDocsLanding />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App
