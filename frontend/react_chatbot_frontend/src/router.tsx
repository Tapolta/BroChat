import { createBrowserRouter } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboardv1 from './pages/admin/AdminDashboardv1';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAiSettings from './pages/admin/AdminAISetting';

export const router = createBrowserRouter([
  {
    path: '/:chatId?', 
    element: <ChatPage />,
  },
  {
    path: '/admin',
    element: <AdminLogin />,
  },
  {
    path: '/admin/dashboardv1',
    element: <AdminDashboardv1 />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/verify-login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/admin/dashboard/ai-settings',
    element: <AdminAiSettings />
  }
]);