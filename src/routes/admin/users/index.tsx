import CreateOrUpdateUser from "@/Pages/Admin/Settings/Users/CreateOrUpdateUser"
import Users from '@/Pages/Admin/Settings/Users/Index';
import Detail from "@/Pages/Admin/Settings/Users/Detail/Index"
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
    path: 'detail/:id/edit',
    element: <AuthenticatedLayout uri={relativeUri + 'detail/:id/edit'} permission="" Component={CreateOrUpdateUser} />,
  },
  {
    path: 'detail/:id',
    element: <AuthenticatedLayout uri={relativeUri + 'detail/:id'} permission="" Component={Detail} />,
  },

]

export default index