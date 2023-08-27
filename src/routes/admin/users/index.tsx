import CreateOrUpdateUser from "@/Pages/Admin/Settings/Users/CreateOrUpdateUser"
import Index from "@/Pages/Admin/Settings/Users/User/Index"
import Users from '@/Pages/Admin/Settings/Users/Index';
import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";

const relativeUri = 'users/'

const index = [

  {
    path: '',
    element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Users} />,
  },
  {
    path: 'create',
    element: <AuthenticatedLayout uri={relativeUri + 'create'} permission="" Component={CreateOrUpdateUser} />,

  },
  {
    path: 'user/:id/edit',
    element: <AuthenticatedLayout uri={relativeUri + 'user/:id/edit'} permission="" Component={CreateOrUpdateUser} />,
  },
  {
    path: 'user/:id',
    element: <AuthenticatedLayout uri={relativeUri + 'user/:id'} permission="" Component={Index} />,
  },

]

export default index