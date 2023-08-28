import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout";
import Statuses from "@/Pages/Admin/Settings/Picklists/Statuses/Statuses";


const relativeUri = 'settings/picklists/';

const index = [
    {
        path: 'statuses',
        element: <AuthenticatedLayout uri={relativeUri + 'statuses'} permission="" Component={Statuses} />,
    },
];

export default index;
