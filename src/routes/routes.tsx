import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '@/Pages/home/Index';
import Login from '@/Pages/Login';
import Users from '@/Pages/users/Users';
import Blogs from '@/Pages/blogs/Blogs';
import { routeGenerator } from '@/utils/routesGenerators';
import AdminPaths from './admin.routes';

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
    element: <App></App>,
    children: routeGenerator(AdminPaths),
  },

  {
    path: '/login',
    element: <Login></Login>,
  },
]);

export default router;
