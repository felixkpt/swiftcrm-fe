import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import Documentation from "@/Pages/Admin/Documentation/Index"
import CreateOrUpdate from "@/Pages/Admin/Documentation/CreateOrUpdate"
import DocumentationDetail from "@/Pages/Admin/Documentation/Detail/Index";

const relativeUri = 'documentation/';

const index = [

    {
        path: '',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Documentation} />,
    },
    {
        path: 'create',
        element: <AuthenticatedLayout uri={relativeUri + 'create'} permission="" Component={CreateOrUpdate} />,
    },
    {
        path: 'detail/:id',
        element: <AuthenticatedLayout uri={relativeUri + 'detail/:id'} permission="" Component={DocumentationDetail} />,
    },
    {
        path: 'detail/:id/edit',
        element: <AuthenticatedLayout uri={relativeUri + 'detail/:id/edit'} permission="" Component={CreateOrUpdate} />,
    },

]

export default index