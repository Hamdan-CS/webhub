import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { PaymentPage } from './pages/PaymentPage';
import CareersPage from './pages/CareersPage';
import { ServiceSelectionPage } from './pages/ServiceSelectionPage';
import { ProjectFormPage } from './pages/ProjectFormPage';
import { PlanSelectionPage } from './pages/PlanSelectionPage';

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen transition-colors duration-400">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/service-selection" element={<ServiceSelectionPage />} />
          <Route path="/project-form" element={<ProjectFormPage />} />
          <Route path="/plan-selection" element={<PlanSelectionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
