import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './views/Sidebar';
import MembersPage from './views/Members';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/feedback" element={<div>Feedback Page</div>} />
            <Route path="/reporting" element={<div>Reporting Page</div>} />
            <Route path="/equipment" element={<div>Equipment Page</div>} />
            <Route path="/support" element={<div>Support Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;