import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import Profile from "@/Pages/User/Profile";

const relativeUri = 'users'

const index = [

    {
        path: 'profile',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Profile} />,
    }

]

export default index