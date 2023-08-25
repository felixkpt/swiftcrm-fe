import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import Documentation from "@/Pages/Admin/Documentation/Documentation"
import CreateOrUpdate from "@/Pages/Admin/Documentation/CreateOrUpdate"
import DocumentationView from "@/Pages/Admin/Documentation/Documentation/DocumentationView";

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
        path: 'documentation/:id',
        element: <AuthenticatedLayout uri={relativeUri + 'documentation/:id'} permission="" Component={DocumentationView} />,
    },
    {
        path: 'documentation/:id/edit',
        element: <AuthenticatedLayout uri={relativeUri + 'documentation/:id/edit'} permission="" Component={CreateOrUpdate} />,
    },

]

export default index