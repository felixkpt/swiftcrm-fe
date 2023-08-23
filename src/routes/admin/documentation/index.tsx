import Documentation from "@/Pages/Admin/Documentation/Documentation"
import DocumentationView from "@/Pages/Admin/Documentation/DocumentationView"

const index = [

    {
        path: '',
        element: <Documentation />,
    },
    {
        path: ':slug',
        element: <DocumentationView />,
    },

]

export default index