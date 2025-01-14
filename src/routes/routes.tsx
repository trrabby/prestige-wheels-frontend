import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '@/Pages/home/Index';

import { routeGenerator } from '@/utils/routesGenerators';
import AdminPaths from './admin.routes';
import Login from '@/Pages/Login';
import ProtectedRoute from '@/layouts/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(AdminPaths),
  },

  {
    path: '/login',
    element: <Login></Login>,
  },
]);

export default router;
