import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import Docs from "@/Pages/Admin/Docs/Index"
import topics from "./topics";
import Categories from "@/Pages/Admin/Docs/Categories/Index";
import Category from "@/Pages/Admin/Docs/Categories/Detail/Index";

const relativeUri = 'docs/categories/';

const index = [
    {
        path: '',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Docs} />,
    },
    
    {
        path: 'categories',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Categories} />,
    },
    {
        path: ':slug',
        element: <AuthenticatedLayout uri={relativeUri + ':slug'} permission="" Component={Category} />,
    },
    {
        path: ':slug/topics',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Categories} />,
        children: topics,
    }
]

export default index