import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import Docs from "@/Pages/Admin/Docs/Index"
import CreateOrUpdate from "@/Pages/Admin/Docs/CreateOrUpdate"
import DocDetail from "@/Pages/Admin/Docs/Detail/Index";
import categories from "./categories";

const relativeUri = 'docs/';

const index = [

    {
        path: 'categories',
        children: categories,
    },
    {
        path: '',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Docs} />,
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