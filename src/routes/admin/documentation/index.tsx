import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import Documentation from "@/Pages/Admin/Documentation/Documentation"
import DocumentationView from "../../../Pages/Admin/Documentation/Documentation/DocumentationView"

const relativeUri = 'documentation/';

const index = [

    {
        path: '',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Documentation} />,

    },
    {
        path: 'create',
        element: <AuthenticatedLayout uri={relativeUri + 'create'} permission="" Component={DocumentationView} />,
    },
    {
        path: 'edit/:id',
        element: <AuthenticatedLayout uri={relativeUri + 'edit/:id'} permission="" Component={DocumentationView} />,
    },
    {
        path: 'documentation/:slug',
        element: <AuthenticatedLayout uri={relativeUri + 'documentation/:slug'} permission="" Component={DocumentationView} />,
    },

]

export default index