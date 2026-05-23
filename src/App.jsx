import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import TopupPage from './pages/TopupPage';
import TransactionPage from './pages/TransactionPage';
import ProfilePage from './pages/ProfilePage';
import PaymentPage from './pages/PaymentPage';
import { setNavigate } from './utils/NavigationService';

const App = () => {

  // define global navigate for js files and interceptor
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />

      {/* Dashboard Route */}
      <Route element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        <Route path="/home" element={<HomePage />} />
        <Route path="/top-up" element={<TopupPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/payment/:serviceCode" element={<PaymentPage />} />
      </Route>

      {/* Profile Route */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
