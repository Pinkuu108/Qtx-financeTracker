import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DashboardHome from './pages/DashboardHome';
import AddTransaction from './pages/AddTransaction';
import AllTransactions from './pages/AllTransactions';
import BudgetDashboard from './pages/user/BudgetDashboard';
import BudgetSetup from './pages/user/BudgetSetup';
import InactivePage from './pages/InactivePage';
import AdminPage from './pages/AdminPage';
import UserTable from './components/admin/UserTable';
import CategoryManager from './components/admin/CategoryManager';
import ActivationRequests from './components/admin/ActivationRequests';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<DashboardHome />} />
            <Route path="add" element={<AddTransaction />} />
            <Route path="transactions" element={<AllTransactions />} />
            <Route path="budget" element={<BudgetDashboard />} />
            <Route path="budget-setup" element={<BudgetSetup />} />
          </Route>
          <Route
            path="/inactive"
            element={
              <PrivateRoute>
                <InactivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          >
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<UserTable />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="requests" element={<ActivationRequests />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
