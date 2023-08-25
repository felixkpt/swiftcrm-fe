import AuthenticatedLayout from "@/Layouts/Authenicated/AuthenticatedLayout"
import Ticket from "@/Pages/Admin/Tickets/Ticket/Ticket"
import Tickets from "@/Pages/Admin/Tickets/Tickets"

const relativeUri = 'tickets/'

const tickets = [

    {
        path: '',
        element: <AuthenticatedLayout uri={relativeUri + ''} permission="" Component={Tickets} />,

    },
    {
        path: 'ticket/:id',
        element: <AuthenticatedLayout uri={relativeUri + 'ticket/:id'} permission="" Component={Ticket} />,
    },

]

export default tickets