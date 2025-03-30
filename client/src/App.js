
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={ <Auth />} />
        <Route path="/" element={ <Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
