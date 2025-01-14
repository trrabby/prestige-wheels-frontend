import Blogs from '@/Pages/blogs/Blogs';
import Users from '@/Pages/users/Users';

const AdminPaths = [
  {
    name: 'Users',
    path: 'users',
    element: <Users></Users>,
  },
  {
    name: 'Blogs',
    path: 'blogs',
    element: <Blogs></Blogs>,
  },
];

export default AdminPaths;
