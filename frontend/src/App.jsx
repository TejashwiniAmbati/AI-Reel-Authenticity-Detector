import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cyber-dark text-slate-100 font-sans selection:bg-cyber-blue selection:text-cyber-dark">
        {/* Animated background particles effect can be added here */}
        <div className="fixed inset-0 grid-background pointer-events-none opacity-20"></div>
        <div className="fixed inset-0 bg-gradient-to-br from-cyber-blue/5 via-transparent to-cyber-purple/5 pointer-events-none"></div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
