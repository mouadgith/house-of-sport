import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './views/Sidebar';
import MembersPage from './views/Members';
import ProfilePage from './views/Profile';
import CoachesPage from './views/Coaches';
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
            <Route path="/coaches" element={<CoachesPage />} />
            <Route path="/reporting" element={<div>Reporting Page</div>} />
            <Route path="/equipment" element={<div>Equipment Page</div>} />
            <Route path="/support" element={<div>Support Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;