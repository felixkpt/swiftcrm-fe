import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import CreateOrUpdate from "@/Pages/Admin/Docs/CreateOrUpdate"
import DocDetail from "@/Pages/Admin/Docs/Detail/Index";
import categories from "./categories";

const relativeUri = 'docs/';

const index = [

    {
        path: '',
        children: categories,
    },
    {
        path: 'create',
        element: <AuthenticatedLayout uri={relativeUri + 'create'} permission="" Component={CreateOrUpdate} />,
    },
    {
        path: 'detail/:id',
        element: <AuthenticatedLayout uri={relativeUri + 'detail/:id'} permission="" Component={DocDetail} />,
    },
    {
        path: 'detail/:id/edit',
        element: <AuthenticatedLayout uri={relativeUri + 'detail/:id/edit'} permission="" Component={CreateOrUpdate} />,
    },

]

export default index