import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import Topics from "@/Pages/Admin/Docs/Categories/Topics/Index";

const relativeUri = 'docs/categories/topics';

const index = [
    {
        path: '',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Topics} />,
    },
]

export default index