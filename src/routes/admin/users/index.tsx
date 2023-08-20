import CreateOrUpdateUser from "@/Pages/Admin/Settings/Users/CreateOrUpdateUser"
import Index from "@/Pages/Admin/Settings/Users/User/Index"
import Users from '@/Pages/Admin/Settings/Users/Index';

const index = [

  {
    path: '',
    element: <Users />,
  },
  {
    path: 'create',
    element: <CreateOrUpdateUser />,
  },
  {
    path: 'user/:id/edit',
    element: <CreateOrUpdateUser />,
  },
  {
    path: 'user/:id',
    element: <Index />,
  },

]

export default index