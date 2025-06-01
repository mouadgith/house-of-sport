import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './views/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import PrivateRoute from './views/PrivateRoute';
import PageLoader from './components/Loader';
import { lazyWithDelay } from './utils/lazyWithDelay';
import DashboardPage from './views/Dashboard/DashboardPage';

const MembersPage = lazyWithDelay(() => import('./views/Members'));
const ProfilePage = lazyWithDelay(() => import('./views/Profile'));
const CoachesPage = lazyWithDelay(() => import('./views/Coaches'));
const CoachesGroups = lazyWithDelay(() => import('./views/CoachesGroups'));
const EquipmentPage = lazyWithDelay(() => import('./views/Equipment'));
const PaymentPage = lazyWithDelay(() => import('./views/Paiement'));
const Login = lazyWithDelay(() => import('./views/Login'));

function AppLayout() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="app-container">
      {isAuthenticated && <Sidebar />}
      <div className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="/members" element={<PrivateRoute><MembersPage /></PrivateRoute>} />
            <Route path="/coaches" element={<PrivateRoute><CoachesPage /></PrivateRoute>} />
            <Route path="/coaches-groups" element={<PrivateRoute><CoachesGroups /></PrivateRoute>} />
            <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
            <Route path="/equipment" element={<PrivateRoute><EquipmentPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;