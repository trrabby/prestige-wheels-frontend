import Blogs from '@/Pages/blogs/Blogs';
import CreateBlogs from '@/Pages/blogs/CreateBlogs';
import Users from '@/Pages/users/Users';

const AdminPaths = [
  {
    name: 'Blogs',
    children: [
      {
        name: 'Blogs',
        path: 'blogs',
        element: <Blogs></Blogs>,
      },
      {
        name: 'Create Blog',
        path: 'create-blog',
        element: <CreateBlogs></CreateBlogs>,
      },
    ],
  },
  {
    name: 'Users',
    path: 'users',
    element: <Users></Users>,
  },
];

export default AdminPaths;
